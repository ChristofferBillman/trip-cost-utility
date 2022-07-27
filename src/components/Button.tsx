interface ButtonProps {
	onClick?: () => void;
	text: string;
	color?: string;
}

export default function Button({ onClick, text, color }: ButtonProps): JSX.Element {
	return (
		<button
			onClick={onClick}
			style={{ backgroundColor: color }}
		>
			{text}
		</button>
	)
}