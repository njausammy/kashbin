import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IconProps } from "./types"

function SvgComponent(props: IconProps) {
  return (
    <Svg
      width={41}
      height={51}
      viewBox="0 0 41 51"
      fill="none"
      {...props}
    >
      <Path
        d="M13.42 23l5 5 10-10m10 3c0 9.941-8.75 18-17.5 27-8.75-9-17.5-17.059-17.5-27 0-9.941 7.835-18 17.5-18 9.664 0 17.5 8.059 17.5 18z"
        stroke="#000"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent