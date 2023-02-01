import React from 'react'


const Londing = () => {
    return (
        <div className='bg-slate-50  w-full h-screen flex justify-center items-center content-center'>

            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="m-auto  block [shape - rendering: auto]" width="237px" height="237px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" r="36" strokeWidth="8" stroke="#1d3f72" strokeDasharray="56.548667764616276 56.548667764616276" fill="none" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" dur="2s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                </circle>
                <circle cx="50" cy="50" r="27" strokeWidth="8" stroke="#5699d2" strokeDasharray="42.411500823462205 42.411500823462205" strokeDashoffset="42.411500823462205" fill="none" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" dur="2s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
                </circle>
            </svg>
        </div>
    )
}

export default Londing