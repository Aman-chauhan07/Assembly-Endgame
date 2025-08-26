import React, { useState } from 'react'
import { languages } from './Language'
import clsx from "clsx"


function AssemblyEndgame() {
    const [currentWord, setCurrentWord] = useState("react")
    const [guessedLetters, setGuessedLetters] = useState([])

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters => {
            const lettersSet = new Set(prevLetters)
            lettersSet.add(letter)
            return Array.from(lettersSet)
        })
    }

    // its render the languages button / languages...
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

    // jo bhi user button click krega vo button show karge screen par...
    const letterElements = currentWord.split("").map((letter, index) => (
        <span key={index}>{letter.toUpperCase()}</span>
    ))

    // It render the keyboard in screen...
    const keyboardElements = alphabet.split("").map(letter => {
        const isInclude = guessedLetters.includes(letter)
        const iscorrect = isInclude && currentWord.includes(letter)
        const iswrong = isInclude && !currentWord.includes(letter)
        const className = clsx({
            correct :iscorrect,
            wrong : iswrong
        })


        return(
            <button
                className = { className } 
                key = { letter }
                onClick = {() => addGuessedLetter(letter)
}
            >
    { letter.toUpperCase() }
            </button >
        )
    })

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