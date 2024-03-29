import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';

const Tutorial = ({ onOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={onOpen}>
      <div
        style={{
          color: 'white',
          backgroundColor: '#121E24',
          border: '2px solid white',
        }}
      >
        <DialogTitle>how to play</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            clear the dungeon of all its monsters and treasures!
          </Typography>
          <Typography gutterBottom>
            begin by receiving an initial health value, randomly selected from
            1-20, and an inital attack power value, randomly selected from 1-8.
            the game is played out of a 52 standard card deck, shuffled up and
            laid face-down in a 5*10 grid. the last 2 cards are presented to you
            face-up at the beginning of the game as a "soft" entrance into the
            dungeon - you select the one you want and the other is discarded.
          </Typography>
          <Typography gutterBottom>
            you then flip over each card and interact with it to clear it. you
            can only select those that are adjacent to an empty space except for
            the first card. hearts give you more health and diamonds give you
            more gold. you roll to determine how much health or gold you get
            depending on the card's value. for example, if you encountered the 5
            of hearts, you will receive an increase in health - randomly
            selected from 1 to 5.
          </Typography>
          <Typography gutterBottom>
            spades and clubs are the enemies of the dungeon. the health of an
            enemy is equivalent to their card's value. the damage you do to an
            enemy will be a random value between 1 and the value of your attack
            power. the damage an enemy does to you will be a random value
            between 1 and their card's value. a battle between an enemy will end
            when their health reaches 0 or when your health reaches 0. when you
            defeat a spade, roll for health, according to the card's value. when
            defeating a club, roll for gold.
          </Typography>
          <Typography gutterBottom>
            use the gold you earn at the shop to upgrade your attack power or
            get more health. the difficulty of the game determines the prices at
            the shop.
          </Typography>
          <Typography gutterBottom>
            any questions or concerns, contact me at shaefferjd at gmail dot
            com. the code for this project lives on{' '}
            <a href='https://github.com/jdshaeffer/dungeon-solitaire'>github</a>
            .
          </Typography>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default Tutorial;
