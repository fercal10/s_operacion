import React from 'react'

type Props = {
    handlerChagen: (e: React.ChangeEvent<HTMLInputElement>) => void,
    valor?: string | number,
    name: string,
    type?: string,
    placeholder?: string,
    title: string

}

const InputC = ({ title, name, handlerChagen, valor, type = "text", placeholder }: Props) => {
    return (
        <div className=" w-full pt-2  " >
            <div className="flex justify-between mb-2">
                <label htmlFor={name} className="text-base font-semibold  text-clip text-start text-neutral-800 ">
                    {title}
                </label>
            </div>
            <input
                autoComplete="false"
                value={valor}
                type={type}
                name={name}
                onChange={(e) => handlerChagen(e)}
                placeholder={placeholder}
                className="block w-full px-4 py-2 mt-2 h-12 bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md focus:border-emerald-300 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-30"
            />
        </div>
    )
}

export default InputC