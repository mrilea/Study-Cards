import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

export default function CreateCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

  useEffect(() => {
    const fetchDeck = async () => {
      const response = await readDeck(deckId);
      const deckData = await response;
      setDeck(deckData);
    };
    fetchDeck();
  }, [deckId]);

  const handleSubmit = async () => {
    let card = { front: cardFront, back: cardBack };
    await createCard(deckId, card);
    setCardFront("");
    setCardBack("");
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">🏠Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Card</h1>
      <CardForm
        deck={deck}
        cardFront={cardFront}
        cardBack={cardBack}
        setCardFront={setCardFront}
        setCardBack={setCardBack}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
