import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { readDeck, updateDeck } from "../utils/api";

export default function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [deckName, setDeckName] = useState(null);
  const [deckDescription, setDeckDescription] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchDeck = async () => {
      const response = await readDeck(deckId);
      let deckData = await response;
      setDeck(deckData);
      let name = await deckData.name;
      setDeckName(name);
      let description = await deckData.description;
      setDeckDescription(description);
    };
    fetchDeck();
  }, [deckId]);

  const handleSubmit = async () => {
    deck.description = deckDescription;
    deck.name = deckName;
    await updateDeck(deck);
    history.goBack();
  };

  if (deckName !== null) {
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">🏠Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/:deckId">{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
        <h1>Edit Deck</h1>
        <form>
          <div className="form-group">
            <label htmlFor="deckName">Name</label>
            <input
              className="form-control"
              type="text"
              id="deckName"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              placeholder={deck.name}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="deckDescription">Description</label>
            <textarea
              className="form-control"
              id="deckDescription"
              placeholder={deck.description}
              value={deckDescription}
              onChange={(e) => setDeckDescription(e.target.value)}
            ></textarea>
          </div>
          <Link to={`/decks/${deck.id}`}>
            <button type="submit" className="btn btn-secondary">
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="btn btn-primary m-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </>
    );
  } else return <p>Loading...</p>;
}
