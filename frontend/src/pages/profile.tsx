import { useCallback, useState } from "react";

import AuthLayout from "@/components/elements/auth/auth-layout";
import PageLoader from "@/components/elements/common/page-loader";
import ProjectsContainer from "@/components/elements/project/ProjectsContainer";
import UserHeadCard from "@/components/elements/user/user-head-card";
import { useGetUserProfileQuery } from "@/graphql/generated/schema";
import { Separator } from "@/components/ui/separator";
import AccountSettings from "@/components/elements/user/AccountSettings";
import Searchbar from "@/components/elements/searchbar/Searchbar";

const ProfilPage = () => {
	const [searchbar, setSearchbar] = useState("");
	const [selectOption, setSelectOption] = useState("project");
	const [searchProject, setSearchProject] = useState("");

	const sendSearch = useCallback(
		(value: string) => {
			switch (selectOption) {
				case "project":
					setSearchProject(value);
					break;

				default:
					setSearchProject("");
					setSelectOption("project");
					break;
			}
		},
		[selectOption]
	);

	const getUserProfileQuery = useGetUserProfileQuery();

	if (getUserProfileQuery.loading) return <PageLoader />;

	if (getUserProfileQuery.error) console.error(getUserProfileQuery.error);

	const profile = getUserProfileQuery?.data?.getUserProfile || null;

	return (
		<AuthLayout>
			<div className="py-8 space-y-8">
				<UserHeadCard profile={profile} />
				<h3 className="text-2xl font-semibold">Mes Projets</h3>
			</div>

			<Searchbar
				setSearchbar={setSearchbar}
				setSelectOption={setSelectOption}
				sendSearch={sendSearch}
				searchbar={searchbar}
			/>

			<Separator className="my-6" />

			<ProjectsContainer searchProject={searchProject} />

			<Separator className="my-6" />

			<AccountSettings />
		</AuthLayout>
	);
};

export default ProfilPage;
