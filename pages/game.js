import React, { useEffect, useRef } from "react";

export default function Game() {
  const imageRef = useRef(null);
  useEffect(() => {
    console.log("Game page loaded");

    var character = window?.document?.getElementById("character");
    setInterval(() => {
      let characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
      );
      let blockLeft = parseInt(
        window.getComputedStyle(block).getPropertyValue("left")
      );
      if (blockLeft > 660 && characterTop >= 130) {
        block.style.animation = "none";
        // alert("Game Over. score: ");

        block.style.animation = "block 1s infinite linear";
      }
    }, 10);

    const listener = (event) => {
      if (
        event.code === "Enter" ||
        event.code === "ArrowUp" ||
        event.code === "Space"
      ) {
        event.preventDefault();
        jump();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  function jump() {
    // console.log(imageRef.current.src);
    let blockLeft = parseInt(
      window.getComputedStyle(block).getPropertyValue("left")
    );
    console.log("poss>>", blockLeft);
    imageRef.current.src = "/images/jumpman.png";
    var character = window.document.getElementById("character");
    if (character.classList == "animate") {
      return;
    }
    character.classList.add("animate");
    setTimeout(function () {
      character.classList.remove("animate");
      imageRef.current.src = "/images/char1.png";
    }, 300);
  }

  return (
    <div className="game-parent">
      <div className="game">
        <div id="character" onClick={jump}>
          <img
            src="/images/char1.png"
            alt="character"
            height={150}
            ref={imageRef}
          />
        </div>
        <div id="block">
          <img src="/images/char1.png" alt="character" height={150} />
        </div>
      </div>
      <div className="bottom-line" />
    </div>
  );
}
