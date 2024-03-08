import { useEffect, useState } from "react"
import Cell from "./Cell/Cell"
import './Game.css'

function initMatrix(n) {
    const res = new Array(n).fill(0)
    for(let i = 0; i < n; i++) {
        res[i] = new Array(n).fill(0)
        for(let j = 0; j < n; j++) {
            res[i][j] = Math.round(Math.random())
        }
    }
    return res
}

function update(matrix) {
    const n = matrix.length
    const res = new Array(n).fill(0)
    for(let i = 0; i < n; i++) {
        res[i] = new Array(n).fill(0)

        for(let j = 0; j < n; j++) {
            let count = 0
            for(let k = -1; k <= 1; k++) {
                for(let l = -1; l <= 1; l++) {
                    if (k === 0 && l === 0) continue
                    if (matrix.at((i - k) % n).at((j - l) % n)) {
                        count++
                    }
                }
            }

            if (matrix[i][j]) {
                if (count > 3 || count < 2) {
                    res[i][j] = 0
                } else {
                    res[i][j] = 1
                }
            } else {
                if (count === 3) {
                    res[i][j] = 1
                } else {
                    res[i][j] = 0
                }
            }
        }
    }
    
    return res
}

function setAlive(matrix, i, j) {
    const n = matrix.length
    const res = new Array(n).fill(0)
    for(let i = 0; i < n; i++) {
        res[i] = new Array(n).fill(0)
        for(let j = 0; j < n; j++) {
            res[i][j] = matrix[i][j]
        }
    }

    res[i][j] = 1
    res.at(i - 1)[j] = 1
    res.at((i + 1) % n)[j] = 1
    res[i][(j - 1) % n] = 1
    res[i][(j + 1) % n] = 1
    
    return res
}

function Game({ n }) {
    const [matrix, setMatrix] = useState(initMatrix(n))
    const [speed, setSpeed] = useState(7)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMatrix(update(matrix))
        }, Math.trunc(Math.exp(speed)))

        return () => {
            clearTimeout(timeout)
        }
    }, [matrix, speed])

    return (
        <>
        <input 
            type="range"
            min={2} max={7}
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            /> <br/>
        <span>Раз в {Math.trunc(Math.exp(speed))} мс</span>
        <div className="matrix">
            {
                matrix.map((row, i) => {
                    return (
                    <div className="matrix__row" key={i}>
                        {
                            row.map((a, j) => (
                                <Cell
                                    isAlive={matrix[i][j]}
                                    key={j}
                                    onClick={() => setMatrix(setAlive(matrix, i, j))}/>
                            ))
                        }
                    </div>
                )})
            }
        </div>
        </>
    )
}

export default Game