'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import {
  Button,
  Form,
  Input,
  FormField,
  FormLabel,
  FormItem,  
  FormControl,
  FormDescription,
  FormMessage
} from '@byndr/ui';
import { 
    clientImportCsvFormSchema as importCsvFormSchema, ImportCsvFormSchema 
} from './import-form.schema';
import { importCsvService } from '../../utils/services';

export const ImportCsvForm = () => {
    const form = useForm<ImportCsvFormSchema>({
        resolver: zodResolver(importCsvFormSchema) 
    })

    const onsubmit = (handler: ImportCsvFormSchema) => {
        const fileData = handler.file![0]
        importCsvService({ fileData })
            .then(console.log)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="py-4">
                <h2 className="text-lg font-semibold mb-6">Import from TCG Player App</h2>
                <FormField 
                    name="file"
                    control={form.control}
                    render={() => (
                    <FormItem>
                    <FormLabel>Add File</FormLabel>
                    <FormControl>
                        <Input type="file" {...form.register('file')} />
                    </FormControl>
                    <FormDescription>Upload a CSV file from a TCG Player mobile export.</FormDescription>
                    <FormMessage className="my-6"></FormMessage>
                    </FormItem>
                )}
                />
                <Button type="submit" className="my-2">Import</Button>
            </form>
        </Form>
    )
}