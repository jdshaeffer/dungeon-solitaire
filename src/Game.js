import { useState } from 'react'

// the fisher-yates shuffle algorithm
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
	return arr
}

const Game = ({ difficulty }) => {
	const [cards, setCards] = useState(shuffle([
		{ value: '2', suit: 'spades', clicked: false },
		{ value: '3', suit: 'spades', clicked: false },
		{ value: '4', suit: 'spades', clicked: false },
		{ value: '5', suit: 'spades', clicked: false },
		{ value: '6', suit: 'spades', clicked: false },
		{ value: '7', suit: 'spades', clicked: false },
		{ value: '8', suit: 'spades', clicked: false },
		{ value: '9', suit: 'spades', clicked: false },
		{ value: '10', suit: 'spades', clicked: false },
		{ value: 'j', suit: 'spades', clicked: false },
		{ value: 'q', suit: 'spades', clicked: false },
		{ value: 'k', suit: 'spades', clicked: false },
		{ value: 'a', suit: 'spades', clicked: false },
		{ value: '2', suit: 'clubs', clicked: false },
		{ value: '3', suit: 'clubs', clicked: false },
		{ value: '4', suit: 'clubs', clicked: false },
		{ value: '5', suit: 'clubs', clicked: false },
		{ value: '6', suit: 'clubs', clicked: false },
		{ value: '7', suit: 'clubs', clicked: false },
		{ value: '8', suit: 'clubs', clicked: false },
		{ value: '9', suit: 'clubs', clicked: false },
		{ value: '10', suit: 'clubs', clicked: false },
		{ value: 'j', suit: 'clubs', clicked: false },
		{ value: 'q', suit: 'clubs', clicked: false },
		{ value: 'k', suit: 'clubs', clicked: false },
		{ value: 'a', suit: 'hearts', clicked: false },
		{ value: '2', suit: 'hearts', clicked: false },
		{ value: '3', suit: 'hearts', clicked: false },
		{ value: '4', suit: 'hearts', clicked: false },
		{ value: '5', suit: 'hearts', clicked: false },
		{ value: '6', suit: 'hearts', clicked: false },
		{ value: '7', suit: 'hearts', clicked: false },
		{ value: '8', suit: 'hearts', clicked: false },
		{ value: '9', suit: 'hearts', clicked: false },
		{ value: '10', suit: 'hearts', clicked: false },
		{ value: 'j', suit: 'hearts', clicked: false },
		{ value: 'q', suit: 'hearts', clicked: false },
		{ value: 'k', suit: 'hearts', clicked: false },
		{ value: 'a', suit: 'hearts', clicked: false },
		{ value: '2', suit: 'diamonds', clicked: false },
		{ value: '3', suit: 'diamonds', clicked: false },
		{ value: '4', suit: 'diamonds', clicked: false },
		{ value: '5', suit: 'diamonds', clicked: false },
		{ value: '6', suit: 'diamonds', clicked: false },
		{ value: '7', suit: 'diamonds', clicked: false },
		{ value: '8', suit: 'diamonds', clicked: false },
		{ value: '9', suit: 'diamonds', clicked: false },
		{ value: '10', suit: 'diamonds', clicked: false },
		{ value: 'j', suit: 'diamonds', clicked: false },
		{ value: 'q', suit: 'diamonds', clicked: false },
		{ value: 'k', suit: 'diamonds', clicked: false },
		{ value: 'a', suit: 'diamonds', clicked: false },
	]))

	const deal = () => {
		return cards.map((card, i) => {
			return <div className='card' key={i} onClick={() => onCardClick(card)}>
				{ card.clicked ? 
					`${card.value} ${card.suit[0]}` :
					``
				}
			</div>
		})
	}

	const flipOverCard = card => {
		let copyOfCards = [...cards]
		let cardToChange = cards[cards.indexOf(card)]
		cardToChange.clicked = true
		cards[cards.indexOf(card)] = cardToChange
		setCards(copyOfCards)
	}

	const onCardClick = card => {
		flipOverCard(card)
	}

	return (
		<>
			<div className='cards'>
				{ deal() }
			</div>
		</>
	)
}

export default Game
