import { useCallback, useState } from "react";

import AuthLayout from "@/components/elements/auth-layout";
import PageLoader from "@/components/elements/page-loader";
import ProjectsContainer from "@/components/elements/ProjectsContainer";
import UserHeadCard from "@/components/elements/user-head-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserProfileQuery } from "@/graphql/generated/schema";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ConfirmDeletePopUp } from "@/components/elements/ConfirmDeletePopUp";
import { ChangeUsernamePopup } from "@/components/elements/ChangeUsernamePopup";
import { ChangeUserPasswordPopup } from "@/components/elements/ChangeUserPasswordPopup";

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
			<div>
				<Card>
					<CardHeader>
						<CardTitle>Paramètres de compte</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col space-y-3">
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button className={buttonVariants({ variant: "dark" })}>
									Modifier mon nom de profil
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<ChangeUsernamePopup />
							</AlertDialogContent>
						</AlertDialog>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button className={buttonVariants({ variant: "dark" })}>
									Modifier mon mot de passe
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<ChangeUserPasswordPopup />
							</AlertDialogContent>
						</AlertDialog>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button className={buttonVariants({ variant: "destructive" })}>
									Supprimer mon compte
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<ConfirmDeletePopUp />
							</AlertDialogContent>
						</AlertDialog>
					</CardContent>
				</Card>
			</div>
		</AuthLayout>
	);
};

export default ProfilPage;
