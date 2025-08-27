import React, { useState } from 'react'
import { languages } from './Language'
import clsx from "clsx"
import { getFarewellText, getRandomWord } from './Utility'
import Confetti from "react-confetti"
import { motion } from "framer-motion"

function AssemblyEndgame() {
    const [currentWord, setCurrentWord] = useState(() => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState([])

    const wrongGuessCount =
        guessedLetters.filter(letter => !currentWord.includes(letter)).length
    const isgameWin = currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isgameLoss = wrongGuessCount >= languages.length - 1
    const isgameOver = isgameWin || isgameLoss
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters => {
            const lettersSet = new Set(prevLetters)
            lettersSet.add(letter)
            return Array.from(lettersSet)
        })
    }
    function startNewGame() {
        setCurrentWord(getRandomWord())
        setGuessedLetters([])
    }

    const languageElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className = clsx("chip", isLanguageLost && "lost")
        return (
            <span className={className} style={styles} key={index}>
                {lang.name}
            </span>
        )
    })

    const letterElements = currentWord.split("").map((letter, index) => {
        const shouldRevealLetter = isgameLoss || guessedLetters.includes(letter)
        const letterClassName = clsx(
            isgameLoss && !guessedLetters.includes(letter) && "missed-letter"
        )
        return (
            <span key={index} className={letterClassName}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        )
    })

    const keyboardElements = alphabet.split("").map(letter => {
        const isInclude = guessedLetters.includes(letter)
        const iscorrect = isInclude && currentWord.includes(letter)
        const iswrong = isInclude && !currentWord.includes(letter)

        const className = clsx({
            correct: iscorrect,
            wrong: iswrong
        })

        return (
            <button
                className={className}
                key={letter}
                disabled={isgameOver}
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
                <p className="farewell-message">
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
        }
        if (isgameLoss) {
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
        // 👇 yaha <main> ko motion.div bana diya
        <motion.main
            animate={isgameLoss ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
        >
            {/* ✅ Confetti (Win case) */}
            {isgameWin && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    style={{ position: "fixed", top: 0, left: 0 }}
                />
            )}

            {/* header section */}
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                    programming world safe from Assembly!</p>
            </header>

            {/* game status */}
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
            {isgameOver && (
                <button className="new-game" onClick={startNewGame}>
                    New Game
                </button>
            )}
        </motion.main>
    )
}

export default AssemblyEndgame
