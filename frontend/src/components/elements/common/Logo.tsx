import React, { useEffect, useState } from "react";

interface LogoProps {
	width?: number;
	height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 75, height = 75 }) => (
	<img src="/logo.svg" alt="Logo" width={width} height={height} />
);

export default Logo;
