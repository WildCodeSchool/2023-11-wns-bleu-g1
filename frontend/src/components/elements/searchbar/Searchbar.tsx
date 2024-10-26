import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
	setSearchbar: React.Dispatch<React.SetStateAction<string>>;
	setSelectOption: React.Dispatch<React.SetStateAction<string>>;
	sendSearch: (value: string) => void;
	searchbar: string;
}

const Searchbar = ({
	setSearchbar,
	setSelectOption,
	sendSearch,
	searchbar,
}: Props) => {
	return (
		<div className="flex justify-evenly items-center gap-8">
			<Input
				className="bg-white h-[30px] w-[300px] rounded-xl text-black"
				value={searchbar}
				onChange={(e) => setSearchbar(e.currentTarget.value)}
				onKeyDown={(e) => {
					e.key === "Enter" && sendSearch(searchbar);
					e.key === "Escape" && sendSearch("");
				}}
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
	);
};

export default Searchbar;
