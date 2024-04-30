import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Topbar from "@/components/elements/Topbar";
import React, {useEffect, useState} from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
	useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
      }
      if (window.scrollY !== 0) { setIsTopOfPage(false)}
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-center overflow-scroll ${inter.className}`}
		>
			<Topbar isTopOfPage={isTopOfPage} />
			<div className="w-[80vw] mt-32">
				<h1 className="text-4xl font-bold text-center pb-6">Wild Code <span
					className="text-primary">Online</span></h1>
				<p className="text-md text-gray-500 pt-6 text-justify">
					Créer, exécuter et partager du code avec la communauté. Avec Wild Code Online, vous avez la
					possibilité d’intéragir avec les codes des autres utilisateurs. Sauvegarder et télécharger voos
					fichiers de code pour pouvoir les utiliser sur d’autres projets
				</p>
				<div className="flex flex-col w-full justify-center items-center pt-6">
					<a href="#" className="w-1/2 mb-6 rounded-md flex justify-center"><Button className="shadow-primary shadow-lg hover:shadow-black">Commencer à coder</Button></a>
					<a href="#" className="rounded-md flex justify-center"><Button variant="secondary" className="shadow-gray-500 shadow-lg hover:shadow-primary">En
						savoir plus</Button></a>
				</div>
				<img src="./landing1.png" alt="Example code of a javascript function returning 'Welcome on board'" className="mt-6 border-2 border-primary rounded-md"/>
				<img src="./landing2.png" alt="Return of the example code above saying 'Welcome on board'" className="my-6 border-2 border-primary rounded-md"/>

			</div>
		</main>
	);
}
