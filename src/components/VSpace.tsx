interface VSpaceProps {
	// In REMs
	size?: number;
}

export default function VSpace({ size }: VSpaceProps): JSX.Element {
	return (
		<div
			style={{
				height: size ? size + 'rem' : '1rem'
			}} />
	)
}