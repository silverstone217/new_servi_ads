"use server";

import { auth, signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { credAuthSchema, newUserSchema } from "@/schema/authSchema";
import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import z from "zod";

// GET CURRENT USER
export const getUser = async () => {
  const session = await auth();
  const user = session ? session.user : null;
  return user;
};

// LOGIN
type credAuthSchemaType = z.infer<typeof credAuthSchema>;
export const login = async (data: credAuthSchemaType) => {
  try {
    //   validate data
    const validationResult = credAuthSchema.safeParse(data);

    if (!validationResult.success) {
      console.log(validationResult.error.issues, "erreurs survenues");
      return {
        error: true,
        message: "Erreur de validation des informations",
        errors: validationResult.error.issues, // Important: Retourner les erreurs Zod
        data: null,
      };
    }

    const validated = validationResult.data;

    const { email, password } = validated;

    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    // revalidatePath("/");
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: true, message: "Email ou mot de passe incorrect." };
        default:
          return {
            error: true,
            message:
              "Email ou mot de passe incorrect. Creer un nouveau compte si vous en avez pas!",
          };
      }
    }
    console.error("Authentication error:", error);
    return {
      error: true,
      message: "Une erreur est survenue lors de l'authentification.",
    };
  }
};

// CREATE NEW USER
type newUsertype = z.infer<typeof newUserSchema>;
export async function createNewUser(data: newUsertype) {
  try {
    //   validate data
    const validationResult = newUserSchema.safeParse(data);

    if (!validationResult.success) {
      console.log(validationResult.error.issues, "erreurs survenues");
      return {
        error: true,
        message: "Erreur de validation des informations",
        errors: validationResult.error.issues, // Important: Retourner les erreurs Zod
        data: null,
      };
    }

    const validated = validationResult.data;

    const { name, email, password } = validated;

    const isUserExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (isUserExist) {
      return { error: true, message: "Cet email est déjà utilisé." };
    }

    const hashedPassword = await hash(password, 10);
    //   const name = email && email.replace(/@.*/, "");

    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });

    await login({ email, password });

    return {
      data: newUser,
      error: false,
      message: "Inscription reussie",
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      error: true,
      message: "Une erreur est survenue lors de l'inscription.",
    };
  }
}
