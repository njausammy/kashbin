import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { IconProps } from './types';

const SendIcon: React.FC<IconProps> = ({ fill = "#414141", width = 24, height = 24 }) => {
    return (
        <Svg
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
        >
            <Path
                fill={fill}
                fillRule="evenodd"
                d="M3.803 5.06l16.949 6.36a1.25 1.25 0 010 2.32l-16.95 6.36A1.25 1.25 0 012 18.89V5.11a1.25 1.25 0 011.803-1.112zM12.5 12L4.5 8.5v7l8-3.5z"
                clipRule="evenodd"
            />
        </Svg>
    );
};

export default SendIcon;
