import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import { compare } from "bcryptjs";
import { isEmptyString } from "./utils/functions";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { credAuthSchema } from "./schema/authSchema";
import { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET } from "./utils/envVaraibles";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/connexion",
    verifyRequest: "/verif-email-sent",
  },
  providers: [
    // credentials email, password
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Veuillez remplir tous les champs!");
          }
          const email = credentials.email as string;
          const pwd = credentials.password as string;

          if (isEmptyString(email) || isEmptyString(pwd)) {
            throw new Error("Veuillez remplir tous les champs!");
          }
          const revalidated = await credAuthSchema.parse({
            email,
            password: pwd,
          });
          const user = await prisma.user.findUnique({ where: { email } });

          if (!user) {
            throw new Error("Utilisateur non trouvé !");
          }

          if (!user.password) {
            throw new Error(
              "Ce compte n'a pas de mot de passe défini. Veuillez utiliser un autre moyen de connexion."
            );
          }

          const passwordMatch = await compare(
            revalidated.password,
            user.password
          );

          if (!passwordMatch) {
            throw new Error("Email ou mot de passe incorrect !");
          }

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _pass, ...rest } = user;

          return rest;
        } catch (error) {
          if (error instanceof ZodError) {
            // Formatter les erreurs de Zod en une chaîne de caractères avec chaque erreur sur une nouvelle ligne
            const errorMessages = error.issues
              .map((err) => err.message)
              .join("\n");
            throw new Error(errorMessages);
          } else {
            const errorMessage = (error as Error).message;
            throw new Error(errorMessage);
          }
        }
      },
    }),
    // Google
    Google({
      clientId: AUTH_GOOGLE_ID,
      clientSecret: AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET_KEY,
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        const tokenId = token.sub;
        if (tokenId) {
          const user = await prisma.user.findUnique({
            where: {
              id: tokenId,
            },
          });
          if (user) {
            session.user = {
              id: user.id,
              name: user.name,
              email: user.email ? user.email : "",
              emailVerified: user.emailVerified,
              image: user.image,
              role: user.role,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              isBanned: user.isBanned,
            };
          }
        }
      }
      return session;
    },
  },
});
