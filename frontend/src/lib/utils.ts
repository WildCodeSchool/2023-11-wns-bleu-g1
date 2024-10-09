import { FileExtension } from "@/enums/file-extension.enum";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const elapsedTime = (date: Date) => {
	const now = new Date();
	const difference = now.getTime() - new Date(date).getTime();
	const secondes = Math.floor(difference / 1000);
	const minutes = Math.floor(secondes / 60);
	const heures = Math.floor(minutes / 60);
	const jours = Math.floor(heures / 24);
	const mois = Math.floor(jours / 30);
	const annees = Math.floor(mois / 12);

	switch (true) {
		case annees > 0:
			return `il y a ${annees} ${annees > 1 ? "ans" : "an"}`;
		case mois > 0:
			return `il y a ${mois} ${mois > 1 ? "mois" : "mois"}`;
		case jours > 0:
			return `il y a ${jours} ${jours > 1 ? "jours" : "jour"}`;
		case heures > 0:
			return `il y a ${heures} ${heures > 1 ? "heures" : "heure"}`;
		case minutes > 0:
			return `il y a ${minutes} ${minutes > 1 ? "minutes" : "minute"}`;
		default:
			return `à l'instant`;
	}
};

export const downloadCodeAsFile = ({
	code,
	language,
}: {
	code: string;
	language: string;
}) => {
	const extension =
		FileExtension[language.toLowerCase() as keyof typeof FileExtension];

	if (!extension) {
		console.error("Langage non supporté");
		return;
	}

	const blob = new Blob([code], { type: "text/plain" });

	const filename = `index.${extension}`;

	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = filename;

	document.body.appendChild(link);
	link.click();

	document.body.removeChild(link);
};
