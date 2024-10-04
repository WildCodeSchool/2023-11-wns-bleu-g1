import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
	GetProjectByIdDocument,
	useUpdateCommentMutation,
} from "@/graphql/generated/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { BadgeCheck, Check, CircleAlert, X } from "lucide-react";
import { ApolloError } from "@apollo/client";

interface Props {
	projectId: string;
	comment: {
		id: string;
		content: string;
	};
	setEditMode: Dispatch<boolean>;
}

const formSchema = z.object({
	content: z.string(),
});

export const EditCommentForm = ({ projectId, comment, setEditMode }: Props) => {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: comment.content,
		},
	});

	const [updateCommentMutation, updateCommentMutationResult] =
		useUpdateCommentMutation({
			onCompleted: () => {
				toast({
					icon: <BadgeCheck className="h-5 w-5" />,
					title: "Votre commentaire a bien été ajouté !",
					className: "text-success",
				});
				setEditMode(false);
				form.reset();
			},
			refetchQueries: [
				{
					query: GetProjectByIdDocument,
					variables: {
						getProjectId: projectId,
					},
				},
			],
			onError: (err: ApolloError) => {
				console.error(err);
				toast({
					icon: <CircleAlert className="h-5 w-5" />,
					title: "Une erreur est survenue lors de l'ajout du commentaire !",
					className: "text-error",
				});
			},
		});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		updateCommentMutation({
			variables: {
				newContent: values.content,
				commentId: comment.id,
			},
		});
	};

	return (
		<div>
			<Form {...form}>
				<form
					className="sm:flex sm:items-center sm:gap-3 mt-3"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="content"
						disabled={updateCommentMutationResult.loading}
						render={({ field }) => (
							<FormItem className="grow">
								<FormControl>
									<Textarea
										placeholder="Ajouter votre commentaire..."
										className="w-full h-fit m-0 md:mt-0"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex items-center gap-2">
						<Button
							type="submit"
							isLoading={updateCommentMutationResult.loading}
							disabled={updateCommentMutationResult.loading}
							size={"sm"}
						>
							<Check />
						</Button>
						<Button
							type="button"
							variant={"outline"}
							isLoading={updateCommentMutationResult.loading}
							disabled={updateCommentMutationResult.loading}
							onClick={() => setEditMode(false)}
							size={"sm"}
						>
							<X />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
