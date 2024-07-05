import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
import { IconProps } from "./types";

const SVGComponent = (props:IconProps) => (
  <Svg
    width={41}
    height={40}
    viewBox="0 0 41 40"
    fill="none"
    {...props}
  >
    <Rect x={0.5} width={40} height={40} rx={20} fill="#E8F5E9" />
    <Path
      d="M20.4999 10.25L23.4249 16.175L29.9649 17.125L25.2349 21.74L26.3499 28.255L20.4999 25.18L14.6499 28.255L15.7699 21.74L11.0349 17.125L17.5749 16.175L20.4999 10.25Z"
      stroke="black"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.4999 29.7501L23.4249 23.8251L29.9649 22.8751L25.2349 18.2601L26.3499 11.7451L20.4999 14.8201L14.6499 11.7451L15.7699 18.2601L11.0349 22.8751L17.5749 23.8251L20.4999 29.7501Z"
      stroke="black"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.4551 19.0552H22.5451"
      stroke="black"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.4551 21.3452H22.5451"
      stroke="black"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
