import { useRouter } from "next/router";

import { useGetAllReportsQuery } from "@/graphql/generated/schema";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import ElementDelete from "./ElementDelete";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

const AdminReportings = () => {
	const { toast } = useToast();
	const router = useRouter();

	const { data } = useGetAllReportsQuery();
	const reports = data?.getAllReports || [];

	return (
		<>
			<h1 className="flex justify-center text-2xl font-bold">
				Administration des commentaires signalé
			</h1>

			<div className="pt-2 flex justify-center mt-5">
				<div
					className="flex flex-col justify-center border border-white rounded-xl px-3 pb-4 pt-2"
					id="languagesListSection"
				>
					<h2>Liste des commentaires signalé:</h2>

					<Separator />

					{reports.map(
						({ id, content, reportings, project: { id: projectId } }) => (
							<div key={id} className="flex gap-4 justify-between py-1">
								<HoverCard>
									<HoverCardTrigger>
										<p className="flex w-full items-center text-center">
											Commentaire &quot;{content.slice(0, 10)}…&quot;
										</p>
									</HoverCardTrigger>
									<HoverCardContent>{content}</HoverCardContent>
									signalé {reportings.length} fois
								</HoverCard>
								<div className="flex gap-2">
									<Button onClick={() => router.push(`/coding/${projectId}`)}>
										Voir commentaire
									</Button>
									<ElementDelete id={id} elementType="comment" />
								</div>
							</div>
						)
					)}
				</div>
			</div>
		</>
	);
};

export default AdminReportings;
