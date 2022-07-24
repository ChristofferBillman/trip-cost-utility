interface ButtonProps {
	onClick?: () => void;
	text: string;
	color?: string;
}

export default function Button({ onClick, text, color }: ButtonProps): JSX.Element {
	return (
		<div>
			<button onClick={onClick} style={{ backgroundColor: color }}>{text}</button>
		</div>
	);
}