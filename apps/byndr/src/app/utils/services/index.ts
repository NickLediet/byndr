import { cardsApiClient } from "../api-clients"

export type ImportCsvServiceParams = {
    fileData: File
}

export const importCsvService = async ({ fileData }: ImportCsvServiceParams) => {
    const formData = new FormData()
    formData.append('file', fileData)
        
    return await cardsApiClient.postForm('/import', formData)
}