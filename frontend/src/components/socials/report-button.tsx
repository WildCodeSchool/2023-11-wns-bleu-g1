import { useState } from "react";

import { BadgeCheck, MessageSquareWarning } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useCreateReportingMutation } from "@/graphql/generated/schema";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { REPORT_REASON } from "@/enums/ReportReason";

const ReportButton = ({ commentId }: { commentId: string }) => {
	const { toast } = useToast();
	const reasons = Object.entries(REPORT_REASON);

	const [selectedReason, setSelectedReason] = useState("");

	const [createReporting] = useCreateReportingMutation();

	const onSubmit = async (value: string) => {
		try {
			await createReporting({
				variables: {
					data: {
						commentId,
						reason: value,
					},
				},
			});

			setSelectedReason("");

			toast({
				icon: <BadgeCheck className="h-5 w-5" />,
				title: "Votre signalement à bien été enregistré",
				className: "text-success",
			});
		} catch (e) {
			console.error(e);
			toast({
				icon: <BadgeCheck className="h-5 w-5" />,
				title: "Une erreur est survenue",
				className: "text-danger",
			});
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon">
					<MessageSquareWarning className="h-6 w-6" />
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-fit">
				<DialogHeader>
					<DialogTitle>Signaler le commentaire</DialogTitle>
					<DialogDescription>
						Vous allez signaler ce commentaire, cette action est irréversible.
					</DialogDescription>
				</DialogHeader>

				<Select
					value={selectedReason}
					onValueChange={(value) => setSelectedReason(value)}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Choisir une raison" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Raisons</SelectLabel>
							{reasons.map(([key, value], index) => (
								<SelectItem key={key + index} value={key}>
									{value}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>

				<DialogFooter>
					<DialogClose>
						<div className="flex justify-end gap-6">
							<Button
								type="button"
								variant="secondary"
								onClick={() => setSelectedReason("")}
							>
								Fermer
							</Button>

							<Button
								type="button"
								variant="default"
								onClick={() =>
									onSubmit(
										REPORT_REASON[selectedReason as keyof typeof REPORT_REASON]
									)
								}
							>
								Envoyer
							</Button>
						</div>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ReportButton;
