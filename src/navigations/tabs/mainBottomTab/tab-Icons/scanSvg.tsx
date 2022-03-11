import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

type IconType = {
  height: number;
  width: number;
  color?: string;
};

export const ScanIcon: React.FC<IconType> = ({
  width = 24,
  height = 42,
  color = '#838383',
  ...rest
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 42" fill="none">
      <Path
        d="M15 3H21V8H19V5H15V3ZM9 3V5H5V8H3V3H9ZM15 21V19H19V16H21V21H15ZM9 21H3V16H5V19H9V21ZM3 11H21V13H3V11Z"
        fill={color}
      />
      <Path
        d="M4.16141 39.12C3.64807 39.12 3.20141 39.0267 2.82141 38.84C2.44141 38.6533 2.14807 38.3933 1.94141 38.06C1.73474 37.7267 1.63141 37.34 1.63141 36.9H2.51141C2.51141 37.1733 2.57474 37.4267 2.70141 37.66C2.82807 37.8867 3.01141 38.07 3.25141 38.21C3.49807 38.3433 3.80141 38.41 4.16141 38.41C4.63474 38.41 5.00141 38.2967 5.26141 38.07C5.52141 37.8433 5.65141 37.56 5.65141 37.22C5.65141 36.94 5.59141 36.7167 5.47141 36.55C5.35141 36.3767 5.18807 36.2367 4.98141 36.13C4.78141 36.0233 4.54807 35.93 4.28141 35.85C4.02141 35.77 3.74807 35.68 3.46141 35.58C2.92141 35.3933 2.52141 35.1633 2.26141 34.89C2.00141 34.61 1.87141 34.2467 1.87141 33.8C1.86474 33.4267 1.95141 33.0967 2.13141 32.81C2.31141 32.5167 2.56474 32.29 2.89141 32.13C3.22474 31.9633 3.61807 31.88 4.07141 31.88C4.51807 31.88 4.90474 31.9633 5.23141 32.13C5.56474 32.2967 5.82141 32.5267 6.00141 32.82C6.18807 33.1133 6.28474 33.4467 6.29141 33.82H5.41141C5.41141 33.6267 5.36141 33.4367 5.26141 33.25C5.16141 33.0567 5.00807 32.9 4.80141 32.78C4.60141 32.66 4.34807 32.6 4.04141 32.6C3.66141 32.5933 3.34807 32.69 3.10141 32.89C2.86141 33.09 2.74141 33.3667 2.74141 33.72C2.74141 34.02 2.82474 34.25 2.99141 34.41C3.16474 34.57 3.40474 34.7033 3.71141 34.81C4.01807 34.91 4.37141 35.0267 4.77141 35.16C5.10474 35.28 5.40474 35.42 5.67141 35.58C5.93807 35.74 6.14474 35.9467 6.29141 36.2C6.44474 36.4533 6.52141 36.7767 6.52141 37.17C6.52141 37.5033 6.43474 37.82 6.26141 38.12C6.08807 38.4133 5.82474 38.6533 5.47141 38.84C5.12474 39.0267 4.68807 39.12 4.16141 39.12ZM9.94266 39.12C9.46932 39.12 9.04266 39.0133 8.66266 38.8C8.28932 38.58 7.99266 38.2767 7.77266 37.89C7.55932 37.4967 7.45266 37.04 7.45266 36.52C7.45266 36 7.55932 35.5467 7.77266 35.16C7.99266 34.7667 8.28932 34.4633 8.66266 34.25C9.04266 34.03 9.46932 33.92 9.94266 33.92C10.5293 33.92 11.0227 34.0733 11.4227 34.38C11.8293 34.6867 12.086 35.0967 12.1927 35.61H11.3327C11.266 35.3033 11.1027 35.0667 10.8427 34.9C10.5827 34.7267 10.2793 34.64 9.93266 34.64C9.65266 34.64 9.38932 34.71 9.14266 34.85C8.89599 34.99 8.69599 35.2 8.54266 35.48C8.38932 35.76 8.31266 36.1067 8.31266 36.52C8.31266 36.9333 8.38932 37.28 8.54266 37.56C8.69599 37.84 8.89599 38.0533 9.14266 38.2C9.38932 38.34 9.65266 38.41 9.93266 38.41C10.2793 38.41 10.5827 38.3267 10.8427 38.16C11.1027 37.9867 11.266 37.7433 11.3327 37.43H12.1927C12.0927 37.93 11.8393 38.3367 11.4327 38.65C11.026 38.9633 10.5293 39.12 9.94266 39.12ZM15.0158 39.12C14.6024 39.12 14.2591 39.05 13.9858 38.91C13.7124 38.77 13.5091 38.5833 13.3758 38.35C13.2424 38.1167 13.1758 37.8633 13.1758 37.59C13.1758 37.0833 13.3691 36.6933 13.7558 36.42C14.1424 36.1467 14.6691 36.01 15.3358 36.01H16.6758V35.95C16.6758 35.5167 16.5624 35.19 16.3358 34.97C16.1091 34.7433 15.8058 34.63 15.4258 34.63C15.0991 34.63 14.8158 34.7133 14.5758 34.88C14.3424 35.04 14.1958 35.2767 14.1358 35.59H13.2758C13.3091 35.23 13.4291 34.9267 13.6358 34.68C13.8491 34.4333 14.1124 34.2467 14.4258 34.12C14.7391 33.9867 15.0724 33.92 15.4258 33.92C16.1191 33.92 16.6391 34.1067 16.9858 34.48C17.3391 34.8467 17.5158 35.3367 17.5158 35.95V39H16.7658L16.7158 38.11C16.5758 38.39 16.3691 38.63 16.0958 38.83C15.8291 39.0233 15.4691 39.12 15.0158 39.12ZM15.1458 38.41C15.4658 38.41 15.7391 38.3267 15.9658 38.16C16.1991 37.9933 16.3758 37.7767 16.4958 37.51C16.6158 37.2433 16.6758 36.9633 16.6758 36.67V36.66H15.4058C14.9124 36.66 14.5624 36.7467 14.3558 36.92C14.1558 37.0867 14.0558 37.2967 14.0558 37.55C14.0558 37.81 14.1491 38.02 14.3358 38.18C14.5291 38.3333 14.7991 38.41 15.1458 38.41ZM18.7759 39V34.04H19.5359L19.5859 34.93C19.7459 34.6167 19.9759 34.37 20.2759 34.19C20.5759 34.01 20.9159 33.92 21.2959 33.92C21.8826 33.92 22.3493 34.1 22.6959 34.46C23.0493 34.8133 23.2259 35.36 23.2259 36.1V39H22.3859V36.19C22.3859 35.1567 21.9593 34.64 21.1059 34.64C20.6793 34.64 20.3226 34.7967 20.0359 35.11C19.7559 35.4167 19.6159 35.8567 19.6159 36.43V39H18.7759Z"
        fill={color}
      />
    </Svg>
  );
};