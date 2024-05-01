import React, { useEffect, useState } from "react";
import Image from "next/image";
// import Topbar from "@/components/elements/Topbar";
import { Button } from "@/components/ui/button";

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
					<textarea
						className="border-none min-h-80 md:min-h-[50vh] md:min-w-[45%] p-2 resize-none m-1 md:ml-4 md:mt-4 rounded-md"
						placeholder="Commencez a coder ici..."
					></textarea>
					<div className="flex w-full justify-end">
						<Button size={"sm"} className="flex mt-4 mb-4 w-20 mr-4">
							Exécuter
						</Button>
					</div>
					<textarea className="border-none min-h-80 md:min-h-[50vh] md:min-w-[45%] p-2 resize-none m-1 md:mr-4 md:mt-4 rounded-md"></textarea>
				</div>
			</div>
		</main>
	);
}

export default CodingPage;
