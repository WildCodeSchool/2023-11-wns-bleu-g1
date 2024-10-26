import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface Props {
	selectOption: string;
	withUserProject: boolean;
	setSelectOption: React.Dispatch<React.SetStateAction<string>>;
	setWithUserProject: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterCommunityProjects = ({
	selectOption,
	withUserProject,
	setSelectOption,
	setWithUserProject,
}: Props) => {
	return (
		<>
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
		</>
	);
};

export default FilterCommunityProjects;
