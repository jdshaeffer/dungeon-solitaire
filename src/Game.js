import { useState } from 'react'

// the fisher-yates shuffle algorithm
let enter
const shuffle = arr => {
	let currentIndex = arr.length, randomIndex
	// while there remain elements to shuffle
	while (currentIndex !== 0) {
		// pick a remaining element
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--
		// and swap it with the current element
		[arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
	}

	enter = [arr.pop(), arr.pop()].map(el => {
		return {...el, clicked: true, display: 'block', selected: false}
	})
	return arr
}

const rand = max => {
	return Math.ceil(Math.random() * max)
}

const Game = ({ difficulty }) => {
	const [health, setHealth] = useState(0)
	const [attack, setAttack] = useState(0)
	const [gold, setGold] = useState(0)
	const [counter, setCounter] = useState(0)
	const [currentCard, setCurrentCard] = useState(null)
	const [commentary, setCommentary] = useState('roll for initial health')
	const [enemyHealth, setEnemyHealth] = useState()
	const [cards, setCards] = useState(shuffle([
		{ value: '2', suit: 'spades', clicked: false, visibility: 'visible' },
		{ value: '3', suit: 'spades', clicked: false, visibility: 'visible' },
		{ value: '4', suit: 'spades', clicked: false, visibility: 'visible' },
		{ value: '5', suit: 'spades', clicked: false, visibility: 'visible' },
		{ value: '6', suit: 'spades', clicked: false, visibility: 'visible' },
		{ value: '7', suit: 'spades', clicked: false, visibility: 'visible' },
		{ value: '8', suit: 'spades', clicked: false, visibility: 'visible' },
		{ value: '9', suit: 'spades', clicked: false, visibility: 'visible' },
		{ value: '10', suit: 'spades', clicked: false, visibility: 'visible' },
		{ value: 'jack', suit: 'spades', clicked: false, visibility: 'visible' },
		{ value: 'queen', suit: 'spades', clicked: false, visibility: 'visible' },
		{ value: 'king', suit: 'spades', clicked: false, visibility: 'visible' },
		{ value: 'ace', suit: 'spades', clicked: false, visibility: 'visible' },
		{ value: '2', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ value: '3', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ value: '4', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ value: '5', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ value: '6', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ value: '7', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ value: '8', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ value: '9', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ value: '10', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ value: 'jack', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ value: 'queen', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ value: 'king', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ value: 'ace', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ value: '2', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ value: '3', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ value: '4', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ value: '5', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ value: '6', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ value: '7', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ value: '8', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ value: '9', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ value: '10', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ value: 'jack', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ value: 'queen', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ value: 'king', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ value: 'ace', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ value: '2', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ value: '3', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ value: '4', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ value: '5', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ value: '6', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ value: '7', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ value: '8', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ value: '9', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ value: '10', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ value: 'jack', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ value: 'queen', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ value: 'king', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ value: 'ace', suit: 'diamonds', clicked: false, visibility: 'visible' },
	]))
	const [entranceCards, setEntranceCards] = useState(enter)

	const onCardClick = card => {
		// flip over card
		if (!card.clicked) {
			let copyOfCards = [...cards]
			let cardToChange = cards[cards.indexOf(card)]
			cardToChange.clicked = true
			cards[cards.indexOf(card)] = cardToChange
			setCards(copyOfCards)
			setCurrentCard(card)

			const action = card.suit === 'hearts' ? 'for health' : (card.suit === 'diamonds' ? 'for gold' : 'to attack')
			setCommentary(`the ${card.value} of ${card.suit}. roll ${action}.`)
		}
	}

	const onEntranceCardClick = card => {
		if (!card.selected) {
			let copyOfCards = [...entranceCards]
			let cardToChange = entranceCards[entranceCards.indexOf(card)]
			cardToChange.selected = true
			entranceCards[entranceCards.indexOf(card)] = cardToChange
			setEntranceCards(copyOfCards.filter(card => card.selected))
			setCurrentCard(card)
			const action = card.suit === 'hearts' ? 'for health' : (card.suit === 'diamonds' ? 'for gold' : 'to attack')
			setCommentary(`you selected the ${card.value} of ${card.suit}. roll ${action}.`)
		}
	}

	const roll = async () => {
		if (counter === 0) {
			// initial health set
			setHealth(rand(20))
			setCommentary(`roll for initial attack power`)
		} else if (counter === 1) {
			// initial attack set
			setAttack(rand(8))
			setCommentary(`select one of the following cards to begin`)
		} else {
			if (currentCard) {
				let value
				if (currentCard.value === 'jack') {
					value = 11
				} else if (currentCard.value === 'queen') {
					value = 12
				} else if (currentCard.value === 'king') {
					value = 13
				} else if (currentCard.value === 'ace') {
					value = 14
				} else {
					value = +currentCard.value
				}

				if (currentCard.suit === 'diamonds') {
					// get gold
					const increase = rand(value)
					setGold(gold + increase)
					setCommentary(`your gold increased by ${increase}`)
				} else if (currentCard.suit === 'hearts') {
					// get health
					const increase = rand(value)
					setHealth(health + increase)
					setCommentary(`your health increased by ${increase}`)
				} else {
					// battle sequence
					if (!enemyHealth) {
						// initial enemy setup
						setEnemyHealth(value)
					}
				}

				if (currentCard.display) {
					// handle entrance card disappearing after a couple seconds
					await new Promise(r => setTimeout(r, 1000))
					setCommentary(`entering the dungeon...`)
					await new Promise(r => setTimeout(r, 2000))
					setEntranceCards([])
					setCommentary(`select any card to begin`)
				} else {
					// handle normal dissappearing of cards
					let copyOfCards = [...cards]
					let cardToChange = cards[cards.indexOf(currentCard)]
					cardToChange.visibility = 'hidden'
					cards[cards.indexOf(currentCard)] = cardToChange
					setCards(copyOfCards)
				}

				setCurrentCard(null)
			}
		}

		setCounter(counter + 1)
	}

	return (
		<>
			<div className='stats-container'>
				<small className='stat'>health: { health }</small>
				<small className='stat'>attack: { attack }</small>
				<small className='stat'>gold: { gold }</small>
			</div>
			{ !entranceCards.length ?
				<div className='cards'>
					{
						cards.map((card, i) => {
							return <div className='card' key={i} onClick={() => onCardClick(card)} style={{visibility: card.visibility}}>
								{ card.clicked ? 
									`${card.value === '10' ? card.value.substring(0, 2) : card.value[0]} ${card.suit[0]}` :
									``
								}
							</div>
						})
					}
				</div> :<></>
			}
			<div>
				<small>{ commentary }</small>
			</div>
			{ counter > 1 ?
				<div className='entrance-cards'>
					{
						entranceCards.map((card, i) => {
							return <div className='card' key={i} onClick={() => onEntranceCardClick(card)} style={{display: card.display}}>
								{ card.clicked ? 
									`${card.value === '10' ? card.value.substring(0, 2) : card.value[0]} ${card.suit[0]}` :
									``
								}
							</div>
						})
					}
				</div> : <></>
			}
			<div>
				<button onClick={roll}>roll</button>
			</div>
			{ enemyHealth ?
				<small>
					enemy health: {enemyHealth}
				</small> : <></>
			}
		</>
	)
}

export default Game
