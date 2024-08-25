import * as React from "react"
import Svg, { Circle } from "react-native-svg"
import { IconProps } from "./types"

function SvgComponent(props:IconProps) {
  return (
    <Svg
      width={152}
      height={152}
      viewBox="0 0 152 152"
      fill="none"
      {...props}
    >
      <Circle cx={76} cy={76} r={64} fill="#EAEBFF" />
      <Circle
        cx={76}
        cy={76}
        r={70}
        stroke="#304FFE"
        strokeOpacity={0.2}
        strokeWidth={12}
      />
    </Svg>
  )
}

export default SvgComponent
