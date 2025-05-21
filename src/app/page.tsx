"use client"
import TextCard from "@/components/Cards/TextCard";
import convertor from "@/lib/converter";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { IoImage } from "react-icons/io5";

export default function Home() {
    const imgInputRef: any = useRef(null);
    const [processing, setProcessing] = useState<boolean>(false);
    const [texts, setTexts] = useState<Array<string>>([]);
    const openBrowse = ()=>{
        // if(imgInputRef.current){
            imgInputRef.current?.click();
        // }
    }
    const convert = async (url: string)=>{
        if(url){

            setProcessing(true);
            await convertor(url).then((txt)=>{
                const copyTexts = texts;
                copyTexts.push(txt);
                setTexts(copyTexts);
            });
            setProcessing(false);

        }
    }
    return (

    <div>
        <div className='text-white'>
            <h1 className="px-5 pt-10 text-center md:text-6xl text-3xl font-[800] ">Built With <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Tesseract Js</span>
            </h1>
            <input type="file" ref={imgInputRef} required hidden onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                if(e.target.files){
                    const url : string = URL.createObjectURL(e.target.files?.[0]!);
                    convert(url);
                }
            }} />
            <div className="w-full md:p-20 p-5 flex items-center justify-center" >
                <div className="w-full p-5 bg-[#2c2c2c] min-h-[50vh] cursor-pointer rounded-xl flex items-center justify-center" onClick={openBrowse}
                onDrop={(e:any)=>{
                    e.preventDefault();
                     const url : string = URL.createObjectURL(e.dataTransfer.files?.[0]!);
                    convert(url);
                    // console.log(url);
                }}
                onDragOver={(e:any)=>{
                    e.preventDefault();
                }}
                >
                    <div className="flex items-center justify-center flex-col">
                        <p className="text-center text-4xl font-[700] text-[#707070]">{processing?"Processing image ..."
                        :"Browse Or Drop Your Image Here"}</p>
                        <span className="text-[150px] text-[#707070]"><IoImage className={processing?"animate-pulse":" "} /></span>
                    </div>
                </div>
            </div>

        </div>
        <div className="my-10 md:px-20 px-5 space-y-10">
            {
            texts?.map((t,i)=>{
                return <TextCard key={i} i={i} t={t} />
            })
}
        </div>
    </div>
  );
}
