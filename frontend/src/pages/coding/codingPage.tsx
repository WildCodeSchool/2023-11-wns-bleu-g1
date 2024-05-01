import React, { useEffect, useState } from "react";
import Image from "next/image";
// import Topbar from "@/components/elements/Topbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function CodingPage() {
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
	const [textArea, setTextArea] = useState("");

	const handleSumbit = (e) => {
		e.preventDefault();
		//  console here form data
	};

	return (
		<main className="min-h-[100vh]">
			{/*<Topbar isTopOfPage={isTopOfPage} />*/}
			<div className="">
				<div id="coddingTopInfo" className="flex w-full relative border-b">
					<h1 className="flex flex-1 justify-start align-middle items-center pl-4">
						Nom du projet
					</h1>
					<div className="relative my-6 mr-4 flex h-10 w-12 rounded-md md:h-14 justify-end align-bottom items-end">
						<Image
							src="/Javascript_logo.png"
							alt="logo javascript"
							layout="fill"
							objectFit="contain"
							className="justify-end align-bottom items-end"
						/>
					</div>
				</div>
				<div id="codingContent" className="flex flex-col md:flex-row w-full">
					<Textarea
						className="md:ml-4"
						placeholder="Commencez a coder ici..."
					/>
					<div className="flex flex-row-reverse md:flex-col w-full justify-center text-center align-center md:items-center">
						<Button
							size={"sm"}
							className="flex md:justify-center md:items-center md:content-center md:align-middle mt-4 mb-4 w-20 ml-2 md:mr-0"
						>
							Exécuter
						</Button>
						<p className="flex items-center">0/50</p>
						<p className="flex items-center">
							Pour ne plus avoir de limites, passer premium!
						</p>
					</div>
					<Textarea className="md:mr-4" />
				</div>
			</div>
		</main>
	);
}

export default CodingPage;
