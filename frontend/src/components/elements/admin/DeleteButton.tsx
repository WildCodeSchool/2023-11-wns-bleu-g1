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

interface Props {
	onClick: () => void;
	name: string;
	variant: "destructive" | "default";
}

const DeleteButton = ({ onClick, name, variant }: Props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant={variant}>{name}</Button>
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
						<AlertDialogCancel className={buttonVariants({ variant: "dark" })}>
							Annuler
						</AlertDialogCancel>
						<AlertDialogAction
							className={buttonVariants({
								variant: "destructive",
							})}
							onClick={onClick}
						>
							Confirmer
						</AlertDialogAction>
					</AlertDialogFooter>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteButton;
