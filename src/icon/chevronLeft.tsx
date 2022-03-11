import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  width: number;
  height: number;
  color: string;
};
export const ChevronLeft = ({width, height, color}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 8 14" fill="none">
      <Path
        d="M2.82798 7.00001L7.77798 11.95L6.36399 13.364L-1.58151e-05 7.00001L6.36398 0.636013L7.77798 2.05001L2.82798 7.00001Z"
        fill={color}
      />
    </Svg>
  );
};
