import React, { useRef } from "react";
import SingleOffer from "./SingleOffer";
import "./styles/dialogue.css";

const Dialogue = ({ setShowDialogue }) => {
  const dialogueBx = useRef(null);

  const clickOutsideRef = (contentRef) => {
    document.addEventListener("mousedown", (e) => {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        setShowDialogue(false);
      }
    });
  };

  clickOutsideRef(dialogueBx);

  return (
    <main className="dialogue">
      <div className="dialogue-content" ref={dialogueBx} data-aos="fade-up">
        <div className="single-offer">
          <h2 style={{ letterSpacing: "0.05rem", fontSize: "1.2rem" }}>
            Title: Yeezy 350 Zyon | FZ1267 | Size 9
          </h2>
          <SingleOffer />
        </div>
      </div>
    </main>
  );
};

export default React.memo(Dialogue);
