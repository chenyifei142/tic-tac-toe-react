import React from 'react'
import Square from '../Square/Square'

class Border extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(""),
            player: "X",
            winner: "",
            winnerArr: [],
            history: [
                {
                    squares: Array(9).fill(""),
                    player: "X",
                },
            ],
            step: 1
        }
    }

    changePlayer(index) {
        if (!this.state.winner) {
            let squares = [...this.state.squares]
            let history = this.state.history.slice(0, this.state.step);
            if (squares[index]) {
                return;
            }
            let player = this.state.player === 'X' ? 'O' : 'X'
            squares[index] = squares[index] === '' ? player : squares[index]
            history.push({
                squares,
                player,
            });
            this.setState({
                player,
                squares,
                history,
                step: history.length,
            });
            let winner = this.calculateWinner(squares);
            if (winner) {
                this.setState({
                    winner: winner.squares,
                    winnerArr: winner.winnerArr
                })
            }
        }
    }

    // 判断获胜者
    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return {
                    squares: squares[a],
                    winnerArr: lines[i],
                };
            }
        }
        return null;
    }

    getClassName(index) {
        let {winner, winnerArr} = this.state;
        if (winner) {
            for (let i = 0; i < 3; i++) {
                if (winnerArr[i] === index) {
                    return "winner-square";
                }
            }
            return "";
        } else {
            return "";
        }
    }

    backTo(i) {
        this.setState((state) => {
            return {
                winner: "",
                squares: state.history[i].squares,
                player: state.history[i].player,
                step: i + 1,
            };
        });
    }


    replay() {
        this.setState({
            squares: Array(9).fill(""),
            player: "X",
            winner: "",
            winnerArr: [],
        })
    }

    render() {
        let {player, squares, winner} = this.state;
        let title;
        if (!winner) {
            title = <p>Next player：{player}</p>;
        } else {
            title = <p>Winner is：{winner}</p>;
        }

        return (
            <>
                <div className="board">
                    <h1>井字棋游戏--React</h1>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
                        {title}
                        <button onClick={() => this.replay()}>重置</button>
                    </div>
                    {squares.map((item, index) => {
                        return <Square key={index} player={item} winnerClass={this.getClassName(index)}
                                       changePlayer={() => this.changePlayer(index)}></Square>
                    })}

                </div>
            </>
        )
    }
}

export default Border;
