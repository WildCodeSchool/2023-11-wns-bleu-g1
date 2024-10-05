import { Separator } from "@/components/ui/separator";
import ElementDelete from "@/components/elements/admin/ElementDelete";
import React from "react";
import { useGetCommentsQuery } from "@/graphql/generated/schema";

const AdminComments = () => {
	const { data } = useGetCommentsQuery();
	const comments = data?.getComments || [];
	console.log(comments);

	return (
		<>
			<h1 className="flex w-full justify-center text-2xl font-bold">
				Administration des commentaires
			</h1>
			<div className="pt-2 w-full flex justify-center mt-5">
				<div
					className="flex flex-col justify-center w-1/3 border border-white rounded-xl px-3 pb-4 pt-2"
					id="languagesListSection"
				>
					<h2>Liste des commentaires:</h2>
					<Separator />
					{comments.map((comment) => (
						<div key={comment.id} className="flex justify-between py-1">
							<p className="flex w-full items-center text-center">
								{comment.content}
							</p>
							<div className="flex gap-2">
								<ElementDelete id={comment.id} elementType="comment" />
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default AdminComments;
