import React from 'react';
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 75, height = 75 }) => (
  <Image src="/logo.svg" alt="Logo" width={width} height={height} />
);

export default Logo;