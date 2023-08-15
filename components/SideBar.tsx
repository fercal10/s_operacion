import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function SideBar({ }) {
  const [open, setopen] = useState(false);
  const { pathname, reload } = useRouter();
  const routes = [
    { route: "/info", name: "Pacientes" },
  ]

  return (
    <div className="flex flex-col w-full h-16 sm:h-full sm:w-56 bg-gray-200 border-r  relative">

      <div className="  flex sm:flex-col items-center sm:mt-6 my-auto ml-4  py-3">
        <div className=" absolute w-0 sm:hidden " onClick={() => setopen(!open)}>
          <svg height="30" viewBox="0 0 21 21" width="30" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round"><path d="m4.5 6.5h12" /><path d="m4.498 10.5h11.997" /><path d="m4.5 14.5h11.995" /></g></svg>
        </div>
        <img className="  mx-auto  sm:p-0 w-24 h-12 sm:w-40 sm:h-20    " src="/favicon.ico" alt="Logo" />

      </div>

      <div className={`${open ? " absolute  z-10 w-full top-12" : "hidden"} sm:static sm:flex flex-col justify-between  font-extrabold  flex-1 mt-6   `}>
        <nav>
          <Link href="/app/pacientes">
            <a className={(pathname == "/app/pacientes" ? " text-green-700 bg-gray-100 " : " text-neutral-900 bg-slate-300 ") + "flex items-center rounded-2xl  text-xl mx-2 px-4 py-2 mt-3 hover:text-green-700 hover:bg-gray-100 "}>
              <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(1 2)"><path d="m7.5.5c1.65685425 0 3 1.34314575 3 3v2c0 1.65685425-1.34314575 3-3 3s-3-1.34314575-3-3v-2c0-1.65685425 1.34314575-3 3-3zm7 14v-.7281753c0-3.1864098-3.6862915-5.2718247-7-5.2718247s-7 2.0854149-7 5.2718247v.7281753c0 .5522847.44771525 1 1 1h12c.5522847 0 1-.4477153 1-1z" /><path d="m11.5199327.67783074c1.1547685.41741154 1.9800673 1.52341097 1.9800673 2.82216926v1c0 1.29707884-.8475766 2.5813505-2 3 .6742649-.91876977 1.0109204-2.0857069 1.0099664-3.50081137s-.3309652-2.52222377-.9900337-3.32135789zm4.9800673 14.82216926h1c.5522847 0 1-.4477153 1-1 0-.2427251 0-.4854502 0-.7281753 0-2.1698712-1.7094418-3.82917861-3.8465775-4.66705336 0 0 2.8465775 2.39522866 1.8465775 6.39522866z" fill="currentColor" /></g></svg>

              <span className="mx-4 font-medium">Pacientes</span>
            </a>
          </Link>
          <Link href="/app/consultas">
            <a className={(pathname == "/app/consultas" ? " text-green-700 bg-gray-100 " : " text-neutral-900 bg-slate-300 ") + "flex items-center rounded-2xl text-xl mx-2 px-4 py-2 mt-3 hover:text-green-700 hover:bg-gray-100 "}>
              <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 3)"><path d="m1.5 4.5h14v7.9976807c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2zm0-3.9777832h14c.5522847 0 1 .44771525 1 1v1.9777832c0 .55228475-.4477153 1-1 1h-14c-.55228475 0-1-.44771525-1-1v-1.9777832c0-.55228475.44771525-1 1-1z" /><path d="m6.5 7.5h4" /></g></svg>
              <span className="mx-4 font-medium">Consultas</span>
            </a>
          </Link>
          <a onClick={() => {
            fetch("/api/expire", { method: "POST" })
            reload();
          }} className=" hover:text-green-700 hover:bg-gray-100  text-neutral-900 bg-slate-300 flex items-center rounded-2xl text-xl mx-2 px-4 py-2 mt-3" >
            <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="matrix(-1 0 0 1 18 3)"><path d="m10.595 10.5 2.905-3-2.905-3" /><path d="m13.5 7.5h-9" /><path d="m10.5.5-8 .00224609c-1.1043501.00087167-1.9994384.89621131-2 2.00056153v9.99438478c.0005616 1.1043502.8956499 1.9996898 2 2.0005615l8 .0022461" /></g></svg>
            <span className="mx-4 font-medium">Salir</span>
          </a>


        </nav>
      </div>
    </div>
  );
}

export default SideBar;
