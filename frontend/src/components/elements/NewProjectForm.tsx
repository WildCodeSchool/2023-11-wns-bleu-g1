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
import {useGetLanguagesQuery} from "@/graphql/generated/schema";



const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Le nom du projet doit contenir au moins 2 caractères.",
  }),
    projectLanguage: z.string().min(2, {
        message: "Le langage du projet doit être spécifié.",
    }),
    isPublic: z.boolean(),
})

export default function NewProjectForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectLanguage: "",
      isPublic: false
    },
  })

  const getLanguagesQuery = useGetLanguagesQuery();

  const languages = getLanguagesQuery.data?.getLanguages || [];

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="projectName"
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
              name="projectLanguage"
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

