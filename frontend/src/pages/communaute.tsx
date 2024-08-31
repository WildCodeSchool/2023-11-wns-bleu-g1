import { useCallback, useState } from "react";

import AuthLayout from "@/components/elements/auth-layout";
import { Separator } from "@/components/ui/separator";
import ProjectsContainer from "@/components/elements/ProjectsContainer";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
					setSearchbar("");
					break;
				case "pseudo":
					setSearchUser(value);
					setSearchbar("");
					break;
				default:
					setSearchProject("");
					setSearchUser("");
					setSelectOption("project");
					setSearchbar("");
			}
		},
		[selectOption]
	);

	return (
		<AuthLayout>
			<div className="pb-10">
				<h1 className="text-2xl font-bold tracking-tight">Communauté</h1>
				<p className="text-muted-foreground">
					Retrouves les projets des autres utilisateurs. Tu peux les consulter,
					mettre un j&apos;aime ou même des commentaires.
				</p>
			</div>

			<div className="flex justify-around gap-6">
				<div className="flex justify-between items-center gap-3 text-[15px]">
					<p className="font-extralight">Rechercher par : </p>
					<Select
						value={selectOption}
						onValueChange={(value) => setSelectOption(value)}
					>
						<SelectTrigger className="w-[100px] h-[28px] bg-white text-black text-left text-xs">
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

				<div className="flex items-center space-x-2">
					<Switch
						id="airplane-mode"
						className="data-[state=unchecked]:bg-white"
						checked={withUserProject}
						onCheckedChange={(e) => setWithUserProject(e)}
					/>
					<Label className="font-extralight w-max" htmlFor="airplane-mode">
						Mes projets
					</Label>
				</div>

				<div className="flex justify-between items-center gap-3">
					<Input
						className="bg-white h-[30px] w-[300px] rounded-xl text-black"
						value={searchbar}
						onChange={(e) => setSearchbar(e.currentTarget.value)}
					/>
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
