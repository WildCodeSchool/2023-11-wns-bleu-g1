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
			className={`flex min-h-screen flex-col items-center justify-center overflow-scroll md:min-h-[100vh] md:w-full ${inter.className}`}
		>
			<Topbar isTopOfPage={isTopOfPage} />
			<div className="mt-32 flex flex-col w-[80vw] md:min-h-[70vh] md:flex-row md:space-x-4">
				<div className="flex flex-col md:relative md:w-2/3">
					<h1 className="pb-6 text-center text-4xl font-bold md:pt-10 md:text-8xl">
						Wild Code <span className="text-primary">Online</span>
					</h1>
					<p className="text-md pt-6 text-justify dark:text-gray-500 text-white md:px-4 md:py-10 md:text-xl">
						Créer, exécuter et partager du code avec la communauté. Avec Wild
						Code Online, vous avez la possibilité d’intéragir avec les codes des
						autres utilisateurs. Sauvegarder et télécharger vos fichiers de code
						pour pouvoir les utiliser sur d’autres projets
					</p>
					<div className="flex w-full flex-col items-center justify-center pt-6 md:absolute md:bottom-3 md:flex-row md:space-x-6">
						<a
							href="#"
							className="mb-6 flex w-1/2 justify-center rounded-md md:mb-0 md:w-fit"
						>
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
					<div className="relative my-6 flex min-h-40 w-full flex-col rounded-md bg-terminalbackground md:h-1/2">
						<Image
							src="/landing1.png"
							alt="Example code of a javascript function returning 'Welcome on board'"
							layout="fill"
							objectFit="contain"
							className="rounded-md border-2 border-primary"
						/>
					</div>
					<div className="relative my-6 flex min-h-40 w-full flex-col rounded-md bg-terminalbackground md:h-1/2">
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
