import { Editor, MonacoDiffEditor, OnMount } from "@monaco-editor/react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type monaco from "monaco-editor";

import { Separator } from "@/components/ui/separator";
import {
	GetExecutionCounterDocument,
	GetProjectByIdDocument,
	GetProjectByIdQuery,
	useGetExecutionCounterQuery,
	useIncrementExecutionCounterMutation,
	useToggleProjectPublicStateMutation,
	useUpdateCodeMutation,
} from "@/graphql/generated/schema";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { BadgeCheck, Save } from "lucide-react";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../ui/hover-card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { executeCode } from "@/lib/executeCode";

interface Props {
	project: GetProjectByIdQuery["getProject"];
	userId: string;
}

const CodeEditor = ({ project, userId }: Props) => {
	const { isPublic, user, codes } = project;
	const language = codes[0].language.name.toLocaleLowerCase();

	const { toast } = useToast();

	const editorRef = useRef(); // typer le useref <T>

	const [value, setValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [output, setOutput] = useState(null);
	const [isError, setIsError] = useState(false);

	useMemo(() => {
		setValue(codes[0].content);
	}, [codes]);

	const { data: counter } = useGetExecutionCounterQuery({
		onError: (e: any) => {
			console.error("useGetExecutionCounterQuery =>", e);
		},
	});

	const [incrementCounter] = useIncrementExecutionCounterMutation({
		refetchQueries: [GetExecutionCounterDocument],
		onError: (e: any) => {
			console.error("useIncrementeExecutionCounterMutation =>", e);
		},
	});

	const [toggleProjectPublicStateMutation] =
		useToggleProjectPublicStateMutation({
			onCompleted: (data) => {
				const { isPublic } = data.toggleProjectPublicState;

				toast({
					icon: <BadgeCheck className="h-5 w-5" />,
					title: `Votre projet est maintenant ${isPublic ? "public" : "privé"}`,
					className: "text-success",
				});
			},
			refetchQueries: [
				{
					query: GetProjectByIdDocument,
					variables: {
						getProjectId: project.id as string,
					},
				},
				{
					query: GetProjectByIdDocument,
					variables: {
						limit: 12,
						offset: 0,
					},
				},
			],
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
		onError: (e: any) => {
			console.error(e);
		},
	});

	const onMount = (editor: any) => {
		editorRef.current = editor;
		editor.focus();
	};

	const runCode = async () => {
		const sourceCode = editorRef.current && editorRef.current.getValue();

		if (!sourceCode) return;

		if (count < 50) {
			if (!isPremium) {
				incrementCounter({
					variables: { counter: { executionCounter: count } },
				});
			}

			try {
				setIsLoading(true);

				const { run: result } = await executeCode(
					language,
					sourceCode,
					codes[0].language.version
				);

				setOutput(result.output.split("\n"));
				result.stderr ? setIsError(true) : setIsError(false);
				toast({
					icon: <BadgeCheck className="h-5 w-5" />,
					title: `${count === 49 ? "C'était ton dernier essai" : `Il te reste ${49 - count} execution. Pour ne plus avoir de limitation, passer prremium!`}`,
					className: "text-success",
				});
			} catch (e: any) {
				console.error("Run code error", e);
				toast({
					title: "Une erreur est survenue",
					description: e.message || "Impossblie d'executer le code",
					className: "text-error",
				});
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

	const handlePublicStateChange = () => {
		toggleProjectPublicStateMutation({
			variables: {
				projectId: project.id as string,
			},
		});
	};

	return (
		<>
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-2 w-full">
				<div className="flex items-center gap-4">
					<Image
						src="/Javascript_logo.png"
						alt="logo javascript"
						width={45}
						height={45}
						className="object-cover"
					/>
					<h1 className="font-bold text-xl">{project?.title}</h1>

					{userId === user.id && (
						<div className="flex items-center space-x-2">
							<Switch
								id="public-state"
								checked={project.isPublic}
								onCheckedChange={handlePublicStateChange}
								className="data-[state=unchecked]:bg-white"
							/>
							<Label htmlFor="public-state">
								{isPublic ? "Public" : "Privé"}
							</Label>
						</div>
					)}
				</div>

				<div className="flex gap-10">
					{count < 50 && (
						<HoverCard>
							<HoverCardTrigger>
								<Button size={"sm"} variant={"default"} onClick={runCode}>
									Executer {!isPremium && `(${count}/50)`}
								</Button>
							</HoverCardTrigger>
							<HoverCardContent>
								Tu as executé du code {count} fois sur 50. Pour ne plus avoir de
								limitation, passe premium!
							</HoverCardContent>
						</HoverCard>
					)}

					{userId === user.id && (
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
					)}
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

				<div
					className={`bg-black p-5 w-1/2 border-[1px] ${isError ? "border-red-600 text-red-600" : "border-white text-white"}`}
				>
					{isLoading && <p>Compilation en cours</p>}
					<div>{output ? output : "Le résultat s'affichera ici …"}</div>
				</div>
			</div>
		</>
	);
};

export default CodeEditor;
