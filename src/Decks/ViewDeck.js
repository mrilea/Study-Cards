import React, { useEffect, useState } from "react";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ViewDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeck() {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    }
    fetchDeck();
  }, [deckId]);

  const HandleDeckDelete = (e) => {
    if (
      window.confirm(`Delete this deck?\n\nYou will not be able to recover it.`)
    ) {
      deleteDeck(deckId);
      history.push("/");
    }
  };

  const handleCardDelete = (e) => {
    let cardToDelete = deck.cards.find((card) => card.id == e.target.id);

    if (
      window.confirm(`Delete this card?\n\nYou will not be able to recover it.`)
    ) {
      deleteCard(cardToDelete.id);
      history.go();
    }
  };

  if (deck.cards) {
    let cards = deck.cards;
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">🏠Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
        <div>
          <h4>{deck.name}</h4>
          <p>{deck.description}</p>
          <div className="row">
            <Link to={`/decks/${deck.id}/edit`}>
              <button type="button" className="btn btn-secondary m-3">
                ✏️Edit
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button type="button" className="btn btn-primary m-3">
                📘Study
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/cards/new`}>
              <button type="button" className="btn btn-primary m-3">
                ➕Add Cards
              </button>
            </Link>
            <div className="col text-right m-3">
              <button
                type="button"
                className="btn btn-danger"
                id={deck.id}
                onClick={HandleDeckDelete}
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
        <h2>Cards</h2>
        {cards.map((card, index) => {
          return (
            <div className="card rounded-50 p-3 mt-3" id={card.id} key={index}>
              <div className="row">
                <div className="col">
                  <p>{card.front}</p>
                </div>
                <div className="col">
                  <p>{card.back}</p>
                </div>
              </div>
              <div className="row">
                <div className="col text-right">
                  <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                    <button type="button" className="btn btn-secondary mr-1">
                      ✏️Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    id={card.id}
                    onClick={handleCardDelete}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
}
