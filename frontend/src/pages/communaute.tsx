import AuthLayout from "@/components/elements/auth-layout";
import PageLoader from "@/components/elements/page-loader";
import { Separator } from "@/components/ui/separator";
import { useGetPublicsProjectsQuery } from "@/graphql/generated/schema";
import React, { useState } from "react";
import NotFoundAlert from "@/components/elements/not-found-alert";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CommunautePage = () => {
	const [page, setPage] = useState(0);
	const limit = 12;
	const offset = page * limit;

	const getPublicProjectsQuery = useGetPublicsProjectsQuery({
		variables: {
			limit,
			offset,
		},
		notifyOnNetworkStatusChange: true,
	});

	if (getPublicProjectsQuery.loading) return <PageLoader />;

	if (getPublicProjectsQuery.error) {
		console.error(getPublicProjectsQuery.error);
		return;
	}
	const publicsProjects = getPublicProjectsQuery.data?.getPublicsProjects || [];

	const handlePreviousPage = () => {
		if (page > 0) setPage(page - 1);
	};

	const handleNextPage = () => {
		if (publicsProjects.length === limit) setPage(page + 1);
		getPublicProjectsQuery.fetchMore({
			variables: {
				offset: publicsProjects.length,
			},
		});
	};

	return (
		<AuthLayout>
			<div className="space-y-0.5">
				<h1 className="text-2xl font-bold tracking-tight">Communauté</h1>
				<p className="text-muted-foreground">
					Retrouves les projets des autres utilisateurs. Tu peux les consulter,
					mettre un j&apos;aime ou même des commentaires.
				</p>
			</div>
			<Separator className="my-6" />
			{publicsProjects.length > 0 ? (
				<div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
						{publicsProjects.map((project) => (
							<Card key={project.id}>
								<CardHeader>
									<CardTitle>{project.title}</CardTitle>
									<CardDescription>
										Crée le{" "}
										{new Date(project.createdAt).toLocaleString("fr-FR", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}{" "}
										par {project.user.pseudo}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Link href={"#"} className={buttonVariants()}>
										Voir le projet
									</Link>
								</CardContent>
							</Card>
						))}
					</div>
					{/* PAGINATION */}
					<div className="w-full flex items-center justify-between px-24 py-2 my-6">
						<Button
							variant={"ghost"}
							className="gap-1 w-fit pl-2.5"
							disabled={page === 0}
							onClick={handlePreviousPage}
						>
							<ChevronLeft className="h-4 w-4 mt-1" />
							Précédent
						</Button>
						<Button
							variant={"ghost"}
							className="gap-1 w-fit pr-2.5"
							disabled={publicsProjects.length < limit}
							onClick={handleNextPage}
						>
							Suivant
							<ChevronRight className="h-4 w-4 mt-1" />
						</Button>
					</div>
				</div>
			) : (
				<NotFoundAlert
					title="Vous n'avez pas encore de projet"
					description='Vous pouvez en créer un en cliquant sur le bouton "Nouveau
							projet"'
				/>
			)}
		</AuthLayout>
	);
};

export default CommunautePage;
