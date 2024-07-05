import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from './types';

const Icon: React.FC<IconProps> = ({ fill = "#414141", width = 24, height = 24, ...svgProps }) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 26"
            fill="none"
            {...svgProps}
        ><Path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M25 3.667L22.333 13H6.836m16.83 5.333h-16L5 1H1m17.333 3.333H15m0 0h-3.333m3.333 0v3.334m0-3.334V1M9 23.667a1.333 1.333 0 11-2.667 0 1.333 1.333 0 012.667 0zm14.667 0a1.333 1.333 0 11-2.667 0 1.333 1.333 0 012.667 0z"
    />
        </Svg>
    );
};

export default Icon;
