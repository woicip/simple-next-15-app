import { ReactNode } from "react"
import { User } from "./_user-model"
import classNames from "classnames"
import { HomeIcon, PhoneIcon } from "lucide-react"
import localFont from "next/font/local";
import Link from "next/link";

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

function MonoText(props: { children?: ReactNode, className?: string }){
  const className = classNames(`py-[3px] px-[8px] font-mono rounded-[8px] bg-white/20 text-white ${props.className || ""}`)
  return <span className={className}>{props.children}</span>
}

export default async function Users(){
  const users = await fetch("https://jsonplaceholder.typicode.com/users")
  const data = await users.json() as User[]

  return (
    <div className={`w-full h-full flex items-center justify-center ${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="w-[600px] px-[15px] flex flex-col gap-[20px]">
        <div className="w-[570px] py-[10px] px-[20px] bg-[#0b1526] text-blue-400 font-semibold rounded-b-[20px] fixed top-0 flex items-center gap-[10px]">
          <Link href="/" className="text-[14px] hover:underline"><HomeIcon size={20} /></Link>
          <p className="text-[14px] text-center whitespace-nowrap">Server Components</p>
        </div>
        
        <div className="mt-[10px] py-[50px] flex flex-col gap-[15px]">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl">Users</h1>

            <div className="flex items-center gap-[10px]">
              <span className="text-[14px] font-semibold text-white/60">Total</span>
              <span className="text-[14px] font-semibold text-white/60">{data.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[10px]">
            {
              data.map((item, i) => (
                <div key={i} className="p-[20px] border border-white/10 rounded-[20px]">
                  <div className="mb-[20px] flex flex-col items-start justify-between">
                    <h1 className="font-semibold text-xl">{item.name}</h1>
                    <MonoText className="cursor-pointer text-[12px] flex items-center gap-[10px] bg-transparent border border-white/10 hover:bg-white hover:text-black transition-all"><PhoneIcon className="w-[15px] h-[15px]" /> {item.phone}</MonoText>
                  </div>

                  <div className="mt-[20px] grid grid-cols-2 gap-[10px]">
                    <p className="text-[13px] break-words"><MonoText>@{item.username}</MonoText></p>
                    <p className="text-[14px] break-words">{item.email}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}