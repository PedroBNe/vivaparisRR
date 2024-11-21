import React from 'react';

const Menu = ({ width = 30, height = 30, stroke = "#ffffff", strokeWidth = 2, ...props }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M4 6H20M4 12H20M4 18H20"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default Menu;
