import React from 'react';

const Insta = ({ fill = "#ffffff", width = 20, height = 20, className = "" }) => (
    <svg
        fill={fill}
        width={width}
        height={height}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path fill="none" d="M0,0h48v48H0V0z"></path>
            <path d="M36,4H12c-4.4,0-8,3.6-8,8v24c0,4.4,3.6,8,8,8h24c4.4,0,8-3.6,8-8V12C44,7.6,40.4,4,36,4z M24,34c-5.5,0-10-4.5-10-10 s4.5-10,10-10s10,4.5,10,10S29.5,34,24,34z M35,15c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C37,14.1,36.1,15,35,15z"></path>
        </g>
    </svg>
);

export default Insta;
