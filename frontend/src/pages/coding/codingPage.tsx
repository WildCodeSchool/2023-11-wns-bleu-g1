import React, { useEffect, useState } from "react";
import Image from "next/image";
import Prism from "prismjs";

import Topbar from "@/components/elements/Topbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PrismLoader from "@/components/prism-loader";
import { Separator } from "@/components/ui/separator";
import { addCloseCharactere, SPECIALS_CHARACTERES } from "@/lib/autocomplete";

// const autocompleteRegex = /(co(nst|ntinue|nstructor)?|cl(ass)?|ca(tch|se)?)/g;

const CodingPage = () => {
	const {
		REGEX_SPECIALS_CHAR,
		OPEN_PARENTHESIS,
		OPEN_BRACKET,
		OPEN_CURLY_BRACKET,
		CLOSE_PARENTHESIS,
		CLOSE_BRACKET,
		CLOSE_CURLY_BRACKET,
	} = SPECIALS_CHARACTERES;

	const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
	const [code, setCode] = useState("");
	const [showResult, setShowResult] = useState("");
	const [count, setCount] = useState(0);

	console.log("code state", code);
	code;
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

	const update = (text: string) => {
		const resultElement = document.querySelector(
			"#highlighting-content"
		) as HTMLElement;

		if (text[text.length - 1] == "\n") {
			// If the last character is a newline character
			text += " "; // Add a placeholder space character to the final line
		}

		console.log("text before regEx", text);
		// console.log("OPEN_PARENTHESIS.test(text)", OPEN_PARENTHESIS.test(text));

		if (OPEN_PARENTHESIS.test(text)) {
			text = text.replace(
				OPEN_PARENTHESIS,
				(match) => match + CLOSE_PARENTHESIS
			);

			setCode(text);
		}

		if (OPEN_BRACKET.test(text)) {
			text = text.replace(OPEN_BRACKET, (match) => match + CLOSE_BRACKET);

			setCode(text);
		}

		if (OPEN_CURLY_BRACKET.test(text)) {
			text = text.replace(
				OPEN_CURLY_BRACKET,
				(match) => match + CLOSE_CURLY_BRACKET
			);

			setCode(text);
		}

		console.log("text after regEx", text);

		// Update code
		resultElement.innerHTML = text
			.replace(new RegExp("&", "g"), "&")
			.replace(new RegExp("<", "g"), "<");

		// Syntax Highlight
		Prism.highlightElement(resultElement);

		setCode(text);
	};

	const syncScroll = (element: HTMLTextAreaElement) => {
		/* Scroll result to scroll coords of event - sync with textarea */
		const resultElement = document.querySelector("#highlightedCodingContent");

		// Check if resultElement is not null
		if (resultElement) {
			// Get and set x and y
			resultElement.scrollTop = element.scrollTop;
			resultElement.scrollLeft = element.scrollLeft;
		}
	};

	const checkTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const code = e.currentTarget.value;

		if (e.key == "Tab") {
			/* Tab key pressed */
			e.preventDefault(); // stop normal
			const beforeTab = code.slice(0, e.currentTarget.selectionStart); // text before tab
			const afterTab = code.slice(
				e.currentTarget.selectionEnd,
				e.currentTarget.value.length
			); // text after tab

			const cursorPos = e.currentTarget.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab

			e.currentTarget.value = beforeTab + "\t" + afterTab; // add tab char
			// move cursor
			e.currentTarget.selectionStart = cursorPos;
			e.currentTarget.selectionEnd = cursorPos;

			update(e.currentTarget.value); // Update text to include indent
		}
	};

	const runCode = () => {
		if (count < 50) {
			try {
				const result = eval(code);

				console.log("result: ", result);

				setShowResult(result);

				setCount(count + 1);
			} catch (error: any) {
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
		<main
			className={
				"flex min-h-screen flex-col items-center justify-center overflow-scroll md:min-h-[100vh] md:w-full"
			}
		>
			<Topbar isTopOfPage={isTopOfPage} />
			<div className="container mx-auto">
				<div id="coddingTopInfo" className="flex w-full relative">
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
				<Separator />
				<div id="codingContent" className="flex flex-col md:flex-row w-full">
					<div
						id="codingArea"
						className="relative min-h-80 md:min-h-[50vh] md:min-w-[45%] ml-2 md:ml-0"
					>
						{/*TODO: limit terminal row max length */}
						<Textarea
							className="left-0 z-10 caret-white bg-transparent text-transparent leading-[20pt] text-[15pt] resize-none "
							placeholder="Commencez a coder ici..."
							id="codingInput"
							value={code}
							onChange={(e) => {
								update(e.target.value);
								syncScroll(e.target);
							}}
							onScroll={(e) => syncScroll(e.currentTarget)}
							spellCheck="false"
							onKeyDown={checkTab}
						/>
						<pre
							className="left-0 z-0 text-[15pt] w-[calc(100%-32px)] min-h-[33vh] md:h-[500px] font-mono border-none absolute top-0 rounded-md leading-[20pt] overflow-auto bg-input"
							id="highlightedCodingContent"
							aria-hidden="true"
						>
							<code
								className="language-js text-[15pt] leading-[20pt] font-mono bg-input"
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
							className="left-0 leading-[20pt] text-[15pt] ml-4 mt-4 md:mt-3 p-2.5 bg-input resize-none"
							value={showResult}
						/>
					</div>
				</div>
			</div>
		</main>
	);
};

export default CodingPage;
