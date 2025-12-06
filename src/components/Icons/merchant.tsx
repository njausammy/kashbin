import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { IconProps } from './types';

const MerchantIcon: React.FC<IconProps> = ({ fill = "#414141", width = 24, height = 24 }) => {
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
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1v10a2 2 0 01-2 2H7a2 2 0 01-2-2V8a1 1 0 01-1-1V5zm3 3v10h10V8H7zm2 3a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z"
                clipRule="evenodd"
            />
        </Svg>
    );
};

export default MerchantIcon;
