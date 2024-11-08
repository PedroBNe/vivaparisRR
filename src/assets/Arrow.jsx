import React from 'react';

const Arrow = ({ stroke = "#ffffff", width = 45, height = 45, rotate = 0}) => (
    <svg
        style={{ transform: `rotate(${rotate}deg)` }}        
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
    >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M6 12H18M18 12L13 7M18 12L13 17"
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
    </svg>
);

export default Arrow;
