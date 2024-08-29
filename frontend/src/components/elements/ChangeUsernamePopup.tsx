import {
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {GetUserProfileDocument, useGetUserProfileQuery, useUpdateUsernameMutation} from "@/graphql/generated/schema";
import {BadgeCheck} from "lucide-react";
import {ApolloError} from "@apollo/client";
import {useToast} from "@/components/ui/use-toast";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import { z } from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";

export function ChangeUsernamePopup() {
    const getUserProfileQuery = useGetUserProfileQuery();
    const { toast } = useToast();
    const defaultErrorMessage =
		"Une erreur est survenue lors de la suppression. Veuillez réessayer.";
    const [errorMessage, setErrorMessage] = useState<string>(defaultErrorMessage);

	const profile = getUserProfileQuery?.data?.getUserProfile || null;

    const formSchema = z.object({
        newUsername: z.string().min(2, {
            message: "Le nom d'utilisateur doit contenir au moins 2 caractères.",
        }),
        })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });


    const [changeUsernameMutation, changeUsernameResult] = useUpdateUsernameMutation({
        onCompleted: () => {
            toast({
                icon: <BadgeCheck className="h-5 w-5" />,
                title: "Nom d'utilisateur changé",
                className: "text-success",
            });
            console.log(changeUsernameResult)
        },
        refetchQueries: [GetUserProfileDocument],
        onError: (err: ApolloError) => {
            console.error(err);
            if (err.message.includes("not registered")) {
                setErrorMessage("Aucun compte n'est lié à cette adresse id.");
                return;
            }
            if (err.message.includes("invalid password")) {
                setErrorMessage("Les identifiants sont incorrects.");
                return;
            }
            setErrorMessage(defaultErrorMessage);
            toast({
                title: errorMessage,
                className: "text-error",
            })
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const { newUsername } = data;
        console.log("button clicked");
        console.log("profile: ", profile);
        console.log("profile.id: ", profile.id);
        console.log("newUsername: ", newUsername);
        if (!profile) return;
        await changeUsernameMutation({
            variables: {
                datas: {
                    id: profile.id,
                    newUsername: newUsername,
                }
            },
        });
    }


    return (
        <>
            <AlertDialogHeader>
                <AlertDialogTitle>Changer le nom d'utilisateur</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
                <p>
                    Voulez-vous vraiment changer votre nom d'utilisateur ?
                </p>
            </AlertDialogDescription>
            <AlertDialogFooter>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField name="newUsername" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="" placeholder="Nouveau nom d'utilisateur" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                       />
                        <AlertDialogAction type="submit">Valider</AlertDialogAction>
                    </form>
                </Form>
            </AlertDialogFooter>
        </>
    )
}
