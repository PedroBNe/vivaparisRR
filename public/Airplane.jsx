import React from 'react';

const TowerIcon = ({ stroke = "#000000", width = 80, height = 80 }) => (
    <svg
        version="1.1"
        id="Icons"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 32 32"
        fill="none"
        width={width}
        height={height}
    >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                className="st0"
                d="M30,21v-4l-11-6.1V4c0-1.7-1.3-3-3-3h0c-1.7,0-3,1.3-3,3v6.9L2,17v4l11-3.1V25l-3,2v4l6-2l6,2v-4l-3-2v-7.1 L30,21z"
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
            />
        </g>
    </svg>
);

export default TowerIcon;
