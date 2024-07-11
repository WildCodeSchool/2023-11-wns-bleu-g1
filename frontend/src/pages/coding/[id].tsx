import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PrismLoader from "@/components/prism-loader";
import { Separator } from "@/components/ui/separator";
import Prism from "prismjs";
import AuthLayout from "@/components/elements/auth-layout";
import {useRouter} from "next/router";
import {
	useGetCodeforAProjectIdQuery,
	useGetCodesQuery,
	useGetMyProjectsQuery,
	useUpdateCodeMutation
} from "@/graphql/generated/schema";


const CodingPage = () => {
	const getCode = useGetCodesQuery()
    const router = useRouter();
    const { id } = router.query;
	const getMyProjectsQuery = useGetMyProjectsQuery();
	const getCodeforAProjectIdQuery = useGetCodeforAProjectIdQuery({
		variables: {
			project: id as string,
		},
	});

	const project = getMyProjectsQuery.data?.getMyProjects.find((project) => project.id === id);
	const codeIdForThisProject = getCodeforAProjectIdQuery.data?.getCode[0]?.id;
	const thisCode = getCode.data?.getCodes.find((code) => code.id === codeIdForThisProject);
	const thisCodeId = thisCode?.id;
	const [code, setCode] = useState("");
	const [showResult, setShowResult] = useState("");
	const [count, setCount] = useState(0);

	useEffect(() => {
		async function setCodeOnMount() {
			const result_element_on_mount = document.querySelector("#highlighting-content");
			const coding_input_on_mount = document.querySelector("#codingInput") as HTMLTextAreaElement;
		  if (thisCode?.content && thisCode.content !== "" && result_element_on_mount) {
			  result_element_on_mount.innerHTML = thisCode?.content;
			  coding_input_on_mount.innerHTML = thisCode?.content;
			  Prism.highlightElement(result_element_on_mount)
			await setCode(thisCode?.content);
		  }
		}
		setCodeOnMount();
	  }, [thisCode?.content]);

	const update = (text: string) => {
		const result_element = document.querySelector(
			"#highlighting-content"
		) as HTMLElement;
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
	};

	const syncScroll = (element: HTMLTextAreaElement) => {
		/* Scroll result to scroll coords of event - sync with textarea */
		const result_element = document.querySelector("#highlightedCodingContent");
		// Check if result_element is not null
		if (result_element) {
			// Get and set x and y
			result_element.scrollTop = element.scrollTop;
			result_element.scrollLeft = element.scrollLeft;
		}
	};

	const checkTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const code = e.currentTarget.value;
		if (e.key == "Tab") {
			/* Tab key pressed */
			e.preventDefault(); // stop normal
			const before_tab = code.slice(0, e.currentTarget.selectionStart); // text before tab
			const after_tab = code.slice(
				e.currentTarget.selectionEnd,
				e.currentTarget.value.length
			); // text after tab
			const cursor_pos = e.currentTarget.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
			e.currentTarget.value = before_tab + "\t" + after_tab; // add tab char
			// move cursor
			e.currentTarget.selectionStart = cursor_pos;
			e.currentTarget.selectionEnd = cursor_pos;
			update(e.currentTarget.value); // Update text to include indent
		}
	};

	const [updateCode] = useUpdateCodeMutation({
		onCompleted: () => {
			console.log("Code updated!");
		},
		onError: (error) => {
			console.error(error);
		}
	});
	async function saveCode()  {
		if (!thisCodeId) {
			console.error("No code id found!");
			return;
		}
		await updateCode({
			variables: {
				updateCodeId: thisCodeId,
				content: code,
			}
		})
	}
	const runCode = () => {
		// @Todo: Remettre le compte à 50 en dehors des tests
		if (count < 10) {
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
				"Vous avez atteint la limite de 10 exécutions. Pour ne plus avoir de limites, passer premium!"
			);
		}
	};

	return (
		<AuthLayout>
			<div>
				<div id="coddingTopInfo" className="flex w-full relative">
					<h1 className="flex flex-1 justify-start align-middle items-center pl-4">
						{project?.title}
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
							placeholder={thisCode?.content === "" ? "Commencez a coder ici..." : ""}
							id="codingInput"
							onChange={(e) => {
								update(e.target.value);
								syncScroll(e.target);
								setCode(e.target.value);
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
								className="text-[15pt] leading-[20pt] font-mono bg-input language-js"
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
						{/* @Todo: Remettre le compte à 50 en dehors des tests */}
						<p className="flex items-center">{count}/10</p>
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
				<div className="container mx-auto flex justify-end">
					<Button
						size={"sm"}
						className="flex md:justify-center md:items-center md:content-center md:align-middle mt-4 mb-4 w-20 ml-2 md:mr-0"
						onClick={saveCode}
					>
						Enregistrer
					</Button>
				</div>
			</div>
		</AuthLayout>
	);
};

export default CodingPage;
