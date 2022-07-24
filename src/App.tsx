import { useState } from 'react';

import './styles/App.css';
import './styles/Input.css';

import Input from './components/Input';

export default function App(): JSX.Element {

	const [distance, setDistance] = useState('');
	return (
		<div className="App">
			<div className='app-column'>
				<h1>Trip Cost Utility</h1>
				<Input
					label='Distance'
					value={distance}
					onChange={(event: any) => setDistance(event.target.value)}
				/>
			</div>
		</div>
	);
}
