import { TPaciente } from '@lib/constants';
import axios from 'axios';
import Link from 'next/link';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>,
    id: string
}


const SubirFile = ({ setOpen, id }: Props) => {

    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();

    const handleUpload = async () => {
        setUploading(true);
        try {
            if (!selectedFile) return;
            const formData = new FormData();
            formData.append("myImage", selectedFile);
            formData.append("id", id);
            const {data:datos } = await axios.post("/api/archive", formData);
            console.log(datos);
            // const {data } = await axios.put("/api/paciente", formData);

        } catch (error: any) {
            console.log(error.response?.data);
        }
        setUploading(false);
        setSelectedFile(undefined)
        setSelectedImage('');
        setOpen(false);

    };
    return (
        <div className="max-w-4xl mx-auto p-20 space-y-6">
            {selectedImage ? (
                <span>{selectedFile?.name}</span>
            ) : (
                <span></span>
            )}
            <label>
                <input
                    type="file"
                    hidden
                    onChange={({ target }) => {
                        if (target.files) {
                            const file = target.files[0];
                            setSelectedImage(URL.createObjectURL(file));
                            setSelectedFile(file);
                        }
                    }}
                />
                <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                    {selectedImage ? (
                        <img src={selectedImage} alt="" />
                    ) : (
                        <span>Agregar Archivo</span>
                    )}
                </div>
            </label>
            <button
                onClick={handleUpload}
                disabled={uploading}
                style={{ opacity: uploading ? ".5" : "1" }}
                className="bg-red-600 p-3 w-32 text-center rounded text-white"
            >
                {uploading ? "Uploading.." : "Upload"}
            </button>
            <button onClick={() => setOpen(false)} className='bg-black p-3 m-5 w-32 text-center rounded text-white'>
                Cerrar
            </button>
            {/* <div className="mt-20 flex flex-col space-y-3">
                {dirs.map((item) => (
                    <Link key={item} href={"/images/" + item}>
                        <a className="text-blue-500 hover:underline">{item}</a>
                    </Link>
                ))}
            </div> */}
        </div>
    )
}

export default SubirFile