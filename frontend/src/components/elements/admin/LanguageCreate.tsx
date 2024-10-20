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
	useCreateLanguageMutation,
} from "@/graphql/generated/schema";
import { Check, Cross } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const LanguageCreate = () => {
	const { toast } = useToast();

	const formSchema = z.object({
		name: z
			.string()
			.min(2, {
				message: "Le nom du langage doit contenir au moins 2 caractères.",
			})
			.max(50, {
				message: "Le nom du langage ne doit pas dépasser 50 caractères.",
			})
			.max(15, {
				message:
					"Le nom du langage ne doit pas contenir plus de 15 caractères.",
			}),
		version: z
			.string()
			.min(1, {
				message: "La version du langage doit contenir au moins 1 caractère.",
			})
			.max(10, {
				message: "La version du langage ne doit pas dépasser 10 caractères.",
			}),
		color: z
			.string()
			.min(7, {
				message: "La couleur du langage doit contenir au moins 7 caractères.",
			})
			.max(7, {
				message:
					"La couleur du langage ne doit pas contenir plus de 7 caractères.",
			}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			version: "",
			color: "",
		},
	});

	const [addLanguageMutation] = useCreateLanguageMutation({
		onCompleted: () => {
			toast({
				icon: <Check className="h-5 w-5" />,
				title: "Language créé",
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

	function addLanguage(name: string, version: string, color: string) {
		addLanguageMutation({
			variables: {
				data: {
					name: name,
					version: version,
					color: color,
				},
			},
		});
	}
	async function onNewLanguageSubmit(values: z.infer<typeof formSchema>) {
		addLanguage(values.name, values.version, values.color);
		form.reset();
	}

	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<div className="flex justify-end pt-3">
						<Button variant="default">Ajouter un langage</Button>
					</div>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Quel nom souhaitez-vous donner a votre language?
						</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogDescription>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onNewLanguageSubmit)}
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
													placeholder="Mon nouveau langage"
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
													placeholder="Version au format x.x.x"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="color"
									render={({ field }) => (
										<FormItem className="space-y-4">
											<FormControl>
												<Input
													className="my-2 bg-secondary"
													placeholder="Couleur au format #000000"
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

export default LanguageCreate;
