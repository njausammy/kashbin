import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from './types';

const Icon: React.FC<IconProps> = ({ fill = "#414141", width = 30, height = 30, ...svgProps }) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 28 28"
            fill="none"
            {...svgProps}
            strokeWidth={2}

        >
            <Path
                fill={fill}
                d="M8.009 8.75a4.255 4.255 0 01-4.25-4.25A4.255 4.255 0 018.009.25a4.255 4.255 0 014.25 4.25 4.255 4.255 0 01-4.25 4.25zm0-7a2.752 2.752 0 00-2.75 2.75 2.752 2.752 0 002.75 2.75 2.752 2.752 0 002.75-2.75 2.753 2.753 0 00-2.75-2.75zm3.988 18H4.003c-2.42 0-3.753-1.325-3.753-3.731 0-2.661 1.506-5.769 5.75-5.769h4c4.244 0 5.75 3.107 5.75 5.769 0 2.406-1.333 3.731-3.753 3.731zM6 11.75c-3.943 0-4.25 3.267-4.25 4.269 0 1.564.674 2.231 2.253 2.231h7.994c1.579 0 2.253-.667 2.253-2.231 0-1.001-.307-4.269-4.25-4.269H6z"
            />
        </Svg>
    );
};

export default Icon;
