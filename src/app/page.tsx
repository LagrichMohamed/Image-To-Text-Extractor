"use client"
import TextCard from "@/components/Cards/TextCard";
import ContactForm from "@/components/ContactForm/ContactForm";
import convertor from "@/lib/converter";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { IoImage } from "react-icons/io5";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer />
        <div className='text-white'>
            <h1 className="px-5 pt-10 text-center md:text-6xl text-3xl font-[800] ">Extract Text from Images with <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Tesseract.js</span>
            </h1>
            <p className="text-center text-gray-400 mt-4 max-w-3xl mx-auto px-5">
                Powered by Tesseract.js, an open-source OCR engine that runs entirely in your browser.
                It can recognize text in over 100 languages, with no server processing required.
                Your images stay private and are processed locally on your device.
            </p>
            <input type="file" ref={imgInputRef} required hidden onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                if(e.target.files){
                    const url : string = URL.createObjectURL(e.target.files?.[0]!);
                    convert(url);
                }
            }} />
            <div className="w-full md:p-20 p-5 flex items-center justify-center">
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
                        <p className="text-center text-4xl font-[700] text-[#707070]">
                            {processing ? "Processing your image..." : "Drop your image here or click to browse"}
                        </p>
                        <p className="text-center text-base mt-2 text-[#707070]">
                            {processing ? "This may take a few seconds..." : "Supports PNG, JPG, and JPEG formats"}
                        </p>
                        <span className="text-[150px] text-[#707070]"><IoImage className={processing ? "animate-pulse" : ""} /></span>
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
        <div className="my-20 text-white">
            <h2 className="text-center text-3xl font-bold mb-8">Get in Touch</h2>
            <ContactForm />
        </div>
    </div>
  );
}
