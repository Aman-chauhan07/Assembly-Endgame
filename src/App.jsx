import React, { useState } from 'react'
import { languages } from './Language'
import clsx from "clsx"
import getFarewellText from './Utility'

function AssemblyEndgame() {
    // state: jis word ko guess karna hai
    const [currentWord, setCurrentWord] = useState("react")

    // state: user ne ab tak kaunse letters guess kiye
    const [guessedLetters, setGuessedLetters] = useState([])



    // derived value: galat guesses count karna
    const wrongGuessCount =
        guessedLetters.filter(letter => !currentWord.includes(letter)).length
    const isgameWin = currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isgameLoss = wrongGuessCount >= languages.length - 1
    const isgameOver = isgameWin || isgameLoss
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)


    // alphabet string jisse keyboard banega
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    // function: jab user kisi letter button pe click kare
    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters => {
            // duplicate letters avoid karne ke liye Set use kar rahe
            const lettersSet = new Set(prevLetters)
            lettersSet.add(letter)
            return Array.from(lettersSet)
        })
    }

    // programming languages chips ko render karna
    const languageElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className = clsx("chip", isLanguageLost && "lost")
        return (
            <span
                className={className}
                style={styles}
                key={index}
            >
                {lang.name}
            </span>
        )
    })

    // word display karna: guessed letters dikhana warna blank
    const letterElements = currentWord.split("").map((letter, index) => (
        <span key={index}>
            {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
        </span>
    ))

    // screen par keyboard render karna
    const keyboardElements = alphabet.split("").map(letter => {
        // check karo letter user ne guess kiya ya nahi
        const isInclude = guessedLetters.includes(letter)
        // agar guess kiya aur word me hai → correct
        const iscorrect = isInclude && currentWord.includes(letter)
        // agar guess kiya aur word me nahi hai → wrong
        const iswrong = isInclude && !currentWord.includes(letter)
        // clsx se dynamic class add karna
        const className = clsx({
            correct: iscorrect,
            wrong: iswrong
        })

        return (
            <button
                className={className}
                key={letter}
                onClick={() => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button >
        )
    })
    const gamestatusClass = clsx("game-status", {
        won: isgameWin,
        lost: isgameLoss,
        farewell: !isgameOver && isLastGuessIncorrect
    })
    function renderGameStatus(language) {
        if (!isgameOver && isLastGuessIncorrect) {
            return (
                <p
                    className="farewell-message"
                >
                    {getFarewellText(languages[wrongGuessCount - 1].name)}
                </p>
            )
        }

        if (isgameWin) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } if (isgameLoss) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
        return null
    }

    return (
        <main>
            {/* header section */}
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                    programming world safe from Assembly!</p>
            </header>

            {/* game status (static abhi ke liye) */}
            <section className={gamestatusClass}>
                {renderGameStatus()}
            </section>

            {/* programming language chips */}
            <section className="language-chips">
                {languageElements}
            </section>

            {/* word letters */}
            <section className="word">
                {letterElements}
            </section>

            {/* keyboard buttons */}
            <section className="keyboard">
                {keyboardElements}
            </section>

            {/* new game button */}
            {isgameOver && <button className="new-game">New Game</button>}
        </main>
    )
}

export default AssemblyEndgame
