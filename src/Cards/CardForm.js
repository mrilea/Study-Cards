import React from "react";
import { Link } from "react-router-dom";

export default function CardForm({ deck, cardFront, cardBack, setCardFront, setCardBack, handleSubmit }) {

  return (
    <form>
    <div className="form-group">
      <label htmlFor="cardFront">Front</label>
      <textarea
        className="form-control"
        type="text"
        id="cardFront"
        placeholder="Front side of card"
        value={cardFront}
        onChange={(e) => setCardFront(e.target.value)}
      ></textarea>
    </div>
    <div className="form-group">
      <label htmlFor="cardBack">Back</label>
      <textarea
        className="form-control"
        type="text"
        id="cardBack"
        placeholder="Back side of card"
        value={cardBack}
        onChange={(e) => setCardBack(e.target.value)}
      ></textarea>
    </div>
    <Link to={`/decks/${deck.id}`}>
      <button type="submit" className="btn btn-secondary">
        Done
      </button>
    </Link>
    <button
      type="submit"
      className="btn btn-primary m-2"
      onClick={handleSubmit}
    >
      Save
    </button>
  </form>
  );
};
