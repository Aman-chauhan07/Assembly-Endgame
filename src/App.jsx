import React, { useState } from 'react'
import { languages } from './Language'

function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState("react")
    const [guessedLetters, setGuessedLetters] = useState([])
    console.log(guessedLetters)

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters => {
            const lettersSet = new Set(prevLetters)
            lettersSet.add(letter)
            return Array.from(lettersSet)
        })
    }

    const languageElements = languages.map(lang => {
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        return (
            <span
                className="chip"
                style={styles}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
    })

    const letterElements = currentWord.split("").map((letter, index) => (
        <span key={index}>{letter.toUpperCase()}</span>
    ))

    const keyboardElements = alphabet.split("").map(letter => (
        <button
            key={letter}
            onClick={() => addGuessedLetter(letter)}
        >
            {letter.toUpperCase()}
        </button>
    ))

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                programming world safe from Assembly!</p>
            </header>
            <section className="game-status">
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </section>
            <section className="language-chips">
                {languageElements}
            </section>
            <section className="word">
                {letterElements}
            </section>
            <section className="keyboard">
                {keyboardElements}
            </section>
            <button className="new-game">New Game</button>
        </main>
    )
}
 export default AssemblyEndgame