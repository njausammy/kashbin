import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { IconProps } from './types';

const ReceiveIcon: React.FC<IconProps> = ({ fill = "#414141", width = 24, height = 24 }) => {
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
                d="M12 3a1 1 0 011 1v12.586l3.293-3.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L11 16.586V4a1 1 0 011-1zM5 20a1 1 0 100 2h14a1 1 0 100-2H5z"
                clipRule="evenodd"
            />
        </Svg>
    );
};

export default ReceiveIcon;
