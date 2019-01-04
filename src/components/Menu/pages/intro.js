import React from 'react'

const quotes = ['luchenkov', 'production', 'presents']
const delayBeforePrintChar = 50
const delayBeforeErase = 800

export default class Intro extends React.Component {
  state = {
    firstQuote: '',
    secondQuote: '',
    presents: ''
  }

  printQuotes() {
    if (this.state.firstQuote !== quotes[0]) {
      this.setState(({ firstQuote }) => ({
        firstQuote: quotes[0].slice(0, firstQuote.length + 1)
      }))

      setTimeout(() => {
        this.printQuotes()
      }, delayBeforePrintChar)
    } else if (this.state.secondQuote !== quotes[1]) {
      this.setState(({ secondQuote }) => ({
        secondQuote: quotes[1].slice(0, secondQuote.length + 1)
      }))

      setTimeout(() => {
        this.printQuotes()
      }, delayBeforePrintChar)
    } else {
      setTimeout(() => {
        this.eraseQuotes()
      }, delayBeforeErase)
    }
  }

  eraseQuotes() {
    if (this.state.secondQuote !== '') {
      this.setState(({ secondQuote }) => ({
        secondQuote: secondQuote.slice(0, secondQuote.length - 1)
      }))

      setTimeout(() => {
        this.eraseQuotes()
      }, delayBeforePrintChar)
    } else if (this.state.firstQuote !== '') {
      this.setState(({ firstQuote }) => ({
        firstQuote: firstQuote.slice(0, firstQuote.length - 1)
      }))

      setTimeout(() => {
        this.eraseQuotes()
      }, delayBeforePrintChar)
    } else {
      setTimeout(() => {
        this.printPresents()
      }, 100)
    }
  }

  printPresents() {
    if (this.state.presents !== quotes[2]) {
      this.setState(({ presents }) => ({
        presents: quotes[2].slice(0, presents.length + 1)
      }))

      setTimeout(() => {
        this.printPresents()
      }, delayBeforePrintChar)
    } else {
      setTimeout(() => {
        this.erasePresents()
      }, delayBeforeErase)
    }
  }

  erasePresents() {
    if (this.state.presents !== '') {
      this.setState(({ presents }) => ({
        presents: presents.slice(0, presents.length - 1)
      }))

      setTimeout(() => {
        this.erasePresents()
      }, delayBeforePrintChar)
    } else {
      this.props.onFinish()
    }
  }

  componentDidMount() {
    this.printQuotes()
  }

  render() {
    return (
      <React.Fragment>
        <div className="Menu-intro Menu-centered">
          <div>{this.state.firstQuote}</div>
          <div>{this.state.secondQuote}</div>
        </div>
        <div className="Menu-intro-presents Menu-centered">
          {this.state.presents}
        </div>
      </React.Fragment>
    )
  }
}
