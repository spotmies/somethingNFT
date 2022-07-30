import React, { useEffect, useRef, useState } from "react";

export default function Game() {
  const imageRef = useRef(null);
  const blockRef = useRef(null);
  const [playGame, setplayGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (gameOver) {
      if (score > highScore) {
        setHighScore(score);
      }
    }
    let counter = 0;
    if (playGame && !gameOver) {
      const interval = setInterval(() => {
        counter++;
        setScore(counter);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [playGame, gameOver]);

  const startGame = () => {
    console.log("Game started");
    block.style.animation = "block 1s infinite linear";
    block.style.display = "block";
    setGameOver(false);
    setplayGame(true);
  };

  useEffect(() => {
    // if (!gameOver && !playGame && highScore === 0 && score === 0) {
    //   block.style.left = "50%";
    // }
    console.log("Game page loaded");
    if (!playGame) {
      block.style.animation = "none";
      // block.style.display = "none";
    }

    var character = window?.document?.getElementById("character");
    if (gameOver) return;
    setInterval(() => {
      let characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
      );
      let blockLeft = parseInt(
        window.getComputedStyle(block).getPropertyValue("left")
      );
      // console.log(blockLeft, window.getComputedStyle(block));
      let cutOff = blockRef.current.clientWidth * 0.9;
      // console.log(cutOff);
      if (blockLeft > cutOff && characterTop >= 40) {
        block.style.animation = "none";
        block.style.left = "90%";
        // console.log(blockRef);
        // console.log(blockLeft);
        setGameOver(true);

        // block.style.animation = "block 1s infinite linear";
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
    var character = window?.document?.getElementById("character");
    let characterTop = parseInt(
      window.getComputedStyle(character).getPropertyValue("top")
    );
    let blockLeft = parseInt(
      window.getComputedStyle(block).getPropertyValue("left")
    );
    console.log(characterTop, blockLeft);
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
    <div className="game-main-div">
      <div className="game-controls">
        <p>
          {score} / HS {highScore}
        </p>
        <img
          src={
            gameOver && playGame
              ? "/images/replay_button.png"
              : "/images/play_button.png"
          }
          className="pointer"
          onClick={startGame}
        />
      </div>
      <div className="game-parent">
        <div className="game" onClick={jump}>
          <div id="character" onClick={jump}>
            <img
              src="/images/char1.png"
              alt="character"
              // height={150}
              ref={imageRef}
              className="char-image"
            />
          </div>
          <div id="block" ref={blockRef}>
            <img
              src="/images/tree.png"
              alt="character"
              // height={80}
              className="tree-image"
            />
          </div>
        </div>
        <div className="bottom-line" />
      </div>
    </div>
  );
}
