"use client";

// import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assurez-vous que le chemin est correct
import { oswald, spaceGrotesk } from "@/lib/fonts"; // Importez vos polices
import { ArrowLeft } from "lucide-react"; // Icône Lucide React

const NotFound = () => {
  const router = useRouter();

  // Optionnel: Rediriger automatiquement après quelques secondes
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.back(); // Redirige vers la page précédente
  //   }, 5000); // Redirection après 5 secondes
  //   return () => clearTimeout(timer);
  // }, [router]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-background 
    text-foreground p-4 text-center"
    >
      <div className="space-y-6">
        <h1
          className={`${spaceGrotesk.className} text-8xl md:text-9xl font-extrabold 
          tracking-tighter text-primary`}
        >
          404
        </h1>
        <h2
          className={`${oswald.className} text-3xl md:text-5xl font-bold text-foreground`}
        >
          Page non trouvée
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
          {`Désolé, la page que vous recherchez n'existe pas ou a été déplacée.`}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="group px-6 py-3 text-lg transition-all duration-300 hover:bg-accent 
            hover:text-accent-foreground"
          >
            <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Retour à la page précédente
          </Button>
          <Link href="/">
            <Button className="group px-6 py-3 text-lg transition-all duration-300 hover:scale-105">
              <span>Accueil</span>
              <ArrowLeft className="h-5 w-5 ml-2 rotate-180 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
