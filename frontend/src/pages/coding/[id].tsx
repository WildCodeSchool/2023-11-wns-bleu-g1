import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PrismLoader from "@/components/prism-loader";
import { Separator } from "@/components/ui/separator";
import Prism from "prismjs";
import AuthLayout from "@/components/elements/auth-layout";
import { useRouter } from "next/router";
import {
	useUpdateCodeMutation,
	GetExecutionCounterDocument,
	useGetExecutionCounterQuery,
	useIncrementExecutionCounterMutation,
	useGetProjectByIdQuery,
	useGetUserProfileQuery,
	GetProjectByIdQuery,
	useToggleProjectPublicStateMutation,
	GetProjectByIdDocument,
	GetPublicsProjectsDocument,
} from "@/graphql/generated/schema";
import { BadgeCheck, Save } from "lucide-react";
import LikeButton from "@/components/socials/like-button";
import PageLoader from "@/components/elements/page-loader";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const CodingPage = () => {
	const router = useRouter();
	const { toast } = useToast();
	const { id } = router.query;
	const {
		data: getUserProfileData,
		loading: getUserProfileLoading,
		error: getUserProfileError,
	} = useGetUserProfileQuery();
	const {
		data,
		loading: getProjectByIdloading,
		error: getProjectByIdError,
	} = useGetProjectByIdQuery({
		variables: {
			getProjectId: id as string,
		},
		skip: !id,
	});

	// logic for counter execution button
	const { data: counter, loading } = useGetExecutionCounterQuery({
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
						getProjectId: id as string,
					},
				},
				{
					query: GetPublicsProjectsDocument,
					variables: {
						limit: 12,
						offset: 0,
					},
				},
			],
		});

	const isPremium = counter && counter.getExecutionCounter.isPremium;
	const count = counter ? counter.getExecutionCounter.executionCounter : 0;

	const project = data?.getProject as GetProjectByIdQuery["getProject"];
	const thisCode = project?.codes[0];
	const thisCodeId = thisCode?.id;

	const [code, setCode] = useState("");
	const [showResult, setShowResult] = useState("");

	useEffect(() => {
		async function setCodeOnMount() {
			const result_element_on_mount = document.querySelector(
				"#highlighting-content"
			);
			const coding_input_on_mount = document.querySelector(
				"#codingInput"
			) as HTMLTextAreaElement;
			if (
				thisCode?.content &&
				thisCode.content !== "" &&
				result_element_on_mount
			) {
				result_element_on_mount.innerHTML = thisCode?.content;
				coding_input_on_mount.innerHTML = thisCode?.content;
				Prism.highlightElement(result_element_on_mount);
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
			toast({
				icon: <BadgeCheck className="h-5 w-5" />,
				title: `Votre projet a bien été enregistré !`,
				className: "text-success",
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});

	async function saveCode() {
		if (!thisCodeId) {
			console.error("No code id found!");
			return;
		}
		await updateCode({
			variables: {
				updateCodeId: thisCodeId,
				content: code,
			},
		});
	}

	const runCode = () => {
		// @Todo: Remettre le compte à 50 en dehors des tests
		if (count < 50) {
			if (!isPremium) {
				incrementCounter({
					variables: { counter: { executionCounter: count } },
				});
			}

			try {
				const result = eval(code);

				setShowResult(result);
			} catch (error: any) {
				console.error(error);

				setShowResult("Error: " + error.message);
			}
		}
	};

	if (getUserProfileLoading || getProjectByIdloading) {
		return <PageLoader />;
	}

	if (getUserProfileError || getProjectByIdError) {
		console.error(getUserProfileError || getProjectByIdError);
		return;
	}

	const userId = getUserProfileData?.getUserProfile.id as string;

	const handlePublicStateChange = () => {
		toggleProjectPublicStateMutation({
			variables: {
				projectId: id as string,
			},
		});
	};

	return (
		<AuthLayout>
			<div className="min-h-dvh">
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
					{userId === project.user.id && (
						<div className="flex items-center self-end md:self-center gap-5">
							<div className="flex items-center space-x-2">
								<Switch
									id="public-state"
									checked={project.isPublic}
									onCheckedChange={handlePublicStateChange}
								/>
								<Label htmlFor="public-state">En Public</Label>
							</div>
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
				<Separator className="my-3" />

				<div className="flex flex-col md:flex-row">
					<div
						id="codingArea"
						className="basis-2/5 relative min-h-80 md:min-h-[70dvh]"
					>
						{/*TODO: limit terminal row max length */}
						<Textarea
							className="left-0 right-0 z-10 caret-white bg-transparent text-transparent leading-[20pt] text-[15pt] resize-none absolute top-0"
							placeholder={
								thisCode?.content === "" ? "Commencez a coder ici..." : ""
							}
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
							className="left-0 right-3 z-0 text-[15pt] h-full font-mono border-none absolute top-0 rounded-md leading-[20pt] overflow-auto bg-input"
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
					{!loading && (
						<div className="basis-1/5 flex flex-col gap-3 justify-center py-6">
							{count < 50 && (
								<Button
									size={"sm"}
									data-testid="exec-btn"
									className="w-fit self-center"
									onClick={runCode}
								>
									Exécuter
								</Button>
							)}
							{!isPremium && (
								<>
									<p data-testid="counter" className="text-center">
										{count}/50
									</p>
									<p
										data-testid="not-premium"
										className="text-center select-none"
									>
										{count === 50 &&
											"Vous avez atteint la limite de 50 exécutions. "}
										Pour ne plus avoir de limites, passer premium!
									</p>
								</>
							)}
						</div>
					)}
					<div id="resultArea" className="basis-2/5">
						<Textarea
							readOnly={true}
							className="left-0 leading-[20pt] text-[15pt] ml-4 p-2.5 bg-input resize-none min-h-80 md:min-h-[70dvh]"
							value={showResult}
						/>
					</div>
				</div>

				<Separator className="mt-3 md:mt-8 mb-3" />

				<LikeButton project={project} userId={userId} />
			</div>
		</AuthLayout>
	);
};

export default CodingPage;
