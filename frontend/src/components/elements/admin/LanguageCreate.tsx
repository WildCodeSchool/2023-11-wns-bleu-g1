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
			name: "",
			version: "",
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

	function addLanguage(name: string, version: string) {
		addLanguageMutation({
			variables: {
				data: {
					name: name,
					version: version,
				},
			},
		});
	}
	async function onNewLanguageSubmit(values: z.infer<typeof formSchema>) {
		addLanguage(values.name, values.version);
		form.reset();
	}

	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<div className="flex justify-end pt-3">
						<Button variant="default">Ajouter un language</Button>
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
													placeholder="version"
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
