import React from 'react'

const TextCard = ({t,i}:{t:string, i:number}) => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }
  return (
    <div className="text-white">
                <div className="flex w-full  items-center justify-between mb-5 px-5">
                    <p className="text-xl font-[600]">{`(${i+1}) `}{new Date().toUTCString()}</p>
                    <button className="bg-white text-black text-sm md:text-base px-5 py-2 rounded-md transition-all hover:bg-[#b1b1b1] " onClick={()=>{
                    copyToClipboard(t)
                    }}>Copy</button>
                </div>
                <textarea className=" p-5 w-full min-h-[30vh] bg-[#2c2c2c] rounded-xl outline-none   " defaultValue={t} ></textarea>
            </div>
  )
}

export default TextCard
