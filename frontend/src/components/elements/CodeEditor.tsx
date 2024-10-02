import { Editor, MonacoDiffEditor } from "@monaco-editor/react";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react";
import { CODE_SNIPPETS } from "@/lib/constansCodeEditor";
import {
	GetExecutionCounterDocument,
	GetProjectByIdQuery,
	useGetExecutionCounterQuery,
	useIncrementExecutionCounterMutation,
	useUpdateCodeMutation,
} from "@/graphql/generated/schema";
import { Button } from "../ui/button";
import { BadgeCheck, Save } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { executeCode } from "@/lib/executeCode";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../ui/hover-card";

interface Props {
	project: GetProjectByIdQuery["getProject"];
}

const CodeEditor = ({ project }: Props) => {
	const { codes } = project;
	const language = codes[0].language.name.toLocaleLowerCase();

	const { toast } = useToast();

	const editorRef = useRef();

	const [value, setValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [output, setOutput] = useState(null);

	useMemo(() => {
		setValue(codes[0].content);
	}, [codes]);

	const { data: counter } = useGetExecutionCounterQuery({
		onError: (e) => {
			console.error("useGetExecutionCounterQuery =>", e);
		},
	});

	const [incrementCounter] = useIncrementExecutionCounterMutation({
		refetchQueries: [GetExecutionCounterDocument],
		onError: (e) => {
			console.error("useIncrementeExecutionCounterMutation =>", e);
		},
	});

	const isPremium = counter && counter.getExecutionCounter.isPremium;
	const count = counter ? counter.getExecutionCounter.executionCounter : 0;

	const [updateCode] = useUpdateCodeMutation({
		onCompleted: () => {
			console.log("Code updated!");
			toast({
				icon: <BadgeCheck className="h-5 w-5" />,
				title: "Code sauvegardé",
				className: "text-success",
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const onMount = (editor: any) => {
		editorRef.current = editor;
		editor.focus();
	};

	const runCode = async () => {
		const sourceCode = editorRef.current.getValue();

		if (!sourceCode) return;

		if (count < 50) {
			if (!isPremium) {
				incrementCounter({
					variables: { counter: { executionCounter: count } },
				});
			}

			try {
				setIsLoading(true);

				const { run: result } = await executeCode(language, sourceCode);

				setOutput(result.output);
				toast({
					icon: <BadgeCheck className="h-5 w-5" />,
					title: `${count === 49 ? "C'était ton dernier essai" : `Il te reste ${49 - count} execution. Pour ne plus avoir de limitation, passer prremium!`}`,
					className: "text-success",
				});
			} catch (e) {
				console.log("Run code error", e);
			} finally {
			}
			setIsLoading(false);
		}
	};

	const saveCode = async () => {
		if (!codes[0].id) {
			console.error("No code id found!");
			return;
		}
		await updateCode({
			variables: {
				updateCodeId: codes[0].id,
				content: value,
			},
		});
	};

	return (
		<>
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-2 w-full">
				<div className="flex items-center gap-3">
					<Image
						src="/Javascript_logo.png"
						alt="logo javascript"
						width={45}
						height={45}
						className="object-cover"
					/>
					<h1 className="font-bold text-xl">{project?.title}</h1>
				</div>

				<div className="flex gap-10">
					{count < 50 && (
						<HoverCard>
							<HoverCardTrigger>
								<Button size={"sm"} variant={"default"} onClick={runCode}>
									Executer ({count}/50)
								</Button>
							</HoverCardTrigger>
							<HoverCardContent>
								Tu as executé du code {count} fois sur 50. Pour ne plus avoir de
								limitation, passe premium!
							</HoverCardContent>
						</HoverCard>
					)}

					<div className="flex items-center self-end md:self-center">
						<Button
							size={"sm"}
							className="gap-2 bg-blue-500 hover:bg-blue-500/80"
							onClick={saveCode}
						>
							<Save />
							Enregistrer
						</Button>
					</div>
				</div>
			</div>

			<Separator className="my-3" />

			<div className="flex gap-6">
				<div className="w-1/2">
					<Editor
						height="75vh"
						defaultLanguage={language}
						defaultValue="{codes[0].content}"
						onMount={onMount}
						value={value}
						onChange={(value) => setValue(value as string)}
					/>
				</div>

				<div className="bg-black p-5 w-1/2">
					{isLoading && <p>Compilation en cours</p>}
					<div>{output ? output : "Le résultat s'affichera ici …"}</div>
				</div>
			</div>
		</>
	);
};

export default CodeEditor;
