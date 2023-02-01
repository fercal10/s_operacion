import React from 'react'

type Props = {
    handlerChagen: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    valor?: string | number,
    name: string,
    type?: string,
    title: string

}

const TextAreaI = ({ title, name, handlerChagen, valor, type = "text" }: Props) => {
    return (
        <div className=" w-full  col-span-1" >
            <div className="flex justify-between mb-2">
                <label htmlFor={name} className="text-base font-semibold  text-clip text-start text-neutral-800 ">
                    {title}
                </label>
            </div>
            <textarea
                autoComplete="false"
                value={valor}
                name={name}
                onChange={(e) => handlerChagen(e)}
                className="block w-full  px-4 py-2 mt-2 h-12 bg-gray-50 text-gray-900 placeholder-gray-300 border border-gray-200 rounded-md focus:border-emerald-300 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-30"
            />
        </div>
    )
}

export default TextAreaI