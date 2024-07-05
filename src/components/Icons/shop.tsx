import React from "react";
import { Svg, Path } from "react-native-svg";

const Icon: React.FC<{ color?: string; width?: number; height?: number }> = ({
  color = "#414141",
  width = 35,
  height = 36,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 35 36"
    >
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M23.024 22v7.2c0 1.68 0 2.52-.3 3.162a2.893 2.893 0 01-1.208 1.311c-.59.327-1.364.327-2.911.327H9.03c-1.547 0-2.32 0-2.912-.327a2.893 2.893 0 01-1.207-1.311c-.3-.642-.3-1.482-.3-3.162V14m25.779 0v20M4.61 26h18.414M5.637 3.769l-3.644 7.915c-.353.767-.53 1.15-.487 1.462.037.272.176.516.383.673.238.181.633.181 1.422.181h28.378c.79 0 1.184 0 1.422-.18.207-.158.346-.402.383-.674.042-.312-.134-.695-.487-1.462L29.363 3.77c-.296-.642-.444-.963-.664-1.198a1.825 1.825 0 00-.688-.462C27.719 2 27.389 2 26.728 2H8.272c-.66 0-.991 0-1.283.11a1.825 1.825 0 00-.688.461c-.22.235-.368.556-.664 1.198z"
      />
    </Svg>
  );
};

export default Icon;
