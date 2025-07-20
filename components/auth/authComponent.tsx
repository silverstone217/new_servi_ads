"use client";

import { oswald, spaceGrotesk } from "@/lib/fonts";
import { useMemo, useState } from "react";
import { User, AtSign, Lock, Eye, EyeClosed, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import { isEmptyString } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { createNewUser, login } from "@/actions/auth-actions";

type InputTextProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  icon?: React.ReactNode;
  iconPassword?: React.ReactNode;
  placeholder: string;
  disabled: boolean;
  type: "text" | "password" | "search" | "email";
  autoComplete?: "name" | "new-password" | "current-password" | "email";
  required: boolean;
};
export const InputText = ({
  value,
  onChange,
  className,
  icon,
  placeholder,
  disabled,
  type,
  iconPassword,
  autoComplete,
  required,
}: InputTextProps) => {
  return (
    <div className="relative">
      {icon && (
        <div
          className="absolute top-1/2 left-3 -translate-y-1/2 
                flex items-center"
        >
          {icon}
        </div>
      )}
      <input
        type={type}
        className={`w-full py-3 pl-11 text-sm rounded-2xl
        ${className} ${disabled ? "bg-gray-200" : "bg-white"}
        ${disabled ? "cursor-not-allowed" : "cursor-text"}
        ${disabled ? "opacity-50" : "opacity-100"}
        ${disabled ? "pointer-events-none" : "pointer-events-auto"}
        ${oswald.className}
        `}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete={autoComplete}
        required={required}
        maxLength={
          type === "password" ? 12 : type === "email" || "name" ? 50 : undefined
        }
        minLength={
          type === "password" ? 6 : type === "email" || "name" ? 3 : undefined
        }
      />
      {iconPassword && (
        <div
          className="absolute top-1/2 right-3 -translate-y-1/2
            flex items-center"
        >
          {iconPassword}
        </div>
      )}
    </div>
  );
};

// Sign up form
export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //   with google
  const handleSubmitWithGoogle = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
      toast.error(
        "Impossible de vous connceter avec google, veuillez reéssayer!"
      );
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      if (
        isEmptyString(email) ||
        isEmptyString(password) ||
        isEmptyString(username)
      ) {
        toast.error("Veuillez remplir tous les champs avant de soumettre");
        return;
      }

      const formDataSign = {
        name: username.trim(),
        email: email.trim(),
        password: password.trim(),
      };
      const createUser = await createNewUser(formDataSign);
      if (createUser?.error) {
        toast.error(createUser.message);
        return;
      }
      setEmail("");
      setPassword("");
      setUsername("");

      toast.success("Inscription réussie! Bienvenue parmi nous!.");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Une erreur s'est produite, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = useMemo(() => {
    if (
      isEmptyString(username) ||
      isEmptyString(email) ||
      isEmptyString(password)
    )
      return true;

    if (loading) return true;

    return false;
  }, [email, loading, password, username]);

  return (
    <div
      className="flex flex-col items-center justify-center 
    h-screen p-4 md:p-6 lg:p-8  gap-6 relative
    max-w-2xl mx-auto w-full
    "
    >
      <h2
        className={
          "text-4xl font-bold uppercase " + " " + spaceGrotesk.className
        }
      >
        Inscription
      </h2>
      <form
        className="w-full grid grid-cols-1 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        {/* name */}
        <InputText
          type="text"
          placeholder="Nom et prénom"
          value={username}
          onChange={(value) => setUsername(value)}
          disabled={loading}
          icon={<User className="size-5" />}
          autoComplete="name"
          required
        />

        {/* email */}
        <InputText
          type="email"
          placeholder="Adresse mail"
          value={email}
          onChange={(value) => setEmail(value)}
          disabled={loading}
          icon={<AtSign className="size-5" />}
          autoComplete="email"
          required
        />
        {/* email */}
        <InputText
          type={passwordType}
          placeholder={passwordType === "text" ? "Mot de passe" : "********"}
          value={password}
          onChange={(value) => setPassword(value)}
          disabled={loading}
          icon={<Lock className="size-5" />}
          autoComplete="new-password"
          iconPassword={
            passwordType === "text" ? (
              <Eye
                className="size-5 cursor-pointer"
                onClick={() => setPasswordType("password")}
              />
            ) : (
              <EyeClosed
                className="size-5 cursor-pointer"
                onClick={() => setPasswordType("text")}
              />
            )
          }
          required
        />

        <Button className="py-5 mt-4" type="submit" disabled={isButtonDisabled}>
          {loading ? (
            <Loader className="animate-spin " />
          ) : (
            <span>Créer un compte</span>
          )}
        </Button>

        <p className="text-center text-xs text-gray-500 mt-2">
          ou continuer avec
        </p>

        <div className="flex w-full gap-4 items-center justify-center">
          <Button
            variant={"outline"}
            type="button"
            onClick={handleSubmitWithGoogle}
            disabled={loading}
          >
            <FcGoogle className="size-6" />
          </Button>
          <Button variant={"outline"} disabled>
            <FaFacebookF className="fill-blue-600 size-6" type="button" />
          </Button>
        </div>

        <div className="mt-5 flex items-center gap-1 flex-wrap text-wrap justify-center">
          <p className="text-center text-xs text-gray-500">
            Vous avez déjà un compte ?{" "}
          </p>
          <Link
            href="/connexion"
            className="text-primary font-medium hover:underline "
          >
            Connexion
          </Link>
        </div>
      </form>

      <footer className="absolute bottom-1 left-0 right-0">
        <p className="text-center text-xs text-gray-500">
          <span className={`${oswald.className} font-bold`}>SERVI ADS.</span>{" "}
          {new Date().getFullYear()} - Tous droits réservés
        </p>
      </footer>
    </div>
  );
};

// Sign IN form
export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //   with google
  const handleSubmitWithGoogle = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
      toast.error(
        "Impossible de vous connceter avec google, veuillez reéssayer!"
      );
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      if (isEmptyString(email) || isEmptyString(password)) {
        toast.error("Veuillez remplir tous les champs avant de soumettre");
        return;
      }

      //   login process
      const formData = { email: email.trim(), password: password.trim() };

      const signUser = await login(formData);
      if (signUser?.error) {
        toast.error(signUser.message);
        return;
      }
      toast.success("Connexion réussie!");
      router.refresh();
      location.reload();
      return;
    } catch (error) {
      console.log(error);
      toast.error("Une erreur s'est produite, veuillez réessayer.");
    } finally {
      setTimeout(() => setLoading(false));
    }
  };

  const isButtonDisabled = useMemo(() => {
    if (isEmptyString(email) || isEmptyString(password)) return true;

    if (loading) return true;

    return false;
  }, [email, loading, password]);

  return (
    <div
      className="flex flex-col items-center justify-center 
    h-screen p-4 md:p-6 lg:p-8  gap-6 relative
    max-w-2xl mx-auto w-full
    "
    >
      <h2
        className={
          "text-4xl font-bold uppercase " + " " + spaceGrotesk.className
        }
      >
        Connexion
      </h2>
      <form
        className="w-full grid grid-cols-1 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        {/* email */}
        <InputText
          type="email"
          placeholder="Adresse mail"
          value={email}
          onChange={(value) => setEmail(value)}
          disabled={loading}
          icon={<AtSign className="size-5" />}
          autoComplete="email"
          required
        />
        {/* email */}
        <InputText
          type={passwordType}
          placeholder={passwordType === "text" ? "Mot de passe" : "********"}
          value={password}
          onChange={(value) => setPassword(value)}
          disabled={loading}
          icon={<Lock className="size-5" />}
          autoComplete="new-password"
          iconPassword={
            passwordType === "text" ? (
              <Eye
                className="size-5 cursor-pointer"
                onClick={() => setPasswordType("password")}
              />
            ) : (
              <EyeClosed
                className="size-5 cursor-pointer"
                onClick={() => setPasswordType("text")}
              />
            )
          }
          required
        />

        <Button className="py-5 mt-4" type="submit" disabled={isButtonDisabled}>
          {loading ? (
            <Loader className="animate-spin " />
          ) : (
            <span>Se Connecter</span>
          )}
        </Button>

        <p className="text-center text-xs text-gray-500 mt-2">
          ou continuer avec
        </p>

        <div className="flex w-full gap-4 items-center justify-center">
          <Button
            variant={"outline"}
            type="button"
            onClick={handleSubmitWithGoogle}
            disabled={loading}
          >
            <FcGoogle className="size-6" />
          </Button>
          <Button variant={"outline"} disabled>
            <FaFacebookF className="fill-blue-600 size-6" type="button" />
          </Button>
        </div>

        <div className="mt-5 flex items-center gap-1 flex-wrap text-wrap justify-center">
          <p className="text-center text-xs text-gray-500">
            {` Vous n'avez pas de compte ?`}{" "}
          </p>
          <Link
            href="/inscription"
            className="text-primary font-medium hover:underline "
          >
            Inscription
          </Link>
        </div>
      </form>

      <footer className="absolute bottom-1 left-0 right-0">
        <p className="text-center text-xs text-gray-500">
          <span className={`${oswald.className} font-bold`}>SERVI ADS.</span>{" "}
          {new Date().getFullYear()} - Tous droits réservés
        </p>
      </footer>
    </div>
  );
};
