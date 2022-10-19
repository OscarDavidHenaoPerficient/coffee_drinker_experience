import React, { Component } from 'react'
import AppContext from '../../../store';
import Button from '../../Users/Button';
import './SearchBar.css'

const getPreparation = (word, list) => {
  const result = list.find(wordlist => word.split(' ')[0] === wordlist.title.toLowerCase().split(' ')[0])
  return result
}

export default class SearchBar extends Component {
  static contextType = AppContext
  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
      preparationSelected: {
        id: '',
        title: 'Cual es tu favorita?',
        description: '',
        use: ''
      },
      error: {
        errorType: undefined,
        message: undefined
      }
    }
  }
  
  errorStateSetter(type, message) {
    this.setState({
      error: {
        errorType: type,
        message: message
      }
    })
    this.context.errorSetter(type, message)
  }
  
  onClick () {
    if (this.state.searchWord.length === 0) {
      this.errorStateSetter( 'Error en busqueda',  'Ingresa una preparación')
      console.log('enter here', this.state.searchWord);
      return;
    }
    if (this.context.state.preparations.length === 0) {
      this.errorStateSetter( 'Error en preparaciones',  'No preparations returned')
      return;
    }
    const findWord = getPreparation(this.state.searchWord, this.context.state.preparations) || undefined
    if (!findWord) {
      console.log('enter hjere');
      this.errorStateSetter(  'Error en busqueda',  'Preparacion no encontrada')
      return;
    } else {
      this.setState({
        preparationSelected: findWord
      })
    }
    this.props.preparation(findWord)
  }
  
  onChange (event) {
    console.log(event.target.value);
    const value = event.target.value.trim().toLowerCase()
    this.setState({
      searchWord: value
    })
  }

  render() {
    if (this.state.error.errorType) {
      console.log('here', this.state.error);
      throw new Error('true');
    } else {
      return (
        <div className='searchContainer'>
          <h2>{this.props.label}</h2>
          <input type='search' onChange={this.onChange.bind(this)}></input>
          <Button onClick={this.onClick.bind(this)} >Buscala Aqui!</Button>
        </div>)
  }
  }
}
