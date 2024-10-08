import Link from "next/link";
import React from "react";
import { buttonVariants } from "../../ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../../ui/card";
import { Project, User } from "@/graphql/generated/schema";
import { Badge } from "../../ui/badge";

type ProjectWithPartialUser = Omit<Project, "user"> & { user: Partial<User> };

interface Props {
	project: Partial<ProjectWithPartialUser>;
	onProfilePage: boolean;
	className?: string;
}

const ProjectCard = ({ project, onProfilePage, className }: Props) => {
	const statusBadge = project.isPublic ? (
		<Badge variant={"blue"} className="pb-1 font-bold">
			Public
		</Badge>
	) : (
		<Badge variant={"blue"} className="pb-1 font-bold">
			Privé
		</Badge>
	);

	return (
		<Card className={className}>
			<CardHeader>
				<div className="flex flex-wrap items-center justify-between gap-2">
					<CardTitle>{project.title}</CardTitle>
					{onProfilePage && statusBadge}
				</div>
				<CardDescription>
					Crée le{" "}
					{new Date(project.createdAt).toLocaleString("fr-FR", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}{" "}
					{!onProfilePage && `par ${project.user?.pseudo}`}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Link href={`/coding/${project.id}`} className={buttonVariants()}>
					Voir le projet
				</Link>
			</CardContent>
		</Card>
	);
};

export default ProjectCard;
