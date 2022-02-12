import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../utils/api";
import StudyCard from "./StudyCard";

export default function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  // const [cards, setCards] = useState([]);
  const [front, setFront] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeck() {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
      // setCards(response.cards);
    }
    fetchDeck();
  }, [deckId]);

  if (deck.name) {
    let { cards } = deck;
    let deckLength = cards.length;
    let currentCard = cards.find((card, index) => index === cardIndex);

    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">🏠Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <div className="container">
          <h1>Study: {deck.name}</h1>
          <StudyCard
            cardIndex={cardIndex}
            setCardIndex={setCardIndex}
            deckId={deckId}
            deckLength={deckLength}
            front={front}
            setFront={setFront}
            currentCard={currentCard}
          />
        </div>
      </>
    );
  }
  return <p>Loading...</p>;
}
