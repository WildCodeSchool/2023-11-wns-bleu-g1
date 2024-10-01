import { Editor } from "@monaco-editor/react";

import AuthLayout from "@/components/elements/auth-layout";
import { useRef, useState } from "react";
import { CODE_SNIPPETS } from "@/lib/constansCodeEditor";
import LanguageSelector from "@/components/elements/LanguageSelector";
import { Separator } from "@/components/ui/separator";
import OutputCodeEditor from "@/components/elements/OutputCodeEditor";

const CodeEditor = () => {
	const editorRef = useRef();

	const [value, setValue] = useState("");
	const [language, setLanguage] = useState("javascript");

	const onMount = (editor: any) => {
		editorRef.current = editor;
		editor.focus();
	};

	const onSelectLanguage = (language: string) => {
		setLanguage(language);
		setValue(CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS]);
	};

	return (
		<AuthLayout>
			<div className="flex justify-between">
				<LanguageSelector
					language={language}
					onSelectLanguage={onSelectLanguage}
				/>
			</div>

			<Separator className="my-3" />

			<div className="flex gap-5">
				<div className="w-1/2">
					<Editor
						height="75vh"
						defaultLanguage={language}
						defaultValue="// some comment"
						onMount={onMount}
						value={value}
						onChange={(value) => setValue(value as string)}
					/>
				</div>

				<OutputCodeEditor editorRef={editorRef} language={language} />
			</div>
		</AuthLayout>
	);
};

export default CodeEditor;
