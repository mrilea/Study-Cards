import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

export default function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      const response = await listDecks();
      setDecks([...response]);
    };
    fetchDecks();
  }, []);

  const handleDelete = (e) => {
    let deckToDelete = decks.find(
      (deck) => deck.id == e.target.parentElement.parentElement.parentElement.id
    );
    let filterDecks = decks.filter((deck) => deck !== deckToDelete);

    if (
      window.confirm(`Delete this deck?\n\nYou will not be able to recover it.`)
    ) {
      deleteDeck(deckToDelete.id);
      setDecks([...filterDecks]);
    }
  };
  
  return (
    <>
      <Link to="/decks/new">
        <button type="button" className="btn btn-secondary m-3">
          ➕Create Deck
        </button>
      </Link>
      <div className="container">
        {decks.map((deck) => (
          <div className="card rounded-50 p-3 mt-3" id={deck.id} key={deck.id}>
            <div className="row">
              <h4 className="m-3">{deck.name}</h4>
              <div className="col text-right m-3">
                <p>{`${deck.cards.length} cards`}</p>
              </div>
            </div>
            <p>{deck.description}</p>
            <div className="row">
              <Link to={`/decks/${deck.id}`}>
                <button type="button" className="btn btn-secondary m-3">
                  👁️View
                </button>
              </Link>
              <Link to={`/decks/${deck.id}/study`}>
                <button type="button" className="btn btn-primary m-3">
                  📘Study
                </button>
              </Link>
              <div className="col text-right m-3">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
