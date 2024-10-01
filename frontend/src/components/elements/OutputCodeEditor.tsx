import { Button } from "@/components/ui/button";
import { useState } from "react";
import { executeCode } from "@/lib/executeCode";

interface Props {
	editorRef: any;
	language: string;
}

const OutputCodeEditor = ({ editorRef, language }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [output, setOutput] = useState(null);

	const runCode = async () => {
		const sourceCode = editorRef.current.getValue();

		if (!sourceCode) return;

		try {
			setIsLoading(true);

			const { run: result } = await executeCode(language, sourceCode);

			setOutput(result.output);
		} catch (e) {
			console.log("Run code error", e);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex w-full">
			<Button variant={"default"} onClick={runCode}>
				Executer
			</Button>
			<div className="bg-black p-5 w-full">
				{isLoading && <p>Compilation en cours</p>}
				<div>{output ? output : "Le résultat s'affichera ici …"}</div>
			</div>
		</div>
	);
};

export default OutputCodeEditor;
