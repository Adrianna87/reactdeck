import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import axios from "axios";

const BASE_URL = "http://deckofcardsapi.com/api/deck";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [draw, setDraw] = useState([])

  useEffect(() => {
    async function getData() {
      let d = await axios.get(`${BASE_URL}/new/shuffle/`);
      setDeck(d.data);
    }
    getData();
  }, [setDeck]);

  useEffect(() => {
    async function getCard() {
      let { deck_id } = deck;

      try {
        let res = await axios.get(`${BASE_URL}/${deck_id}/draw/`);

        if (drawRes.data.remaining === 0) {
          throw new Error("Error: no cards remaining!");
        }

        const card = res.data.cards[0];

        setDraw(d => [
          ...d,
          {
            id: card.code,
            name: card.suit + " " + card.value,
            image: card.image
          }
        ]);
      } catch (err) {
        alert(err);
      }
    }
  });

  const cards = draw.map(c => (
    <Card key={c.id} name={c.name} image={c.image} />
  ));

  return (
    <div>
      {deck ? (<button>Draw Card</button>) : null}
      <div>{cards}</div>
    </div>
  );
}

export default Deck