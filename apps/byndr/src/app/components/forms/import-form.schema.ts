import { z } from 'zod';

export const clientImportCsvFormSchema = z.object({
        // @ts-ignore
        // file: z.instanceof(FileList)
        file: z
            .unknown()
            .transform(value => {
                console.log(value)
                return value as FileList | null | undefined
            })
            .refine(
                file => {
                    console.log(`file`, file)
                    if(!file) return false

                    const fileExtension = file[0].name.split('.').pop()
                    console.log(`fileExtension`, fileExtension)
                    return fileExtension && fileExtension === 'csv'
                },
                'File is required.'
            )
    }) 
export type ImportCsvFormSchema= z.infer<typeof clientImportCsvFormSchema>
