import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { LANGUAGES } from "@/lib/constansCodeEditor";

interface Props {
	language: string;
	onSelectLanguage: (language: string) => void;
}

const languages = Object.entries(LANGUAGES);

const LanguageSelector = ({ language, onSelectLanguage }: Props) => {
	return (
		<Select value={language} onValueChange={(value) => onSelectLanguage(value)}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Choisir un langage" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Choisir un langage</SelectLabel>
					{languages.map(([lang, version]) => (
						<SelectItem key={lang + version} value={lang}>
							{lang} {version}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default LanguageSelector;
