import { Link } from 'react-router-dom'
import './App.css'

const Intro = () => {
	return (
		<>
			<h1>welcome to dungeon solitaire (in beta)</h1>
			<h3>pick a difficulty:</h3>
			<div>
				<Link to='/easy'>
					<button>easy</button>
				</Link>
				<Link to='/hard'>
					<button>hard</button>
				</Link>
			</div>
		</>
	)
}

export default Intro
