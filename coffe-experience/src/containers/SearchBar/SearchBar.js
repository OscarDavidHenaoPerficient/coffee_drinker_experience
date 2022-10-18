import React, { Component } from 'react'
import AppContext from '../../store';
import './SearchBar.css'

export default class SearchBar extends Component {
  static contextType = AppContext
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div className='searchContainer'>
        <h2>{this.props.label}</h2>
        <input type='search' onChange={this.props.onChange}></input>
      </div>
    )
  }
}
