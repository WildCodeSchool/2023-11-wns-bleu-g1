"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem, FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {AlertDialogCancel} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React from "react";
import {
    useCreateCodeMutation,
    useCreateProjectMutation,
    useGetLanguagesQuery,
    GetMyProjectsDocument
} from "@/graphql/generated/schema";
import {gql} from "@apollo/client";
import {useRouter} from "next/navigation";



const formSchema = z.object({
  title: z.string().min(2, {
    message: "Le nom du projet doit contenir au moins 2 caractères.",
  }),
    language: z.string().min(2, {
        message: "Le langage du projet doit être spécifié.",
    }),
    isPublic: z.boolean(),
})

export default function NewProjectForm() {

    const getLanguagesQuery = useGetLanguagesQuery();
    const languages = getLanguagesQuery.data?.getLanguages || [];
    const router = useRouter();

    // console.log("lang: ", languages);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isPublic: false
        },
    })

    const [addCode, addCodeResult] = useCreateCodeMutation({
    onCompleted: () => {
        console.log("Code created");
    },
    refetchQueries: [
        {
            query: gql`
                query getCodes {
                    getCodes {
                        id
                        isReported
                        content
                        language {
                            id
                            name
                        }
                    }
                }
            `
        },
    ],
    onError: (error) => {
        console.log("addCode error: ", error);
    }
});


    const [addProject, addProjectResult] = useCreateProjectMutation({
        onCompleted: () => {
            console.log("Project created");
        },
        refetchQueries: [
            GetMyProjectsDocument,
        ],
        onError: (error) => {
            console.log(error);
        }
    });

    if (addProjectResult.loading) return <div>Loading...</div>;
    if (addProjectResult.error) return <p>Project: Une erreur est survenue: {addProjectResult.error.message}</p>;
    if (addCodeResult.loading) return <div>Loading...</div>;
    if (addCodeResult.error) return <p>Code: Une erreur est survenue: {addCodeResult.error.message}</p>;


    async function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log("userId")
        // console.log("languageID: ", values.language)
        console.log("values: ", values)
        const languageId = values.language

        const response = await addProject({
            variables: {
                data: {
                    title: values.title,
                    isPublic: values.isPublic,
                }
            }
        })

        const projectId = response.data?.createProject.id;


        if(projectId && languageId) {
            console.log("projectId and languageId are defined")
            await addCode({
                variables: {
                    data: {
                        content: " ",
                        language: languageId,
                        project: projectId
                    }
                }
            });
            //redirect to the project page
            router.push(`/coding/${projectId}`)
        } else {
            console.log("pojectId or languageId is undefined")
        }
    }


  return (
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                  <FormItem className="space-y-4">
                    <FormControl>
                      <Input className="my-2" placeholder="Mon super projet" {...field} />
                    </FormControl>
                </FormItem>
                )}
            />
            <div className="flex justify-end">
              <FormField
              control={form.control}
              name="language"
              render={({field}) => (
                  <FormItem className="flex">
                    <FormLabel className="mr-2 content-center">Langage</FormLabel>
                    <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-[240px]">
                          <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>{lang.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => {
              return (
                <FormItem className="">
                  <FormControl>
                    <Checkbox onCheckedChange={field.onChange} className='align-middle mr-2'/>
                  </FormControl>
                  <FormLabel>Public</FormLabel>
                </FormItem>
              );
            }}
          />
            </div>
            <div className="flex justify-end space-x-2">
              <AlertDialogCancel asChild>
                <Button type="reset" variant={"secondary"}>Annuler</Button>
              </AlertDialogCancel>
              <Button type="submit">Créer</Button>
            </div>
          </form>
        </Form>
    </>
  )
}

