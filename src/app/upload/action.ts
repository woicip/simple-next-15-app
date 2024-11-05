"use server"

import z from "zod"
import axios from "axios";
import { IUploadProps } from "./_upload-model";

export type TFieldErrors = { file?: string[] | null }

export async function Upload(prevState: any, formData: FormData): Promise<{ error?: TFieldErrors | null, isSuccess: boolean, data: IUploadProps[] | [] }> {
  const payload = {
    file: formData.get("file")
  }

  // Form Validation
  const MAX_FILE_SIZE = 5000000;
  const schema = z.object({
    file: z.any()
      .refine((file) => file.size <= MAX_FILE_SIZE, `File size must be less than ${MAX_FILE_SIZE / 1000000}MB`)
      .refine((file) => file.name !== "undefined", "Please at least choose a file.")
  })

  const parsed = schema.safeParse(payload)
  
  if(!parsed.success){
    return {
      error: parsed.error?.flatten().fieldErrors,
      isSuccess: false,
      data: []
    }
  }

  try {
    const body = new FormData()
    body.append("files[]", payload.file as File)

    const { data } = await axios.post("https://pomf2.lain.la/upload.php", body)
  
    return {
      error: null,
      isSuccess: true,
      data: data?.files
    }
    
  } catch (error) {
    return {
      error: null,
      isSuccess: false,
      data: []
    }
  }
}