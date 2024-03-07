// 'use client';
// import {
//   Button,
//   Form,
//   Input,
//   FormField,
//   FormLabel,
//   FormItem,  
//   FormControl,
//   FormDescription,
//   FormMessage
// } from '@byndr/ui';
// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import React from 'react';

export const ImportCsvForm = () => {
    return (
        <h1>Hello World</h1>
    )
}
// export const ImportCsvForm = () => {
//     const importCsvFormSchema = z.object({
//         // @ts-ignore
//         file: z.instanceof(FileList)
//             .refine((file) => file?.length == 1, 'File is required.')
//     })

//     type ImportCsvFormSchema= z.infer<typeof importCsvFormSchema>

//     const form = useForm<ImportCsvFormSchema>({
//         resolver: zodResolver(importCsvFormSchema) 
//     })

//     const onsubmit = (handler: ImportCsvFormSchema) => {
//         console.log('handler')
//         console.dir(handler)
//     }

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onsubmit)} className="py-4">
//                 <h2 className="text-lg font-semibold mb-6">Import from TCG Player App</h2>
//                 <FormField 
//                     name="file"
//                     control={form.control}
//                     render={() => (
//                     <FormItem>
//                     <FormLabel>Add File</FormLabel>
//                     <FormControl>
//                         <Input type="file" onInput={e => console.log(e.currentTarget.files)}/>
//                     </FormControl>
//                     <FormDescription>Upload a CSV file from a TCG Player mobile export.</FormDescription>
//                     <FormMessage className="my-6"></FormMessage>
//                     </FormItem>
//                 )}
//                 />
//                 <Button type="submit" className="my-2">Import</Button>
//             </form>
//         </Form>
//     )
// }