import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Topbar from "@/components/elements/Topbar";
import React, { useEffect, useState } from "react";
import Link from "next/link";

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
			className={`flex min-h-screen flex-col items-center justify-center ${inter.className}`}
		>
			<Topbar isTopOfPage={isTopOfPage} />
			<div className="container mx-auto">
				<div className="pt-32 sm:flex sm:items-center sm:gap-4 px-2">
					<div className="space-y-6 flex-1">
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-center sm:text-start font-bold">
							Wild Code <span className="text-primary">Online</span>
						</h1>
						<p className="text-center text-black dark:text-muted-foreground sm:text-start lg:text-lg sm:max-w-sm">
							Créer, exécuter et partager du code avec la communauté. Avec Wild
							Code Online, vous avez la possibilité d’intéragir avec les codes
							des autres utilisateurs. Sauvegarder et télécharger vos fichiers
							de code pour pouvoir les utiliser sur d’autres projets
						</p>
						<div className="space-x-4 lg:space-x-8 text-center sm:text-start">
							<Link
								href={"/auth/connexion"}
								className="text-primary hover:underline"
							>
								<Button>Commencer à coder</Button>
							</Link>
							<Link
								href={"/auth/connexion"}
								className="text-primary hover:underline"
							>
								<Button variant={"secondary"}>En savoir plus</Button>
							</Link>
						</div>
					</div>
					<div className="flex flex-col sm:w-2/5 justify-center">
						<div className="relative my-6 flex min-h-40 w-full flex-col rounded-md bg-terminalbackground md:h-48">
							<Image
								src="/landing1.png"
								alt="Example code of a javascript function returning 'Welcome on board'"
								layout="fill"
								objectFit="contain"
								className="rounded-md border-2 border-primary"
							/>
						</div>
						<div className="relative my-6 flex min-h-40 md:h-48 w-full flex-col rounded-md bg-terminalbackground ">
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
			</div>
		</main>
	);
}
