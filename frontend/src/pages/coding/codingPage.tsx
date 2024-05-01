import React, { useEffect, useState } from "react";
import Image from "next/image";
// import Topbar from "@/components/elements/Topbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PrismLoader from "@/components/prism-loader";
import Prism from "prismjs";

function CodingPage() {
	const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
	const [input, setInput] = useState("");
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
	console.log(input);
	function update(text) {
		let result_element = document.querySelector("#highlighting-content");
		// Update code
		result_element.innerHTML = text
			.replace(new RegExp("&", "g"), "&")
			.replace(new RegExp("<", "g"), "<");
		// Syntax Highlight
		Prism.highlightElement(result_element);
	}

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
					<div
						id="codingArea"
						className="relative min-h-80 md:min-h-[50vh] md:min-w-[45%]"
					>
						<Textarea
							className="left-0 z-10 caret-white md:ml-4 bg-transparent text-transparent leading-[20pt] text-[15pt]"
							placeholder="Commencez a coder ici..."
							id="codingInput"
							onChange={(e) => update(e.target.value)}
							spellCheck="false"
						/>
						<pre
							className="left-0 z-0 md:ml-4 text-[15pt] resize-none w-[calc(100%-32px)] h-[500px] font-mono border-none m-2.5 p-2 absolute top-0 bg-lightterminalbackground dark:bg-darkterminalbackground rounded-md md:mt-4 leading-[20pt]"
							id="highlightedCodingContent"
							aria-hidden="true"
						>
							<code
								className="language-js text-[15pt] leading-[20pt] font-mono"
								id="highlighting-content"
							></code>
						</pre>
						<PrismLoader />
					</div>
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
					<div
						id="resultArea"
						className="relative min-h-80 md:min-h-[50vh] md:min-w-[45%]"
					>
						<Textarea readOnly={true} className="left-0 md:mr-4" />
					</div>
				</div>
			</div>
			{/*<div>*/}
			{/*	<Textarea id="editing" onChange={(e) => update(e.target.value)} spellCheck="false"/>*/}
			{/*	<pre className="language-javascript" id="highlighting" aria-hidden="true">*/}
			{/*		<code className="language-js" id="highlighting-content"></code>*/}
			{/*	</pre>*/}
			{/*	<PrismLoader />*/}
			{/*</div>*/}
		</main>
	);
}

export default CodingPage;
