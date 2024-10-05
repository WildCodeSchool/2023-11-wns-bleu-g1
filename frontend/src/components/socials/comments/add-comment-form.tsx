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
	useCommentMutation,
} from "@/graphql/generated/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { BadgeCheck, CircleAlert } from "lucide-react";
import { ApolloError } from "@apollo/client";

interface Props {
	projectId: string;
}

const formSchema = z.object({
	content: z.string(),
});

export const AddCommentForm = ({ projectId }: Props) => {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: "",
		},
	});

	const [commentMutation, commentMutationResult] = useCommentMutation({
		onCompleted: () => {
			toast({
				icon: <BadgeCheck className="h-5 w-5" />,
				title: "Votre commentaire a bien été ajouté !",
				className: "text-success",
			});
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
		commentMutation({
			variables: {
				content: values.content,
				projectId,
			},
		});
	};
	return (
		<div>
			<Form {...form}>
				<form
					className="sm:flex sm:items-center sm:gap-3"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="content"
						disabled={commentMutationResult.loading}
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
					<Button
						type="submit"
						isLoading={commentMutationResult.loading}
						disabled={commentMutationResult.loading}
						className="w-full sm:w-fit mt-2 sm:mt-0"
					>
						Commenter
					</Button>
				</form>
			</Form>
		</div>
	);
};
