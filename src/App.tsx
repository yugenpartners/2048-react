import React from 'react'
import Cells from './Cells'
import game from './Game'
import './App.css'
import TextBox from './TextBox'

interface AppProps {}

interface AppState {
  score: number,
  addition: number,
  cells: number[],
  over: boolean,
  won: boolean
}

export default class App extends React.Component<AppProps, AppState> {
  constructor (props: any) {
    super(props)

    game.start()

    this.state = {
      score: 0,
      cells: game.cells,
      over: false,
      won: false,
      addition: 0
    }

    this.handleKeydown = this.handleKeydown.bind(this)
    this.restart = this.restart.bind(this)
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeydown)

    game.addCallback('over', () => {
      this.setState({ over: true })
    })

    game.addCallback('won', () => {
      this.setState({ won: true })
    })

    game.addCallback('addScore', (score: number) => {
      this.setState({ addition:  score })
    })
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeydown)

    game.removeCallback('over')
    game.removeCallback('won')
    game.removeCallback('addScore')
  }
  
  textContent = [
    {
      title: "Make Your Own",
      paragraphs: [
        "Familiar Faces will offer automated game creation in the future, but for now, all of these games are hand-made!",
        "In order to create a game for your group of family or friends, we’ll need pictures of each member of the family and (optionally) an order for them to appear in game.",
        "You can send these pictures to requests@familiarfaces.app, and we’ll send you back a link to your game! Most requests are processed in 1-3 business days."
      ]
    },
    {
      title: "About",
      paragraphs: [
        "Familiar Faces is a game that brings family and friends to the forefront of fun. By reinventing old classics using pictures and information about loved ones, we hope to make the holiday season more exciting than ever.",
        "If you have any ideas for new directions to go with this project, please send them to requests@familiarfaces.app, and we’ll be in touch!"
      ]
    }
  ];
  
  render () {
    return (
      <div className="app">

        {/* <div className="game-intro">
          <h2 className="subtitle">Play 2048 Game</h2>
          Join the numbers and get to the <b>2048 tile!</b>
        </div> */}

        {/* <TextBox content={this.textContent[1]} /> */}

        <div className="game-container">
          {
            (this.state.won || this.state.over) &&
              <div className={`game-message game-${(this.state.won && 'won') || (this.state.over && 'over')}`}>
                <p>
                  {this.state.won ? 'You win!' : 'Game over!'}
                </p>

                <div className='actions'>
                  <button className='retry-button' onClick={this.restart}>Try again</button>
                </div>
              </div>
          }
          <Cells cells={this.state.cells} />
        </div>
      </div>
    )
  }

  restart (event: any) {
    event.preventDefault()
    game.restart()
    this.setState({
      cells: game.cells,
      addition: 0,
      score: 0,
      over: false,
      won: false
    })
  }

  private handleKeydown (event: any) {
    const keyMap : any = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right'
    }

    if (game.respond(keyMap[event.code])) {
      this.refreshGameState()
    }
  }

  private refreshGameState () : void {
    this.setState({
      cells: game.cells,
      score: game.score,
      over: game.over,
      won: game.won
    })
  }
}
