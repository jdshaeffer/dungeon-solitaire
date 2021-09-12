import { useState } from 'react'

let enter
let pause
let goldAfterEnemy
let healthAfterEnemy
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

	enter = [arr.pop(), arr.pop()].map(el => {
		return {...el, clicked: true, display: 'block', selected: false}
	})
	return arr
}

const rand = max => {
	return Math.ceil(Math.random() * max)
}

const sleep = async () => {
	pause = true
	await new Promise(r => setTimeout(r, 1500))
	pause = false
}

const Game = ({ difficulty }) => {
	const [health, setHealth] = useState(0)
	const [attack, setAttack] = useState(0)
	const [gold, setGold] = useState(0)
	const [counter, setCounter] = useState(0)
	const [currentCard, setCurrentCard] = useState(null)
	const [commentary, setCommentary] = useState('roll for initial health')
	const [enemyHealth, setEnemyHealth] = useState(0)
	const [cards, setCards] = useState(shuffle([
		{ pow: 2, value: '2', suit: 'spades', clicked: false, visibility: 'visible' },
		{ pow: 3, value: '3', suit: 'spades', clicked: false, visibility: 'visible' },
		{ pow: 4, value: '4', suit: 'spades', clicked: false, visibility: 'visible' },
		{ pow: 5, value: '5', suit: 'spades', clicked: false, visibility: 'visible' },
		{ pow: 6, value: '6', suit: 'spades', clicked: false, visibility: 'visible' },
		{ pow: 7, value: '7', suit: 'spades', clicked: false, visibility: 'visible' },
		{ pow: 8, value: '8', suit: 'spades', clicked: false, visibility: 'visible' },
		{ pow: 9, value: '9', suit: 'spades', clicked: false, visibility: 'visible' },
		{ pow: 10, value: '10', suit: 'spades', clicked: false, visibility: 'visible' },
		{ pow: 11, value: 'jack', suit: 'spades', clicked: false, visibility: 'visible' },
		{ pow: 12, value: 'queen', suit: 'spades', clicked: false, visibility: 'visible' },
		{ pow: 13, value: 'king', suit: 'spades', clicked: false, visibility: 'visible' },
		{ pow: 14, value: 'ace', suit: 'spades', clicked: false, visibility: 'visible' },
		{ pow: 2, value: '2', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ pow: 3, value: '3', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ pow: 4, value: '4', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ pow: 5, value: '5', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ pow: 6, value: '6', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ pow: 7, value: '7', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ pow: 8, value: '8', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ pow: 9, value: '9', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ pow: 10, value: '10', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ pow: 11, value: 'jack', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ pow: 12, value: 'queen', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ pow: 13, value: 'king', suit: 'clubs', clicked: false, visibility: 'visible' },
		{ pow: 14, value: 'ace', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ pow: 2, value: '2', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ pow: 3, value: '3', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ pow: 4, value: '4', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ pow: 5, value: '5', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ pow: 6, value: '6', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ pow: 7, value: '7', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ pow: 8, value: '8', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ pow: 9, value: '9', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ pow: 10, value: '10', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ pow: 11, value: 'jack', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ pow: 12, value: 'queen', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ pow: 13, value: 'king', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ pow: 14, value: 'ace', suit: 'hearts', clicked: false, visibility: 'visible' },
		{ pow: 2, value: '2', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ pow: 3, value: '3', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ pow: 4, value: '4', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ pow: 5, value: '5', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ pow: 6, value: '6', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ pow: 7, value: '7', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ pow: 8, value: '8', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ pow: 9, value: '9', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ pow: 10, value: '10', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ pow: 11, value: 'jack', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ pow: 12, value: 'queen', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ pow: 13, value: 'king', suit: 'diamonds', clicked: false, visibility: 'visible' },
		{ pow: 14, value: 'ace', suit: 'diamonds', clicked: false, visibility: 'visible' },
	]))
	const [entranceCards, setEntranceCards] = useState(enter)

	const onCardClick = card => {
		// flip over card
		if (!card.clicked && !currentCard) {
			let copyOfCards = [...cards]
			let cardToChange = cards[cards.indexOf(card)]
			cardToChange.clicked = true
			cards[cards.indexOf(card)] = cardToChange
			setCards(copyOfCards)
			setCurrentCard(card)

			// set up enemy health at card flip
			if (card.suit === 'spades' || card.suit === 'clubs') {
				setEnemyHealth(card.pow)
			}

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

			// set up enemy health at card flip
			if (card.suit === 'spades' || card.suit === 'clubs') {
				setEnemyHealth(card.pow)
			}

			const action = card.suit === 'hearts' ? 'for health' : (card.suit === 'diamonds' ? 'for gold' : 'to attack')
			setCommentary(`you selected the ${card.value} of ${card.suit}. roll ${action}.`)
		}
	}

	const afterEnemyPickup = type => {
		// handling enemy drops - follows after enemy defeat - not super dry
		const increase = rand(currentCard.pow)
		type === 'gold' ? setGold(gold + increase) : setHealth(health + increase)
		setCommentary(`your ${type} increased by ${increase}`)
		goldAfterEnemy = false
		healthAfterEnemy = false

		let cardToChange = entranceCards.length ? entranceCards[entranceCards.indexOf(currentCard)] : cards[cards.indexOf(currentCard)]
		cardToChange.visibility = 'hidden'
		cards[cards.indexOf(currentCard)] = cardToChange

		setCurrentCard(null)
		setCards([...cards])
	}

	const roll = async () => {
		if (counter === 0) {
			// initial health set
			setHealth(rand(20))
			setCommentary(`roll for initial attack power`)
		} else if (counter === 1) {
			// initial attack set
			setAttack(rand(8))
			setCommentary(`select one of the above cards to begin`)
		} else {
			if (currentCard && !pause) {
				if (goldAfterEnemy) {
					afterEnemyPickup('gold')
				} else if (healthAfterEnemy) {
					afterEnemyPickup('health')
				} else {
					const value = currentCard.pow
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
						const damage = rand(attack)
						setEnemyHealth(enemyHealth - damage < 0 ? 0 : enemyHealth - damage)

						if (enemyHealth - damage < 1) {
							// when enemy dies
							setCommentary(`you dealt ${damage} damage.
								you defeated the ${currentCard.value} of ${currentCard.suit}.
								roll for ${currentCard.suit === 'clubs' ? 'gold' : 'health'}.`)
							if (currentCard.suit === 'clubs') {
								goldAfterEnemy = true
							} else {
								healthAfterEnemy = true
							}
						} else {
							setCommentary(`you dealt ${damage} damage...`)
							await sleep()
							setCommentary(`the enemy is now attacking...`)
							await sleep()
							const enemyDamage = rand(value)
							setHealth(health - enemyDamage < 0 ? 0 : health - enemyDamage)

							if (health - enemyDamage < 1) {
								// when player dies
								setCommentary(`the enemy dealt ${enemyDamage} damage. you died. refresh to try again.`)
								setEntranceCards([]) // to cover entrance
								setCards([])
								pause = true // game end
							} else {
								setCommentary(`the enemy dealt ${enemyDamage} damage. attack again.`) // or roll away?
							}
						}
					}

					if (enemyHealth < 1) {
						setCurrentCard(null)
					}
				}

				if (currentCard.display && enemyHealth < 1 && health !== 0) {
					// handle entrance card disappearing after 1.5 seconds
					await sleep()
					setCommentary(`entering the dungeon...`)
					await sleep()
					setEntranceCards([])
					setCommentary(`select any card to begin`)
				} else {
					// handle normal dissappearing of cards
					if (enemyHealth < 2) {
						let copyOfCards = [...cards]
						let cardToChange = cards[cards.indexOf(currentCard)]
						cardToChange.visibility = 'hidden'
						cards[cards.indexOf(currentCard)] = cardToChange
						setCards(copyOfCards)
					}
				}
			}
		}

		setCounter(counter + 1)
	}

	return (
		<>
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
			<div className='stats-container'>
				<small className='stat'>health: { health }</small>
				<small className='stat'>attack: { attack }</small>
				<small className='stat'>gold: { gold }</small>
				{ enemyHealth ?
					<small className='stat'>
						enemy health: {enemyHealth}
					</small> : <></>
				}
			</div>
			<div>
				<small>{ commentary }</small>
			</div>
			<div>
				<button onClick={roll} style={{display: counter === 0 ? 'block' : (health > 0 ? 'block' : 'none')}}>roll</button>
			</div>
		</>
	)
}

export default Game
