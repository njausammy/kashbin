import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from './types';

const Icon: React.FC<IconProps> = ({ fill = "#414141", width = 34, height = 34, }) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 41 40"
            fill="none"
        >
            <Path
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.433 15A6.667 6.667 0 0115.1 8.333h10A6.667 6.667 0 0131.767 15v10a6.667 6.667 0 01-6.667 6.666h-10A6.667 6.667 0 018.433 25V15z"
                clipRule="evenodd"
            />
            <Path
            strokeWidth={1}
                fill={fill}
                d="M17.183 13.334a1.25 1.25 0 00-2.5 0h2.5zm-2.5 2.5a1.25 1.25 0 002.5 0h-2.5zm2.5 0a1.25 1.25 0 00-2.5 0h2.5zm-2.5 2.5a1.25 1.25 0 002.5 0h-2.5zm1.25-1.25a1.25 1.25 0 000-2.5v2.5zm-2.5-2.5a1.25 1.25 0 100 2.5v-2.5zm2.5 0a1.25 1.25 0 100 2.5v-2.5zm2.5 2.5a1.25 1.25 0 000-2.5v2.5zm3.334 8.333a1.25 1.25 0 000 2.5v-2.5zm5 2.5a1.25 1.25 0 000-2.5v2.5zm3.93-16.746a1.25 1.25 0 10-1.767-1.768l1.767 1.768zM9.503 28.83a1.25 1.25 0 101.768 1.768L9.503 28.83zm5.18-15.496v2.5h2.5v-2.5h-2.5zm0 2.5v2.5h2.5v-2.5h-2.5zm1.25-1.25h-2.5v2.5h2.5v-2.5zm0 2.5h2.5v-2.5h-2.5v2.5zm5.834 10.833h5v-2.5h-5v2.5zM28.93 9.403L9.503 28.83l1.768 1.768L30.697 11.17 28.93 9.403z"
            />
        </Svg>
    );
};

export default Icon;
