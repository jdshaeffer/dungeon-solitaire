import { useState } from 'react'
import { Dialog, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core'
import './App.css'

const Store = ({ onClose, open, storeFunction, gold }) => {
	const [response, setResponse] = useState()

	const handleClose = () => {
		setResponse(null)
		onClose()
	}

	const handleStore = selection =>{
		if (selection === 1) {
			if (gold >= 5) {
				setResponse('success')
				storeFunction('attack', 1, 5)
			} else {
				setResponse('notEnough')
			}
		} else if (selection === 2) {
			if (gold >= 10) {
				setResponse('success')
				storeFunction('attack', 3, 10)
			} else {
				setResponse('notEnough')
			}
		} else if (selection === 3) {
			if (gold >= 5) {
				setResponse('success')
				storeFunction('health', 10, 5)
			} else {
				setResponse('notEnough')
			}
		}
	}

	return (
		<Dialog onClose={handleClose} open={open}>
			<div style={{color: 'white', backgroundColor: '#121E24', border: '2px solid white'}}>
				<DialogTitle>store</DialogTitle>
				<List>
					<ListItem>
						<ListItemText primary='buy more attack power' />
						<button onClick={() => handleStore(1)}>+1 (5 gold)</button>
						<button onClick={() => handleStore(2)}>+3 (10 gold)</button>
					</ListItem>
					<ListItem>
						<ListItemText primary='buy more health' />
						<button onClick={() => handleStore(3)}>+10 (5 gold)</button>
					</ListItem>
				{ response === 'success' ?
				<small style={{marginLeft: '16px', color: 'lightgreen'}}>success!</small>
				: response === 'notEnough' ?
				<small style={{marginLeft: '16px', color: 'red'}}>not enough gold</small>
				: <small style={{visibility: 'hidden'}}>-</small>
				}
				</List>
			</div>
		</Dialog>
	)
}

export default Store
