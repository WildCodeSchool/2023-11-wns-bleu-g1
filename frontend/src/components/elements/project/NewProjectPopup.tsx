import React from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import NewProjectFrom from "@/components/elements/project/NewProjectForm";
import { buttonVariants } from "@/components/ui/button";

const NewProjectPopup = () => {
	return (
		<AlertDialog>
			<AlertDialogTrigger className={buttonVariants()}>
				Nouveau projet
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Quel nom souhaitez-vous donner a votre projet?
					</AlertDialogTitle>
					<NewProjectFrom />
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default NewProjectPopup;
