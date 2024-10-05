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
	DeleteUserDocument,
	GetCommentsDocument,
	GetLanguagesDocument,
	GetProjectsDocument,
	GetUserProfileDocument,
	useDeleteCommentMutation,
	useDeleteLanguageMutation,
	useDeleteProjectMutation,
	useDeleteUserMutation,
	UsersDocument,
} from "@/graphql/generated/schema";
import { Check, Cross } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ElementDelete = ({
	id,
	elementType,
}: {
	id: string;
	elementType: string;
}) => {
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

	const [deleteProjectMutation] = useDeleteProjectMutation({
		onCompleted: () => {
			toast({
				icon: <Check className="h-5 w-5" />,
				title: "Projet supprimé",
				className: "text-success",
			});
		},
		refetchQueries: [GetProjectsDocument],
		onError: (error) => {
			let errorMessage =
				error?.message || "Une erreur est survenue lors de la suppression.";
			if (errorMessage.includes("violates foreign key constraint")) {
				errorMessage = "Impossible de supprimer un projet utilisé.";
			}
			toast({
				icon: <Cross className="h-5 w-5" />,
				title: errorMessage,
				className: "text-error",
			});
		},
	});

	const [deleteUserMutation] = useDeleteUserMutation({
		onCompleted: () => {
			toast({
				icon: <Check className="h-5 w-5" />,
				title: "Utilisateur supprimé",
				className: "text-success",
			});
		},
		refetchQueries: [UsersDocument],
		onError: (error) => {
			let errorMessage =
				error?.message || "Une erreur est survenue lors de la suppression.";
			if (errorMessage.includes("violates foreign key constraint")) {
				errorMessage = "Impossible de supprimer un utilisateur utilisé.";
			}
			toast({
				icon: <Cross className="h-5 w-5" />,
				title: errorMessage,
				className: "text-error",
			});
		},
	});

	const [deleteCommentMutation] = useDeleteCommentMutation({
		onCompleted: () => {
			toast({
				icon: <Check className="h-5 w-5" />,
				title: "Commentaire supprimé",
				className: "text-success",
			});
		},
		refetchQueries: [GetCommentsDocument],
		onError: (error) => {
			let errorMessage =
				error?.message || "Une erreur est survenue lors de la suppression.";
			toast({
				icon: <Cross className="h-5 w-5" />,
				title: errorMessage,
				className: "text-error",
			});
		},
	});

	function deleteElement(id: string, type: string) {
		if (type === "language") {
			deleteLanguageMutation({
				variables: {
					deleteLanguageId: id,
				},
			});
		}
		if (type === "project") {
			deleteProjectMutation({
				variables: {
					deleteProjectId: id,
				},
			});
		}
		if (type === "user") {
			console.log("delete user", id);
			deleteUserMutation({
				variables: {
					deleteUserId: id,
					inAdminPanel: true,
				},
			});
		}
		if (type === "comment") {
			deleteCommentMutation({
				variables: {
					commentId: id,
				},
			});
		}
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
								Etes-vous sûr de vouloir supprimer cet élément?
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
								onClick={() => deleteElement(id, elementType)}
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

export default ElementDelete;
