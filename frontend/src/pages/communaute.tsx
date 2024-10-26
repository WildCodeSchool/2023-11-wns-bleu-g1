import { useCallback, useState } from "react";

import AuthLayout from "@/components/elements/auth/auth-layout";
import { Separator } from "@/components/ui/separator";
import ProjectsContainer from "@/components/elements/project/ProjectsContainer";
import Searchbar from "@/components/elements/searchbar/Searchbar";
import FilterCommunityProjects from "@/components/elements/searchbar/filterCommunityProjects";

const CommunautePage = () => {
	const [searchbar, setSearchbar] = useState("");
	const [selectOption, setSelectOption] = useState("project");
	const [searchProject, setSearchProject] = useState("");
	const [searchUser, setSearchUser] = useState("");
	const [withUserProject, setWithUserProject] = useState(false);

	const sendSearch = useCallback(
		(value: string) => {
			switch (selectOption) {
				case "project":
					setSearchProject(value);
					setSearchUser("");
					break;
				case "pseudo":
					setSearchUser(value);
					setSearchProject("");
					break;
				default:
					setSearchProject("");
					setSearchUser("");
					setSelectOption("project");
			}
		},
		[selectOption]
	);

	return (
		<AuthLayout>
			<div className="pb-10">
				<h1 className="text-2xl font-bold tracking-tight">Communauté</h1>
				<p className="text-muted-foreground">
					Retrouves tous les projets public. Tu peux les consulter, mettre un
					j&apos;aime ou même des commentaires.
				</p>
			</div>

			<div className="flex justify-around gap-6">
				<FilterCommunityProjects
					selectOption={selectOption}
					withUserProject={withUserProject}
					setSelectOption={setSelectOption}
					setWithUserProject={setWithUserProject}
				/>

				<Searchbar
					setSearchbar={setSearchbar}
					setSelectOption={setSelectOption}
					sendSearch={sendSearch}
					searchbar={searchbar}
				/>
			</div>

			<Separator className="my-6" />

			<ProjectsContainer
				searchProject={searchProject}
				searchUser={searchUser}
				withUserProject={withUserProject}
			/>
		</AuthLayout>
	);
};

export default CommunautePage;
