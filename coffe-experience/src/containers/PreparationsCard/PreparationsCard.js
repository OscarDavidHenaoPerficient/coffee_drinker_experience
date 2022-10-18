import {Component, Fragment} from 'react';
import Card from "../../components/Card/Card";
import Expandable from "../../components/Expandable/Expandable";
import './PreparationsCard.css';
import {SwitchTransition, CSSTransition} from 'react-transition-group';
import AppContext from '../../store';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../../components/Users/Button';
import ErrorModal from '../../components/UI/ErrorModal';

const getPreparation = (word, list) => {
  const result = list.find(wordlist => word.split(' ')[0] === wordlist.title.toLowerCase().split(' ')[0])
  return result
}

class PreparationsCard extends Component {
  static contextType = AppContext;
  constructor() {
    super()
    this.state = {
      searchWord: '',
      preparationSelected: {
        id: '',
        title: 'Cual es tu favorita?',
        description: '',
        use: ''
      },
      error: {}
    }
  }

  componentDidMount() {
    this.context.preparationsRequest();
  }
  
  onClick () {
    const findWord = getPreparation(this.state.searchWord, this.context.state.preparations) || undefined
    if (findWord) {
      this.setState({
        preparationSelected: findWord
      })
    } else {
      this.setState({
        error: {
          errorType: 'Preparación no encontrada',
          message: 'Parece que tu opcion no existe, por favor intenta otra vez.'
        }
      })                
    }
  }
  
  onChange (event) {
    console.log(event.target.value);
    const value = event.target.value.trim().toLowerCase()
    this.setState({
      searchWord: value
    })
  }

  errorHandler() {
    this.setState({
      error: {}
    })
  }

  render () {
    return (
      <Fragment>
        {this.state.error.errorType && <ErrorModal error={this.state.error} onClick={this.errorHandler.bind(this)} /> }
        <div className='cardContainer'>
          <SwitchTransition mode='out-in'>
            <CSSTransition 
              key={this.state.preparationSelected.title}
              timeout={800}
              classNames='card_animation'
            >
              <Card>{
                <Expandable 
                  title={this.state.preparationSelected.title} 
                  description={this.state.preparationSelected.description}
                />}
              </Card>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div className='buttonContainer'>
          <SearchBar onChange={this.onChange.bind(this)} label='Busca tu preparación favorita: '/>
          <Button onClick={this.onClick.bind(this)} >Buscala Aqui!</Button>
        </div>
      </Fragment>
      
      
    )
  }
}

export default PreparationsCard;
