import React from 'react'
import './Cell.css'

import backgroundArr from './images';

interface CellProps {
  value: number
}

interface CellState {}

export default class Cell extends React.Component<CellProps, CellState> {
  render () {
    return (
      <div 
        className={`cell cell-${this.props.value}`}
        style={{ backgroundImage:`url(${backgroundArr[Math.log2((this.props.value)/2)]})`, backgroundSize: "cover" }} >
        {this.props.value}
      </div>
    )
  }
}