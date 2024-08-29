import CustomPagination from "@/components/custom-pagination";
import AuthLayout from "@/components/elements/auth-layout";
import PageLoader from "@/components/elements/page-loader";
import ProjectsContainer from "@/components/elements/ProjectsContainer";
import UserHeadCard from "@/components/elements/user-head-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	useGetMyProjectsQuery,
	useGetUserProfileQuery,
} from "@/graphql/generated/schema";
import { useCallback, useEffect, useState } from "react";

const ProfilPage = () => {
	const [page, setPage] = useState(0);

	useEffect(() => {
		console.log("re render");
	});

	// states for searchbar
	const [searchbar, setSearchbar] = useState("");
	const [selectOption, setSelectOption] = useState("project");
	const [searchProject, setSearchProject] = useState("");

	const sendSearch = useCallback(
		(value: string) => {
			switch (selectOption) {
				case "project":
					setSearchProject(value);
					setSearchbar("");
					break;

				default:
					setSearchProject("");
					setSelectOption("project");
					setSearchbar("");
			}
		},
		[selectOption]
	);

	const limit = 12;
	const offset = page * limit;

	const getUserProfileQuery = useGetUserProfileQuery();
	const getMyProjectsQuery = useGetMyProjectsQuery({
		variables: {
			limit,
			offset,
			searchProject,
		},
		notifyOnNetworkStatusChange: true,
	});

	if (getUserProfileQuery.loading || getMyProjectsQuery.loading)
		return <PageLoader />;

	if (getUserProfileQuery.error || getMyProjectsQuery.error)
		console.error(getUserProfileQuery.error || getMyProjectsQuery.error);

	const profile = getUserProfileQuery?.data?.getUserProfile || null;
	const data = getMyProjectsQuery.data?.getMyProjects;

	const projects = data?.projects || [];

	return (
		<AuthLayout>
			<div className="py-8 space-y-8">
				<UserHeadCard profile={profile} />
				<h3 className="text-2xl font-semibold">Mes Projets</h3>

				<div className="flex justify-evenly items-center gap-8">
					<Input
						className="bg-white h-[30px] w-[300px] rounded-xl text-black"
						value={searchbar}
						onChange={(e) => setSearchbar(e.currentTarget.value)}
					/>
					<div className="flex gap-5">
						<Button
							className="h-[25px]"
							onClick={() => sendSearch(searchbar)}
							disabled={!searchbar.length}
						>
							Rechercher
						</Button>

						<Button
							className="h-[25px]"
							variant={"destructive"}
							onClick={() => {
								sendSearch("");
								setSelectOption("project");
							}}
						>
							Reset
						</Button>
					</div>
				</div>

				<ProjectsContainer projects={projects} page={page} isPublic />

				<CustomPagination
					page={page}
					setPage={setPage}
					limit={limit}
					hasMore={data?.hasMore || false}
					dataLength={projects.length}
					query={getMyProjectsQuery}
				/>
			</div>
		</AuthLayout>
	);
};

export default ProfilPage;
