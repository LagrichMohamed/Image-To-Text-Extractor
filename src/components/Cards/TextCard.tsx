import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TextCard = ({t,i}:{t:string, i:number}) => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success('Text copied to clipboard!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            })
            .catch(() => {
                toast.error('Failed to copy text', {
                    position: "bottom-right",
                    autoClose: 2000,
                });
            });
    }

    return (
        <div className="text-white">
            <div className="flex w-full items-center justify-between mb-5 px-5">
                <p className="text-xl font-[600]">{`Result ${i+1}`} - {new Date().toLocaleString()}</p>
                <button className="bg-white text-black text-sm md:text-base px-5 py-2 rounded-md transition-all hover:bg-[#b1b1b1] flex items-center gap-2"
                    onClick={() => copyToClipboard(t)}>
                    <span>Copy text</span>
                </button>
            </div>
            <textarea
                className="p-5 w-full min-h-[30vh] bg-[#2c2c2c] rounded-xl outline-none resize-y"
                defaultValue={t}
                readOnly
            />
        </div>
    )
}

export default TextCard
