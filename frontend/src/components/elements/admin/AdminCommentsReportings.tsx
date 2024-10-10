import { useRouter } from "next/router";

import {
	useDeleteReportingsMutation,
	useGetAllReportsQuery,
	GetAllReportsDocument,
} from "@/graphql/generated/schema";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ElementDelete from "./ElementDelete";
import DeleteButton from "./DeleteButton";
import { useToast } from "@/components/ui/use-toast";
import { Check } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

const AdminCommentsReportings = () => {
	const { toast } = useToast();

	const { data } = useGetAllReportsQuery();
	const reports = data?.getAllReports || [];

	const [deleteReportings] = useDeleteReportingsMutation({
		refetchQueries: [GetAllReportsDocument],
		onCompleted: () => {
			toast({
				icon: <Check className="h-5 w-5" />,
				title: "Signalements supprimés",
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

	const handleDeleteReportings = async (reports: string[]) => {
		deleteReportings({
			variables: {
				reports: reports,
			},
		});
	};

	return (
		<>
			<h1 className="flex justify-center text-2xl font-bold">
				Administration des commentaires signalé
			</h1>

			{reports.length > 0 ? (
				<div className="pt-2 flex justify-center mt-5">
					<div
						className="flex flex-col justify-center border border-white rounded-xl px-3 pb-4 pt-2"
						id="languagesListSection"
					>
						<h2 className="pb-2">Liste des commentaires signalé:</h2>

						<Separator />

						{reports.map(
							({
								id,
								content,
								reportings,
								user: { pseudo: issuer },
								project: { title },
							}) => (
								<div key={id} className="flex gap-2 justify-between pt-2 py-1">
									<p className="flex w-full items-center text-center">
										Commentaire &quot;{content.slice(0, 5)}
										{content.length > 5 ? "..." : ""}&quot; signalé{" "}
										{reportings.length} fois:
									</p>
									<div className="flex gap-3">
										<Dialog>
											<DialogTrigger asChild>
												<Button variant="dark">Voir</Button>
											</DialogTrigger>
											<DialogContent className="w-fit">
												<DialogHeader>
													<DialogTitle>Détails du signalement</DialogTitle>
													<DialogDescription>
														Voici les informations du commentaire
													</DialogDescription>
												</DialogHeader>
												<div className="grid gap-4 py-4">
													<p>
														Commentaire: <span>{content}</span>
													</p>
													<p>
														Écrit par: <span>{issuer}</span>
													</p>
													<p>
														Sur le projet: <span>{title}</span>
													</p>
													<p className="flex flex-col">
														Signalé par:{" "}
														{reportings.map(
															(
																{ flagger: { id: flaggeId, pseudo } },
																index
															) => (
																<span key={flaggeId + pseudo + index}>
																	{pseudo}
																</span>
															)
														)}
													</p>
													<p className="flex flex-col">
														Raison:{" "}
														{reportings.map(
															({ id: flaggeId, reason }, index) => (
																<span key={flaggeId + reason + index}>
																	{reason}
																</span>
															)
														)}
													</p>
												</div>
												<DialogFooter>
													<DialogClose asChild>
														<Button type="button" variant="default">
															Fermer
														</Button>
													</DialogClose>
												</DialogFooter>
											</DialogContent>
										</Dialog>
										<ElementDelete id={id} elementType="comment" />
										<DeleteButton
											onClick={() =>
												handleDeleteReportings(reportings.map(({ id }) => id))
											}
											name="Annuler signalement"
											variant="default"
										/>
									</div>
								</div>
							)
						)}
					</div>
				</div>
			) : (
				<p className="pt-2 flex justify-center mt-5">
					Aucun commentaire signalé
				</p>
			)}
		</>
	);
};

export default AdminCommentsReportings;
