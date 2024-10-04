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
import { Button, buttonVariants } from "@/components/ui/button";
import React from "react";
import {
	GetLanguagesDocument,
	useDeleteLanguageMutation,
} from "@/graphql/generated/schema";
import { Check, Cross } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const LanguageDelete = (lang: { id: string }) => {
	const { toast } = useToast();

	const [deleteLanguageMutation] = useDeleteLanguageMutation({
		onCompleted: () => {
			toast({
				icon: <Check className="h-5 w-5" />,
				title: "Language supprimé",
				className: "text-success",
			});
		},
		refetchQueries: [GetLanguagesDocument],
		onError: (error) => {
			let errorMessage =
				error?.message || "Une erreur est survenue lors de la suppression.";
			if (errorMessage.includes("violates foreign key constraint")) {
				errorMessage = "Impossible de supprimer un langage utilisé.";
			}
			toast({
				icon: <Cross className="h-5 w-5" />,
				title: errorMessage,
				className: "text-error",
			});
		},
	});
	function deleteLanguage(id: string) {
		deleteLanguageMutation({
			variables: {
				deleteLanguageId: id,
			},
		});
	}

	return (
		<>
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
		</>
	);
};

export default LanguageDelete;
