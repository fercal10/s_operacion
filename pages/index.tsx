import Layout from "@components/Layout";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const initForm = {
  user: "",
  password: ""
}
const Login: NextPage = () => {
  const { push } = useRouter();
  const [form, setform] = useState(initForm);
  return (
    < div className="w-screen h-screen flex content-center bg-blue-200">



      <div className="bg-neutral-50 m-auto  w-full h-full sm:h-3/4 sm:w-2/3 xl:w-2/5  sm:max-h-min p-8 pt-16 sm:rounded-lg sm:border-2 shadow-xl sm:border-blue-800">
        <div className="flex-1 relative">
          <div className="text-center  ">

            <Image alt="Logo" src='/favicon.ico' height={50} width={100} />
            <h2 className="text-4xl font-bold text-center m-5 text-gray-700 ">
              Inicio de Sesion
            </h2>


          </div>

          <div className="mt-8">
            <div>
              <div>
                <label
                  htmlFor="user"
                  className="block mb-2 text-xl text-gray-600 "
                >
                  Usuario
                </label>
                <input
                  value={form.user}
                  type="user"
                  name="user"
                  onChange={(e) => setform({ ...form, user: e.target.value })}
                  placeholder="Oscar"
                  className="block w-full px-4 py-2 mt-2 h-12 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-xl text-gray-600 ">
                    Contraseña
                  </label>
                </div>

                <input
                  value={form.password}
                  type="password"
                  name="password"
                  onChange={(e) => setform({ ...form, password: e.target.value })}
                  placeholder="dr123456"
                  className="block w-full px-4 py-2 mt-2 h-12 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mt-6">
                <button
                  onClick={async () => {
                    await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
                      .then(() => push('/app/pacientes'))


                  }}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Inicio de Seccion
                </button>
              </div>
            </div>


          </div>
          {/* <Alert ver={showNotification} title={"Error "} mensage={mensage} /> */}
        </div>
      </div>
    </div>
  )
}


export default Login;