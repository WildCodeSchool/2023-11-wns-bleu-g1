import { Separator } from "@/components/ui/separator";
import { useGetLanguagesQuery } from "@/graphql/generated/schema";
import React from "react";
import LanguageUpdate from "@/components/elements/admin/LanguageUpdate";
import LanguageDelete from "@/components/elements/admin/LanguageDelete";
import LanguageCreate from "@/components/elements/admin/LanguageCreate";

const AdminLanguages = () => {
	const { data } = useGetLanguagesQuery();
	const languages = data?.getLanguages || [];

	return (
		<>
			<h1 className="flex w-full justify-center text-2xl font-bold">
				Administration des languages
			</h1>
			<div className="pt-2 w-full flex justify-center mt-5">
				<div
					className="flex flex-col justify-center w-1/3 border border-white rounded-xl px-3 pb-4 pt-2"
					id="languagesListSection"
				>
					<h2>Liste des languages:</h2>
					<Separator />
					<div className="pt-4">
						{languages.map((lang) => (
							<div key={lang.id} className="flex justify-between py-1">
								<p className="flex w-full items-center text-center">
									{lang.name}
								</p>
								<div className="flex gap-2">
									<LanguageUpdate id={lang.id} name={lang.name} />
									<LanguageDelete id={lang.id} />
								</div>
							</div>
						))}
					</div>
					<Separator />
					<LanguageCreate />
				</div>
			</div>
		</>
	);
};

export default AdminLanguages;
