import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	useDeleteLanguageMutation,
	useGetLanguagesQuery,
	useCreateLanguageMutation,
	GetLanguagesDocument,
} from "@/graphql/generated/schema";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Check, Cross } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AdminLanguages = () => {
	const { data } = useGetLanguagesQuery();
	const languages = data?.getLanguages || [];
	const { toast } = useToast();

	const [deleteLanguageMutation] = useDeleteLanguageMutation({
		onCompleted: () => {
			console.log("Language deleted");
			toast({
				icon: <Check className="h-5 w-5" />,
				title: "Language supprimé",
				className: "text-success",
			});
		},
		refetchQueries: [GetLanguagesDocument],
		onError: (error) => {
			console.error("deleteLanguage error: ", error);
			toast({
				icon: <Cross className="h-5 w-5" />,
				title: error?.message || "Une erreur est survenue lors de la création.",
				className: "text-error",
			});
		},
	});

	const [addLanguageMutation] = useCreateLanguageMutation({
		onCompleted: () => {
			console.log("Language created");
			toast({
				icon: <Check className="h-5 w-5" />,
				title: "Language créé",
				className: "text-success",
			});
		},
		refetchQueries: [GetLanguagesDocument],
		onError: (error) => {
			console.error("addLanguage error: ", error);
			toast({
				icon: <Cross className="h-5 w-5" />,
				title: error?.message || "Une erreur est survenue lors de la création.",
				className: "text-error",
			});
		},
	});

	function addLanguage(name: string) {
		addLanguageMutation({
			variables: {
				data: {
					name: name,
				},
			},
		});
	}

	function deleteLanguage(id: string) {
		deleteLanguageMutation({
			variables: {
				deleteLanguageId: id,
			},
		});
		console.log(`deleteLanguageMutation: lang.id=${id}`);
	}

	const formSchema = z.object({
		name: z.string().min(2, {
			message: "Le nom du langage doit contenir au moins 2 caractères.",
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	async function onNewLanguageSubmit(values: z.infer<typeof formSchema>) {
		addLanguage(values.name);
		form.reset();
	}

	return (
		<>
			<h1 className="flex w-full justify-center text-2xl font-bold">
				Administration des languages
			</h1>
			<div className="pt-2 w-full flex justify-center mt-5">
				<div
					className="flex flex-col justify-center w-1/3 border border-white rounded-xl px-3 pb-4 pt-2"
					id="languagesListSection"
				>
					<h2>Liste des languages:</h2>
					<Separator />
					<div className="pt-4">
						{languages.map((lang) => (
							<div key={lang.id} className="flex justify-between py-1">
								<p className="flex w-full items-center text-center">
									{lang.name}
								</p>
								<div className="flex gap-2">
									<Button variant="secondary">Modifier</Button>
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button variant="destructive">Supprimer</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<div className="flex flex-col gap-2">
												<AlertDialogHeader>
													<AlertDialogTitle>
														Etes-vous sûr de vouloir supprimer ce langage?
													</AlertDialogTitle>
													<AlertDialogDescription>
														Cette action est irréversible.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel
														className={buttonVariants({ variant: "dark" })}
													>
														Annuler
													</AlertDialogCancel>
													<AlertDialogAction
														className={buttonVariants({
															variant: "destructive",
														})}
														onClick={() => deleteLanguage(lang.id)}
													>
														Confirmer
													</AlertDialogAction>
												</AlertDialogFooter>
											</div>
										</AlertDialogContent>
									</AlertDialog>
								</div>
							</div>
						))}
					</div>
					<Separator />
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
									</form>
								</Form>
							</AlertDialogDescription>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
		</>
	);
};

export default AdminLanguages;
