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
	const [code, setCode] = useState("");
	const [showResult, setShowResult] = useState("");
	const [count, setCount] = useState(0);
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
		if (text[text.length - 1] == "\n") {
			// If the last character is a newline character
			text += " "; // Add a placeholder space character to the final line
		}
		// Update code
		result_element.innerHTML = text
			.replace(new RegExp("&", "g"), "&")
			.replace(new RegExp("<", "g"), "<");
		// Syntax Highlight
		Prism.highlightElement(result_element);
	}
	function sync_scroll(element) {
		/* Scroll result to scroll coords of event - sync with textarea */
		let result_element = document.querySelector("#highlightedCodingContent");
		// Check if result_element is not null
		if (result_element) {
			// Get and set x and y
			result_element.scrollTop = element.scrollTop;
			console.log("top: ", result_element.scrollTop);

			result_element.scrollLeft = element.scrollLeft;
			console.log("left: ", result_element.scrollLeft);
		}
	}
	function check_tab(element, event) {
		let code = element.value;
		if (event.key == "Tab") {
			/* Tab key pressed */
			event.preventDefault(); // stop normal
			let before_tab = code.slice(0, element.selectionStart); // text before tab
			let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
			let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
			element.value = before_tab + "\t" + after_tab; // add tab char
			// move cursor
			element.selectionStart = cursor_pos;
			element.selectionEnd = cursor_pos;
			update(element.value); // Update text to include indent
		}
	}
	const runCode = () => {
		if (count < 50) {
			try {
				const result = eval(code);
				console.log("result: ", result);
				setShowResult(result);
				setCount(count + 1);
			} catch (error) {
				console.error(error);
				setShowResult("Error: " + error.message);
			}
		} else {
			setShowResult(
				"Vous avez atteint la limite de 50 exécutions. Pour ne plus avoir de limites, passer premium!"
			);
		}
	};

	return (
		<main className="min-h-[100vh]">
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
						className="relative min-h-80 md:min-h-[50vh] md:min-w-[45%] ml-2 md:ml-0"
					>
						{/*TODO: limit terminal row max length */}
						<Textarea
							className="left-0 z-10 caret-white bg-transparent text-transparent leading-[20pt] text-[15pt] resize-none"
							placeholder="Commencez a coder ici..."
							id="codingInput"
							onChange={(e) => {
								update(e.target.value);
								sync_scroll(e.target);
								setCode(e.target.value);
							}}
							onScroll={(e) => sync_scroll(e.target)}
							spellCheck="false"
							onKeyDown={(e) => {
								check_tab(e.target, event);
							}}
						/>
						<pre
							className="left-0 z-0 text-[15pt] w-[calc(100%-32px)] min-h-[33vh] md:h-[500px] font-mono border-none absolute top-0 rounded-md leading-[20pt] overflow-auto bg-input text-black dark:text-white"
							id="highlightedCodingContent"
							aria-hidden="true"
						>
							<code
								className="language-js text-[15pt] leading-[20pt] font-mono bg-input text-black dark:text-white"
								id="highlighting-content"
							></code>
						</pre>
						<PrismLoader />
					</div>
					<div className="flex flex-row-reverse md:flex-col w-full justify-center text-center align-center md:items-center px-4 md:px-0">
						<Button
							size={"sm"}
							className="flex md:justify-center md:items-center md:content-center md:align-middle mt-4 mb-4 w-20 ml-2 md:mr-0"
							onClick={runCode}
						>
							Exécuter
						</Button>
						<p className="flex items-center">{count}/50</p>
						<p className="flex items-center">
							Pour ne plus avoir de limites, passer premium!
						</p>
					</div>
					<div
						id="resultArea"
						className="relative min-h-80 md:min-h-[50vh] md:min-w-[45%] flex "
					>
						<Textarea
							readOnly={true}
							className="left-0 leading-[20pt] text-[15pt] ml-4 mt-4 md:mt-3 p-2.5 bg-input"
							value={showResult}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}

export default CodingPage;
