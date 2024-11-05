"use client"

import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { Upload } from "./action";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { HomeIcon, UploadCloudIcon, UploadIcon } from "lucide-react";
import { IUploadProps } from "./_upload-model";
import type { TFieldErrors } from "./action";

// Assets
import loading from "@/assets/loading.svg"

// Local Fonts
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

function FormButtons(){
  const { pending } = useFormStatus()

  return (
    <>
      {
        pending ? (
          <button type="button" disabled={pending} className="w-[115px] py-[8px] px-[15px] justify-center flex items-center gap-[10px] text-white rounded-[15px] bg-blue-400">
            <Image src={loading} alt="loading" className="text-white" width={25} />
          </button>
        ) : (
          <button type="submit" className="py-[8px] px-[15px] w-fit flex items-center gap-[10px] bg-blue-500 text-white rounded-[15px] hover:bg-blue-400 transition-all">
            <UploadIcon />
            Upload
          </button>
        )
      }
    </>
  )
}

function ModalSuccess(props: { state: {
    error?: TFieldErrors | null;
    isSuccess: boolean;
    data: IUploadProps[] | [];
  }
}){
  const { pending } = useFormStatus()

  return (
    <>
      {
        !pending && props.state.isSuccess ? (
          <div className="mt-[20px] border border-white/10 rounded-[20px] overflow-hidden">
            <div>
              <p className="py-[6px] px-[20px] text-[14px] font-semibold bg-green-500/10 text-green-500 rounded-t-[10px]">Success Uploaded File</p>
            </div>
            
            <div className="p-[20px] flex flex-col gap-[10px]">
              <h1 className="font-semibold text-xl">{props.state.data[0]?.name as string}</h1>
              <Link href={props.state.data[0].url as string} className="font-mono text-[14px]" target="_blank">{props.state.data[0].url as string}</Link>
            </div>
          </div>
        ) : (null)
      }
    </>
  )
}

function ModalError(props: { error: any }){
  const { pending } = useFormStatus()
  
  return (
    <>
      {
        !pending && props.error ?  (
          <div className="mt-[10px]">
            <p className="p-[10px] text-[14px] font-semibold bg-red-500/10 text-red-500 rounded-[10px]">{props.error}</p>
          </div>
        ) : (null)
      }
    </>
  )
}

export default function Page(){
  const [state, action] = useActionState(Upload, { error: null, isSuccess: false, data: [] })

  return (
    <div className={`w-full h-screen flex items-center justify-center ${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="w-[570px] py-[10px] px-[20px] bg-[#0b1526] text-blue-400 font-semibold rounded-b-[20px] fixed top-0 flex items-center gap-[10px]">
        <Link href="/" className="text-[14px] hover:underline"><HomeIcon size={20} /></Link>
        <p className="text-[14px] text-center whitespace-nowrap">Server Action</p>
      </div>

      <div className="w-[600px] py-[20px] px-[15px] flex flex-col items-center justify-center">
        <div className="mb-[20px] flex items-center gap-[10px]">
          <UploadCloudIcon size={36} />
          <h1 className="font-bold text-3xl">Upload File Storage</h1>
        </div>
        
        <form action={action} className="mt-[30px] flex flex-col">
          <div className="flex items-center gap-[55px]">
            <input type="file" name="file" id="file" className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-500" />
            <FormButtons />
          </div>

          <ModalError error={state.error?.file} />
          <ModalSuccess state={state} />
        </form>
      </div>
    </div>
  )
}