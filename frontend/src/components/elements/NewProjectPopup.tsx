import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import NewProjectFrom from "@/components/elements/NewProjectForm";


const NewProjectPopup = () => {
    return (
        <AlertDialog>
          <AlertDialogTrigger>Nouveau projet</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Quel nom souhaitez-vous donner a votre projet?</AlertDialogTitle>
                <NewProjectFrom />
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
    )
}

export default NewProjectPopup;
