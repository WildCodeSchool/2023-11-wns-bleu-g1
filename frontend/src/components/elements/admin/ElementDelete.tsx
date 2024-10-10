import React from "react";
import {
	GetLanguagesDocument,
	GetProjectsDocument,
	useDeleteLanguageMutation,
	useDeleteProjectMutation,
	useDeleteUserMutation,
	UsersDocument,
	useDeleteCommentAndLinkedReportMutation,
	GetAllReportsDocument,
} from "@/graphql/generated/schema";
import { Check, Cross } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import DeleteButton from "./DeleteButton";

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

	const [deleteCommentAndLinkedReport] =
		useDeleteCommentAndLinkedReportMutation({
			refetchQueries: [GetAllReportsDocument],
			onCompleted: () => {
				toast({
					icon: <Check className="h-5 w-5" />,
					title: "Commentaire supprimé",
					className: "text-success",
				});
			},
			onError: (e) => {
				toast({
					icon: <Check className="h-5 w-5" />,
					title: e.message,
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
			deleteUserMutation({
				variables: {
					deleteUserId: id,
					inAdminPanel: true,
				},
			});
		}
		if (type === "comment") {
			deleteCommentAndLinkedReport({
				variables: {
					deleteCommentAndLinkedReportId: id,
				},
			});
		}
	}

	return (
		<DeleteButton
			onClick={() => deleteElement(id, elementType)}
			name="Supprimer"
			variant="destructive"
		/>
	);
};

export default ElementDelete;
