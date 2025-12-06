import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { IconProps } from './types';

const WalletIcon: React.FC<IconProps> = ({ fill = "#414141", width = 24, height = 24 }) => {
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
                d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm15 6h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a2 2 0 110-4zm0 2a.5.5 0 100-1 .5.5 0 000 1z"
                clipRule="evenodd"
            />
        </Svg>
    );
};

export default WalletIcon;
