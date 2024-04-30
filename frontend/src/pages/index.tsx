import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Topbar from "@/components/elements/Topbar";
import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY === 0) {
				setIsTopOfPage(true);
			}
			if (window.scrollY !== 0) {
				setIsTopOfPage(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<main
			className={`flex min-h-screen md:w-full md:min-h-[100vh] flex-col items-center justify-center overflow-scroll ${inter.className}`}
		>
			<Topbar isTopOfPage={isTopOfPage} />
			<div className="mt-32 w-[80vw] md:min-h-[70vh] flex md:flex-row md:space-x-4">
				<div className="flex flex-col md:w-2/3 md:relative">
					<h1 className="pb-6 text-center text-4xl md:text-8xl font-bold md:pt-10">
						Wild Code <span className="text-primary">Online</span>
					</h1>
					<p className="text-md md:text-xl pt-6 md:px-4 text-justify text-gray-500 md:py-10">
						Créer, exécuter et partager du code avec la communauté. Avec Wild Code
						Online, vous avez la possibilité d’intéragir avec les codes des autres
						utilisateurs. Sauvegarder et télécharger vos fichiers de code pour
						pouvoir les utiliser sur d’autres projets
					</p>
					<div className="flex w-full flex-col md:flex-row items-center justify-center pt-6 md:absolute md:bottom-3 md:space-x-6">
						<a href="#" className="mb-6 md:mb-0 flex w-1/2 md:w-fit justify-center rounded-md">
							<Button className="shadow-lg shadow-primary hover:shadow-black">
								Commencer à coder
							</Button>
						</a>
						<a href="#" className="flex justify-center rounded-md">
							<Button
								variant="secondary"
								className="shadow-lg shadow-gray-500 hover:shadow-primary"
							>
								En savoir plus
							</Button>
						</a>
					</div>
				</div>
				<div className="flex flex-col md:w-1/3">
					<div className="relative my-6 flex flex-col min-h-40 md:h-1/2 w-full bg-terminalbackground rounded-md">
						<Image
							src="/landing1.png"
							alt="Example code of a javascript function returning 'Welcome on board'"
							layout="fill"
							objectFit="contain"
							className="rounded-md border-2 border-primary"
						/>
					</div>
					<div className="relative my-6 flex flex-col min-h-40 md:h-1/2 w-full bg-terminalbackground rounded-md">
						<Image
							src="/landing2.png"
							alt="Return of the example code above saying 'Welcome on board'"
							layout="fill"
							objectFit="contain"
							className="rounded-md border-2 border-primary"
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
