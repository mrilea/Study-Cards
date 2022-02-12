import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createDeck } from "../utils/api";

export default function CreateDeck() {
  const history = useHistory();
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  async function handleSumbit(event) {
    event.preventDefault();
    let deck = { name: deckName, description: deckDescription };
    const response = await createDeck(deck);
    history.push(`/decks/${response.id}`);
  }
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">🏠Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form>
        <div className="form-group">
          <label htmlFor="deckName">Name</label>
          <input
            className="form-control"
            name="deckName"
            type="text"
            id="deckName"
            value={deckName}
            placeholder="Deck Name"
            onChange={(e) => setDeckName(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="deckDescription">Description</label>
          <textarea
            className="form-control"
            name="deckDescription"
            type="textarea"
            id="deckDescription"
            value={deckDescription}
            placeholder="Brief description of the deck"
            rows="4"
            onChange={(e) => setDeckDescription(e.target.value)}
          ></textarea>
        </div>
        <Link to="/">
          <button className="btn btn-secondary">Cancel</button>
        </Link>
        <button
          htmlFor="submit"
          className="btn btn-primary m-2"
          onClick={handleSumbit}
        >
          Submit
        </button>
      </form>
    </>
  );
}
