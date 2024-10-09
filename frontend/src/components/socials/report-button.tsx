import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApolloError } from "@apollo/client";

import { BadgeCheck, TriangleAlert } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "../ui/use-toast";
import { useCreateReportingMutation } from "@/graphql/generated/schema";

const formSchema = z.object({
	reason: z
		.string()
		.min(10, {
			message:
				"Vous devez renseigner une raison pour signaler un message (10 caradtères minimum)",
		})
		.max(100, {
			message: "votre commentaire ne doit pas dépasser 100 caractères",
		})
		.trim(),
});

const ReportButton = ({ commentId }: { commentId: string }) => {
	const { toast } = useToast();

	const [openModal, setOpenModal] = useState(false);

	const [createReporting] = useCreateReportingMutation();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			reason: "",
		},
	});
	const {
		formState: { errors },
	} = form;

	const onSubmit = async (value: z.infer<typeof formSchema>) => {
		try {
			await createReporting({
				variables: {
					data: {
						commentId,
						reason: value.reason,
					},
				},
			});

			setOpenModal(false);
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
				<Button variant="ghost" size="icon" onClick={() => setOpenModal(true)}>
					<TriangleAlert className="h-6 w-6" />
				</Button>
			</DialogTrigger>
			{openModal && (
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Signaler le commentaire</DialogTitle>
						<DialogDescription>
							Vous allez signaler ce commentaire, cette action est irréversible.
						</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<CardContent>
								<FormField
									control={form.control}
									name="reason"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Raison du signalement*</FormLabel>
											<FormControl>
												<Input
													placeholder="Veuillez renseigner la raison du signalement…"
													required
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								{errors.reason && (
									<span className="text-xs text-red-600">
										{errors.reason.message}
									</span>
								)}
							</CardContent>

							<CardFooter className="flex justify-end gap-4">
								<Button
									type="button"
									variant="secondary"
									onClick={() => setOpenModal(false)}
								>
									Fermer
								</Button>

								<Button type="submit" variant="default">
									Envoyer
								</Button>
							</CardFooter>
						</form>
					</Form>
				</DialogContent>
			)}
		</Dialog>
	);
};

export default ReportButton;
