import { useCallback, useRef, useState } from "react";

import { useGetPublicsProjectsQuery } from "@/graphql/generated/schema";
import CustomPagination from "@/components/custom-pagination";
import AuthLayout from "@/components/elements/auth-layout";
import PageLoader from "@/components/elements/page-loader";
import ProjectsContainer from "@/components/elements/ProjectsContainer";
import { Separator } from "@/components/ui/separator";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";

const CommunautePage = () => {
	const [page, setPage] = useState(0);

	// states for searchbar
	const [searchbar, setSearchbar] = useState("");
	const [selectOption, setSelectOption] = useState("");
	const [searchProject, setSearchProject] = useState("");
	const [searchUser, setSearchUser] = useState("");

	const sendSearch = useCallback(() => {
		switch (selectOption) {
			case "project":
				setSearchUser("");
				setSearchProject(searchbar);
				setSearchbar("");
				setSelectOption("");
				break;

			case "pseudo":
				setSearchProject("");
				setSearchUser(searchbar);
				setSearchbar("");
				setSelectOption("");
				break;

			default:
				setSearchProject("");
				setSearchUser("");
				setSelectOption("");
				setSearchbar("");
		}
	}, [selectOption, searchbar]);

	const limit = 12;
	const offset = page * limit;

	const getPublicProjectsQuery = useGetPublicsProjectsQuery({
		variables: {
			limit,
			offset,
			searchUser,
			searchProject,
		},
	});

	if (getPublicProjectsQuery.loading) return <PageLoader />;

	if (getPublicProjectsQuery.error) {
		console.error(getPublicProjectsQuery.error);
		return;
	}

	const data = getPublicProjectsQuery.data?.getPublicsProjects;

	const projects = data?.projects || [];

	return (
		<AuthLayout>
			<div className="space-y-0.5">
				<div className="pb-10">
					<h1 className="text-2xl font-bold tracking-tight">Communauté</h1>
					<p className="text-muted-foreground">
						Retrouves les projets des autres utilisateurs. Tu peux les
						consulter, mettre un j&apos;aime ou même des commentaires.
					</p>
				</div>

				<div className="flex justify-around gap-6">
					<div className="flex justify-between items-center gap-8 text-[15px]">
						<p className="font-extralight">Rechercher par : </p>
						<Select
							value={selectOption}
							onValueChange={(value) => setSelectOption(value)}
						>
							<SelectTrigger className="w-[155px] h-[28px] bg-white text-black text-left text-xs">
								<SelectValue placeholder="Sujet de recherche" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup className="bg-white text-black rounded-md">
									<SelectLabel className="font-bold">Sujet</SelectLabel>
									<SelectItem value="project">Projet</SelectItem>
									<SelectItem value="pseudo">Pseudo</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="flex justify-between items-center gap-8">
						<Input
							className="bg-white h-[30px] w-[300px] rounded-xl text-black"
							value={searchbar}
							onChange={(e) => setSearchbar(e.currentTarget.value)}
						/>
						<Button className="h-[25px]" onClick={sendSearch}>
							Rechercher
						</Button>
					</div>
				</div>
			</div>

			<Separator className="my-6" />

			<ProjectsContainer projects={projects} page={page} />

			<CustomPagination
				page={page}
				setPage={setPage}
				limit={limit}
				hasMore={data?.hasMore || false}
				dataLength={projects.length}
				query={getPublicProjectsQuery}
			/>
		</AuthLayout>
	);
};

export default CommunautePage;
