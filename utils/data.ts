import { TvMinimalPlay, Boxes, Earth } from "lucide-react";
import { SiPagespeedinsights } from "react-icons/si";

export const AdsData = [
  {
    title: "Visibilité Télévisuelle en Point de Vente",
    description:
      "Diffusez votre marque ou vos produits sur des écrans stratégiquement placés dans notre réseau de boutiques affiliées. " +
      "Cette option vous permet de capter l’attention des clients directement sur le lieu d’achat, grâce à des publicités vidéo dynamiques et engageantes. " +
      "Idéal pour augmenter la notoriété locale et stimuler les ventes immédiates, ce canal offre un impact visuel fort et une mémorisation accrue. " +
      "Nous garantissons une diffusion régulière et ciblée selon les horaires et emplacements les plus pertinents.",
    price: 1200,
    avantages: [
      "Exposition directe au point de vente",
      "Contenu vidéo dynamique et attractif",
      "Ciblage local et horaire optimisé",
      "Augmentation de la mémorisation de la marque",
      "Support technique et mise à jour des contenus",
    ],
    slug: "televisuelle",
    Icon: TvMinimalPlay,
  },
  {
    title: "Publicité Personnalisée sur Emballages",
    description:
      "Offrez à votre marque une présence tangible et durable grâce à l’impression personnalisée de votre logo, slogan ou message sur nos emballages produits. " +
      "Cette solution permet un contact direct et quotidien avec les consommateurs, renforçant l’identité de votre marque à chaque utilisation ou achat. " +
      "En partenariat avec nos boutiques associées, cette visibilité s’étend sur un large réseau, garantissant une diffusion efficace et qualitative. " +
      "C’est un excellent moyen de valoriser vos produits tout en bénéficiant d’un support publicitaire intégré à l’expérience client.",
    price: 600,
    avantages: [
      "Visibilité constante et prolongée",
      "Renforcement de l’identité de marque",
      "Support intégré à l’expérience produit",
      "Large diffusion via notre réseau de boutiques",
      "Personnalisation complète selon vos besoins",
    ],
    slug: "packaging",
    Icon: Boxes,
  },
  {
    title: "Publicité Digitale Multi-Canal",
    description:
      "Diffusez vos messages sur nos sites web et ceux de nos partenaires en formats image ou vidéo, pour toucher une audience large et ciblée. " +
      "Cette publicité digitale vous offre une présence en ligne cohérente et interactive, permettant d’adapter vos campagnes en temps réel selon les retours et analyses. " +
      "Avec un ciblage précis et des formats variés, vous maximisez l’impact et l’engagement auprès de votre audience. " +
      "Cette solution digitale complète parfaitement nos services d’affichage physique pour une communication multi-canal efficace.",
    price: 800,
    avantages: [
      "Diffusion sur sites web partenaires",
      "Formats variés adaptés au digital (image, vidéo)",
      "Ciblage précis de l’audience",
      "Renforcement de la cohérence de marque",
      "Suivi et optimisation des campagnes digitales",
    ],
    slug: "publicite-digitale",
    Icon: Earth,
  },
  {
    title: "Affichage (Flyers)",
    description:
      "Cette option propose un service publicitaire complet où nous imprimons vos affiches ou flyers personnalisés pour vos campagnes. " +
      "Ces supports sont ensuite diffusés et affichés dans un réseau de boutiques affiliées ainsi que chez nos partenaires, " +
      "vous assurant une visibilité locale ciblée et efficace. " +
      "Ce dispositif permet à votre message d’être vu directement par les clients au cœur des points de vente, " +
      "offrant ainsi une présence physique forte et un impact concret sur votre audience. " +
      "Nous vous accompagnons dans la conception, l’impression et la diffusion pour garantir la réussite de votre campagne.",
    price: 400,
    avantages: [
      "Impression d’affiches et flyers personnalisés",
      "Diffusion dans un réseau de boutiques affiliées et partenaires",
      "Visibilité locale ciblée et renforcée",
      "Supports de qualité professionnelle",
      "Accompagnement complet de la campagne",
    ],

    slug: "affichage",
    Icon: SiPagespeedinsights,
  },
];
