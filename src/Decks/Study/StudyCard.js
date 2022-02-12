import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function StudyCard({
  cardIndex,
  setCardIndex,
  deckId,
  front,
  setFront,
  deckLength,
  currentCard,
}) {
  const history = useHistory();

  function handleNext() {
    console.log(cardIndex, deckLength);
    setCardIndex(cardIndex+1);
    if(cardIndex+1 === deckLength) {
      if(window.confirm(`Restart cards?\n\nClick 'cancel' to return to the home page.`)) {
        setCardIndex(0);
      } else history.push('/');
    }
    setFront(true);
  }

  if (deckLength < 3) {
    return (
      <>
        <h4>Not enough cards.</h4>
        <p>
          You need at least 3 cards to study. There are {deckLength} cards in
          this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button type="button" className="btn btn-primary">
            ➕Add Cards
          </button>
        </Link>
      </>
    );
  }
  return (
    <>
      <div className="card rounded-50 p-3 mt-3">
        <h4>
          Card {cardIndex + 1} of {deckLength}
        </h4>
        <p>{front ? `${currentCard.front}` : `${currentCard.back}`}</p>
        <div className="row ml-1">
          <button
            className="btn btn-secondary"
            onClick={() => setFront(!front)}
          >
            Flip
          </button>
          {front === false ? (<button className="btn btn-primary ml-2" onClick={handleNext}>Next</button>) : null}
          
        </div>
      </div>
    </>
  );
}
