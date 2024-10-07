import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	GetLanguagesDocument,
	useUpdateLanguageMutation,
} from "@/graphql/generated/schema";
import { Check, Cross } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const LanguageUpdate = (lang: {
	id: string;
	name: string;
	version: string;
}) => {
	const { toast } = useToast();

	const formSchema = z.object({
		id: z.string(),
		name: z.string().min(2, {
			message: "Le nom du langage doit contenir au moins 2 caractères.",
		}),
		version: z.string().min(1, {
			message: "La version du langage doit contenir au moins 1 caractère.",
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: "",
			name: "",
			version: "",
		},
	});

	function updateLanguage(id: string, name: string, version: string) {
		updateLanguageMutation({
			variables: {
				data: {
					id: id,
					name: name,
					version: version,
				},
			},
		});
	}

	const [updateLanguageMutation] = useUpdateLanguageMutation({
		onCompleted: () => {
			toast({
				icon: <Check className="h-5 w-5" />,
				title: "Language mis à jour",
				className: "text-success",
			});
		},
		refetchQueries: [GetLanguagesDocument],
		onError: (error) => {
			let errorMessage =
				error?.message || "Une erreur est survenue lors de la création.";
			if (errorMessage.includes("already taken")) {
				errorMessage = "Ce nom de langage est déjà utilisé.";
			}
			toast({
				icon: <Cross className="h-5 w-5" />,
				title: errorMessage,
				className: "text-error",
			});
		},
	});

	async function onUpdateLanguageSubmit(values: z.infer<typeof formSchema>) {
		updateLanguage(values.id, values.name, values.version);
		form.reset();
	}

	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						variant="secondary"
						onClick={() => {
							form.setValue("id", lang.id);
							form.setValue("name", lang.name);
							form.setValue("version", lang.version);
						}}
					>
						Modifier
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Quel est le nouveau nom de votre language?
						</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogDescription>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onUpdateLanguageSubmit)}
								className="space-y-8"
							>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="space-y-4">
											<FormControl>
												<Input
													className="my-2 bg-secondary"
													placeholder={lang.name}
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="version"
									render={({ field }) => (
										<FormItem className="space-y-4">
											<FormControl>
												<Input
													className="my-2 bg-secondary"
													placeholder={lang.version}
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<div className="flex justify-end space-x-2">
									<AlertDialogCancel
										className={buttonVariants({ variant: "dark" })}
									>
										Annuler
									</AlertDialogCancel>
									<AlertDialogAction
										className={buttonVariants({ variant: "default" })}
										type="submit"
									>
										Ajouter
									</AlertDialogAction>
								</div>
							</form>
						</Form>
					</AlertDialogDescription>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default LanguageUpdate;
