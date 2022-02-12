import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";

export default function EditCard() {
  let { deckId } = useParams();
  let { cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let deckResponse = await readDeck(deckId);
      let cardResponse = await readCard(cardId);
      setDeck(deckResponse);
      setCard(cardResponse);
      setCardFront(cardResponse.front);
      setCardBack(cardResponse.back);
    };
    fetchData();
  }, [cardId, deckId]);

  const handleSubmit = async () => {
    card.front = cardFront;
    card.back = cardBack;
    await updateCard(card).then(history.push(`/decks/${deckId}`));
  };

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
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
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
