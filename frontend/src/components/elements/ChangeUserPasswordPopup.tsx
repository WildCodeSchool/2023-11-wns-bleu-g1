import {
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {useGetUserProfileQuery, useUpdateUserPasswordMutation} from "@/graphql/generated/schema";
import {BadgeCheck} from "lucide-react";
import {ApolloError} from "@apollo/client";
import {useToast} from "@/components/ui/use-toast";
import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, buttonVariants} from "@/components/ui/button";
import {CardContent, CardFooter} from "@/components/ui/card";

export function ChangeUserPasswordPopup() {
  const getUserProfileQuery = useGetUserProfileQuery();
  const { toast } = useToast();
  const defaultErrorMessage =
      "Une erreur est survenue lors de la suppression. Veuillez réessayer.";
  const [errorMessage, setErrorMessage] = useState<string>(defaultErrorMessage);

  const profile = getUserProfileQuery?.data?.getUserProfile || null;

  const formSchema = z.object({
    oldPassword: z.string( {
        message: "L'ancien mot de passe ne peut pas etre vide.",
    }),
    newPassword: z.string().min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères.",
    }),
    newPasswordVerification: z.string({
      message: 'Veuillez confirmer le mot de passe'
    })
  })
  .refine((data) => data.newPassword === data.newPasswordVerification, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['newPasswordVerification']
  })

  const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      mode: "onSubmit",
    });

  const [changeUserPasswordMutation, changeUserPasswordResult] = useUpdateUserPasswordMutation({
    onCompleted: () => {
      toast({
        icon: <BadgeCheck className="h-5 w-5" />,
        title: "Mot de passe changé",
        className: "text-success",
      });
      console.log(changeUserPasswordResult)
    },
    onError: (err: ApolloError) => {
        console.error(err);
        if (err.message.includes("not register")) {
            setErrorMessage("Aucun n'est lié à cette adresse email.");
            return;
        }
        if (err.message.includes("invalid password")) {
            setErrorMessage("Les identifiants sont incorrects.");
            return;
        }
        setErrorMessage(defaultErrorMessage);
        toast({
            title: errorMessage,
        })
    }
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { oldPassword, newPassword } = data;
    if (!profile) return;

    const errors = await form.trigger();

    if (Object.keys(errors).length > 0) {
        return;
    }

    await changeUserPasswordMutation({
        variables: {
          datas: {
            id: profile.id,
            oldPassword: oldPassword,
            newPassword: newPassword,
          }
        },
    })
  }

  return (
        <>
                <AlertDialogHeader>
                <AlertDialogTitle>Changer le nom mot de passe</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
                <p>
                    Voulez-vous vraiment changer votre mot de passe ?
                </p>
            </AlertDialogDescription>
            <AlertDialogFooter>

                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                       <CardContent>
                            <FormField control={form.control} name="oldPassword" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" className="bg-secondary" placeholder="Ancien mot de passe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                       />
                      <FormField control={form.control} name="newPassword" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" className="bg-secondary" placeholder="Nouveau mot de passe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                       />
                        <FormField control={form.control} name="newPasswordVerification" render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" className="bg-secondary" placeholder="Entrer de nouveau votre mot de passe" {...field} />
                                </FormControl>
                                    {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                            </FormItem>
                        )}
                       />
                       </CardContent>
                        <CardFooter className="">
                            <div className="flex justify-end space-x-4">
                                <Button
                                    type="submit"
                                    isLoading={changeUserPasswordResult.loading}
                                    disabled={!!changeUserPasswordResult.data}
                                >
                                    Valider
                                </Button>
                                <AlertDialogAction className={buttonVariants({ variant: "secondary2"})} type="reset">Annuler</AlertDialogAction>
                            </div>
                        </CardFooter>
                    </form>
                </Form>
            </AlertDialogFooter>
        </>
    )
}
