import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IconProps } from "../types"

function SvgComponent(props: IconProps) {
  return (
    <Svg
      width={36}
      height={51}
      viewBox="0 0 36 51"
      fill="none"
      {...props}
    >
      <Path
        d="M13 25.917l3.077 3.333L23 21.75M11 48h14c2.8 0 4.2 0 5.27-.545a5 5 0 002.185-2.185C33 44.2 33 42.8 33 40V11c0-2.8 0-4.2-.545-5.27a5 5 0 00-2.185-2.185C29.2 3 27.8 3 25 3H11c-2.8 0-4.2 0-5.27.545A5 5 0 003.545 5.73C3 6.8 3 8.2 3 11v29c0 2.8 0 4.2.545 5.27a5 5 0 002.185 2.185C6.8 48 8.2 48 11 48z"
        stroke="#000"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
