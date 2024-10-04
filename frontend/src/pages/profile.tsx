import { useCallback, useState } from "react";

import AuthLayout from "@/components/elements/auth/auth-layout";
import PageLoader from "@/components/elements/common/page-loader";
import ProjectsContainer from "@/components/elements/project/ProjectsContainer";
import UserHeadCard from "@/components/elements/user/user-head-card";
import { Button } from "@/components/ui/button";
import { useGetUserProfileQuery } from "@/graphql/generated/schema";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import AccountSettings from "@/components/elements/user/AccountSettings";

const ProfilPage = () => {
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
						variant={"dark"}
						onClick={() => {
							sendSearch("");
							setSelectOption("project");
						}}
					>
						Reset
					</Button>
				</div>
			</div>

			<Separator className="my-6" />

			<ProjectsContainer searchProject={searchProject} />

			<Separator className="my-6" />

			<AccountSettings />
		</AuthLayout>
	);
};

export default ProfilPage;
