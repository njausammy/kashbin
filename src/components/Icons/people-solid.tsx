import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
import { IconProps } from "./types";
const SVGComponent = (props: IconProps) => (
  <Svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    {...props}
  >
    <Rect width={40} height={40} rx={20} fill="#FFF9C4" />
    <Path
      d="M10.087 32V24.6957L8 23.6522V16.3478L14.2609 12.1739V9.56522L12.1739 8L10.087 9.56522V12.1739L16.3478 16.3478V23.6522L14.2609 24.6957V32"
      stroke="black"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.5652 20.5217V18.4347L27.8261 14.2608V11.6521L25.7391 10.0869L23.6521 11.6521V14.2608L29.913 18.4347V20.5217"
      stroke="black"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M32 20.522H16.3478"
      stroke="black"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
