import { Editor, OnMount } from "@monaco-editor/react";
import Image from "next/image";
import { useMemo, useRef, useState, useEffect } from "react";
import { editor } from "monaco-editor";

import {
	GetExecutionCounterDocument,
	GetProjectByIdDocument,
	GetProjectByIdQuery,
	useGetExecutionCounterQuery,
	useIncrementExecutionCounterMutation,
	useToggleProjectPublicStateMutation,
	useUpdateCodeMutation,
} from "@/graphql/generated/schema";
import { executeCode } from "@/lib/executeCode";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { BadgeCheck, Download, Save } from "lucide-react";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../ui/hover-card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { downloadCodeAsFile } from "@/lib/utils";
import router from "next/router";

interface Props {
	project: GetProjectByIdQuery["getProject"];
	userId: string;
}

const CodeEditor = ({ project, userId }: Props) => {
	const { isPublic, user, codes } = project;
	const language = codes[0].language.name.toLocaleLowerCase();
	const { toast } = useToast();

	const editorRef = useRef<editor.IStandaloneCodeEditor>();

	const [value, setValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [output, setOutput] = useState(null);
	const [isError, setIsError] = useState(false);

	useMemo(() => {
		setValue(codes[0].content);
	}, [codes]);

	const { data: counter, refetch: getExecutionCounter } =
		useGetExecutionCounterQuery({
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

	const onMount: OnMount = (editor) => {
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

				if (!isPremium) {
					toast({
						icon: <BadgeCheck className="h-5 w-5" />,
						title: `${count === 49 ? "C'était ton dernier essai" : `Il te reste ${49 - count} execution. Pour ne plus avoir de limitation, passer premium!`}`,
						className: "text-success",
					});
				}
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

	const downloadCode = () => {
		const sourceCode = editorRef.current && editorRef.current.getValue();

		if (!sourceCode || sourceCode.length <= 1) {
			toast({
				title: "Le code est vide",
				description: "Veuillez écrire du code avant de le télécharger",
				className: "text-error",
			});
			return;
		}

		downloadCodeAsFile({
			code: sourceCode,
			language,
		});
	};

	const handlePublicStateChange = () => {
		toggleProjectPublicStateMutation({
			variables: {
				projectId: project.id as string,
			},
		});
	};

	useEffect(() => {
		const handleRouteChange = () => {
			getExecutionCounter();
		};

		// Add event listener to handle route change
		router.events.on("routeChangeComplete", handleRouteChange);

		// Clean up event listener on component unmount
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	});

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
								data-testid="public-state-btn"
								checked={project.isPublic}
								onCheckedChange={handlePublicStateChange}
								className="data-[state=unchecked]:bg-white"
							/>
							<Label data-testid="public-state-label" htmlFor="public-state">
								{isPublic ? "Public" : "Privé"}
							</Label>
						</div>
					)}
				</div>

				<div className="flex flex-wrap gap-4">
					{count < 50 ? (
						<HoverCard>
							<HoverCardTrigger>
								<Button
									data-testid="exec-btn"
									size={"sm"}
									variant={"default"}
									onClick={runCode}
								>
									Executer {!isPremium && `(${count}/50)`}
								</Button>
							</HoverCardTrigger>
							{!isPremium && (
								<HoverCardContent>
									Tu as executé du code {count} fois sur 50. Pour ne plus avoir
									de limitation, passe premium!
								</HoverCardContent>
							)}
						</HoverCard>
					) : (
						<HoverCard>
							<HoverCardTrigger>
								<span
									className="flex bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium rounded-md items-center justify-center px-3 py-2 cursor-pointer
								"
									onClick={() =>
										toast({
											icon: <BadgeCheck className="h-5 w-5" />,
											title:
												"Tu ne peux plus exécuter de code pour aujourd'hui, attends minuit ou passe premium !",
											className: "text-error",
										})
									}
								>
									Executer {`(${count}/50)`}
								</span>
							</HoverCardTrigger>
							<HoverCardContent>
								Tu ne peux plus exécuter de code pour aujourd&apos;hui. Pour ne
								plus avoir de limitation, passe premium!
							</HoverCardContent>
						</HoverCard>
					)}

					{userId === user.id && (
						<div className="flex items-center self-end md:self-center">
							<Button
								data-testid="save-btn"
								size={"sm"}
								className="gap-2 bg-blue-500 hover:bg-blue-500/80"
								onClick={saveCode}
							>
								<Save />
								Enregistrer
							</Button>
						</div>
					)}
					<Button
						data-testid="download-btn"
						size={"sm"}
						className="gap-2 bg-blue-500 hover:bg-blue-500/80"
						onClick={downloadCode}
					>
						<Download />
						Télécharger
					</Button>
				</div>
			</div>

			<Separator className="my-3" />

			<div className="flex gap-6">
				<div className="w-1/2">
					<Editor
						height="75vh"
						defaultLanguage={language}
						onMount={onMount}
						value={value}
						onChange={(value) => {
							if (value) {
								setValue(value);
							}
						}}
					/>
				</div>

				<div
					className={`bg-black p-5 w-1/2 border-[1px] ${isError ? "border-red-600 text-red-600" : "border-white text-white"}`}
				>
					{isLoading && <p>Compilation en cours</p>}
					{!isLoading && (
						<div>{output ? output : "Le résultat s'affichera ici …"}</div>
					)}
				</div>
			</div>
		</>
	);
};

export default CodeEditor;
