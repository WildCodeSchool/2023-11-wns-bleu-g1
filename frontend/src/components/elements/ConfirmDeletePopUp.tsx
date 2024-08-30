import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	useDeleteUserMutation,
	useGetUserProfileQuery,
} from "@/graphql/generated/schema";
import { BadgeCheck } from "lucide-react";
import { ApolloError } from "@apollo/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/router";
import {buttonVariants} from "@/components/ui/button";

export function ConfirmDeletePopUp() {
	const getUserProfileQuery = useGetUserProfileQuery();
	const router = useRouter();
	const defaultErrorMessage =
		"Une erreur est survenue lors de la suppression. Veuillez réessayer.";
	const [errorMessage, setErrorMessage] = useState<string>(defaultErrorMessage);
	const { toast } = useToast();

	const [deleteUserMutation, deleteUserResult] = useDeleteUserMutation({
		onCompleted: () => {
			toast({
				icon: <BadgeCheck className="h-5 w-5" />,
				title: "Utilisateur supprimé",
				className: "text-success",
			});
			router.push("/auth/inscription");
		},
		onError: (err: ApolloError) => {
			console.error(err);
			if (err.message.includes("not registered")) {
				setErrorMessage("Aucun compte n'est lié à cette adresse id.");
				return;
			}
			if (err.message.includes("invalid password")) {
				setErrorMessage("Les identifiants sont incorrects.");
				return;
			}
			setErrorMessage(defaultErrorMessage);
			toast({
				title: errorMessage,
				className: "text-error",
			});
		},
	});

	const profile = getUserProfileQuery?.data?.getUserProfile || null;
	function deleteAccount() {
		if (!profile) return;
		deleteUserMutation({
			variables: {
				deleteUserId: profile.id,
			},
		});
	}

	return (
		<>
			<AlertDialogHeader>
				<AlertDialogTitle>Etes-vous sûr de vouloir continuer?</AlertDialogTitle>
				<AlertDialogDescription>
					Cette action est irréversible. Cela supprimera définitivement votre compte et effacera vos données de nos serveurs.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel className={buttonVariants({ variant: "dark" })} >Annuler</AlertDialogCancel>
				<AlertDialogAction className={buttonVariants({ variant: "default" })} onClick={deleteAccount}>Continuer</AlertDialogAction>
			</AlertDialogFooter>
		</>
	);
}
