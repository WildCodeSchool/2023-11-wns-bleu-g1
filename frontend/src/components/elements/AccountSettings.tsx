import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { ConfirmDeletePopUp } from "@/components/elements/ConfirmDeletePopUp";
import { ChangeUsernamePopup } from "@/components/elements/ChangeUsernamePopup";
import { ChangeUserPasswordPopup } from "@/components/elements/ChangeUserPasswordPopup";

const AccountSettings = () => {
	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle>Paramètres de compte</CardTitle>
				</CardHeader>

				<CardContent className="flex flex-col space-y-3">
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button className={buttonVariants({ variant: "dark" })}>
								Modifier mon nom de profil
							</Button>
						</AlertDialogTrigger>

						<AlertDialogContent>
							<ChangeUsernamePopup />
						</AlertDialogContent>
					</AlertDialog>

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button className={buttonVariants({ variant: "dark" })}>
								Modifier mon mot de passe
							</Button>
						</AlertDialogTrigger>

						<AlertDialogContent>
							<ChangeUserPasswordPopup />
						</AlertDialogContent>
					</AlertDialog>

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button className={buttonVariants({ variant: "destructive" })}>
								Supprimer mon compte
							</Button>
						</AlertDialogTrigger>

						<AlertDialogContent>
							<ConfirmDeletePopUp />
						</AlertDialogContent>
					</AlertDialog>
				</CardContent>
			</Card>
		</div>
	);
};

export default AccountSettings;
