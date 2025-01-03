import React from 'react';

const Faders = ({ fill = "#000000", width = 80, height = 80 }) => (
    <svg
        fill={fill}
        viewBox="0 0 256 256"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M140.001,123.99988v92a12,12,0,0,1-24,0v-92a12,12,0,1,1,24,0Zm59.999,68a12.00017,12.00017,0,0,0-11.999,12.00049l.001,12a12,12,0,1,0,24-.001l-.001-12A12.00008,12.00008,0,0,0,200,191.99988Zm24.001-40h-12l.001-112a12,12,0,1,0-24,0l-.001,112h-12a12,12,0,0,0,0,24h48a12,12,0,0,0,0-24Zm-168,8h0a12.00059,12.00059,0,0,0-12,12l-.00049,44a11.99987,11.99987,0,0,0,11.99951,12h.00049a12.0006,12.0006,0,0,0,12-12l.00049-44A12,12,0,0,0,56.001,159.99988Zm24-40h-12l-.00049-80a12,12,0,1,0-24,0l.00049,80h-12a12,12,0,0,0,0,24h48a12,12,0,1,0,0-24Zm72-48h-12v-32a12,12,0,1,0-24,0v32h-12a12,12,0,0,0,0,24h48a12,12,0,0,0,0-24Z"></path>
        </g>
    </svg>
);

export default Faders;
