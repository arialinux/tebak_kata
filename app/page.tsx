"use client";
import React, { useState } from "react";

const WORD_LIST = ["apple", "grape", "lemon", "mango", "peach", "melon", "berry", "guava", "plums", "olive"];
const SECRET = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
const MAX_ATTEMPTS = 6;

function getFeedback(guess, answer) {
  const res = Array(5).fill("gray");
  const answerArr = answer.split("");
  const guessArr = guess.split("");
  const used = Array(5).fill(false);

  for (let i = 0; i < 5; ++i) {
    if (guessArr[i] === answerArr[i]) {
      res[i] = "green";
      used[i] = true;
    }
  }
  for (let i = 0; i < 5; ++i) {
    if (res[i] === "green") continue;
    for (let j = 0; j < 5; ++j) {
      if (!used[j] && guessArr[i] === answerArr[j]) {
        res[i] = "orange";
        used[j] = true;
        break;
      }
    }
  }
  return res;
}

export default function WordleCTF() {
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [showFlagBtn, setShowFlagBtn] = useState(false);

  function handleGuess(e) {
    e.preventDefault();
    if (won || lost) return;
    const word = input.trim().toLowerCase();
    if (word.length !== 5 || !/^[a-z]{5}$/.test(word)) return;

    const feedback = getFeedback(word, SECRET);
    const newGuesses = [...guesses, { word, feedback }];
    setGuesses(newGuesses);
    setInput("");

    if (word === SECRET) {
      setWon(true);
      setShowFlagBtn(true);
    } else if (newGuesses.length >= MAX_ATTEMPTS) {
      setLost(true);
    }
  }

  function handleFlag() {
    window.location.href = "/admin";
  }

  return (
    <div className="game-container">
      <div className="wordle-ctf-root">
        <h1>🔐 CTF Wordle</h1>
        <p className="desc">
          Tebak kata buah 5 huruf dalam <b>{MAX_ATTEMPTS}</b> percobaan.<br />
          <span className="legend green">Hijau</span> = posisi benar,{" "}
          <span className="legend orange">Oranye</span> = huruf ada tapi posisi salah,{" "}
          <span className="legend gray">Abu</span> = salah.
        </p>

        <form onSubmit={handleGuess} className="guess-form">
          <input
            type="text"
            maxLength={5}
            minLength={5}
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={won || lost}
            className="guess-input"
            placeholder="Ketik kata..."
            autoFocus
          />
          <button type="submit" className="guess-btn" disabled={won || lost}>
            Tebak
          </button>
        </form>

        <div className="guesses">
          {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
            <div className="guess-row" key={i}>
              {Array.from({ length: 5 }).map((_, j) => {
                const g = guesses[i];
                const ch = g ? g.word[j].toUpperCase() : "";
                const fb = g ? g.feedback[j] : "";
                return (
                  <span className={`cell ${fb}`} key={j}>
                    {ch}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {won && <div className="result win">🎉 Benar! Kata: <b>{SECRET.toUpperCase()}</b></div>}
        {lost && <div className="result lose">😢 Gagal. Jawabannya: <b>{SECRET.toUpperCase()}</b></div>}

        {showFlagBtn && <button className="flag-btn" onClick={handleFlag}>🎯 Get Flag</button>}
      </div>

      <style>{`
        .game-container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f0f1a;
        }
        .wordle-ctf-root {
          width: 100%;
          max-width: 600px;
          padding: 28px;
          background: #1a1a2e;
          border-radius: 20px;
          box-shadow: 0 8px 24px #0008;
          text-align: center;
          color: #fff;
        }
        h1 { font-size: 2rem; margin-bottom: 12px; }
        .desc { font-size: 1rem; color: #ccc; margin-bottom: 20px; line-height: 1.4; }
        .legend { margin: 0 4px; font-weight: bold; }
        .guess-form { display: flex; gap: 8px; margin-bottom: 20px; }
        .guess-input {
          flex: 1; padding: 12px 16px;
          border-radius: 10px; border: 1px solid #444;
          font-size: 1.2rem; background: #2a2a44; color: #fff;
        }
        .guess-btn {
          background: #2563eb; color: #fff;
          border: none; border-radius: 10px;
          padding: 12px 20px; font-size: 1rem;
          font-weight: 600; cursor: pointer;
        }
        .guess-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .guesses { margin: 24px 0; display: grid; gap: 10px; }
        .guess-row { display: flex; gap: 10px; justify-content: center; }
        .cell {
          width: 60px; height: 60px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem; font-weight: bold;
          border-radius: 8px; border: 2px solid #333;
          background: #2a2a44; color: #fff;
          text-transform: uppercase;
        }
        .cell.green { background: #22c55e; border-color: #22c55e; color: #fff; }
        .cell.orange { background: #f59e42; border-color: #f59e42; color: #fff; }
        .cell.gray { background: #444; border-color: #444; color: #fff; }
        .result { margin: 20px 0; font-size: 1.2rem; font-weight: bold; }
        .result.win { color: #22c55e; }
        .result.lose { color: #f87171; }
        .flag-btn {
          margin-top: 16px;
          background: #f59e42; color: #222;
          padding: 14px 34px; border-radius: 12px;
          font-size: 1.2rem; font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 12px #0006;
        }
      `}</style>
    </div>
  );
}
