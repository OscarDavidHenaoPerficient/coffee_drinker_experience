import {Component, Fragment} from 'react';
import Card from "../../components/Card/Card";
import Expandable from "../../components/Expandable/Expandable";
import './PreparationsCard.css';
import {SwitchTransition, CSSTransition} from 'react-transition-group';
import AppContext from '../../store';
import SearchBar from '../../components/Search/SearchBar/SearchBar';
import ErrorBoundary from '../../components/UI/ErrorsComponents/ErrorBoundary';

class PreparationsCard extends Component {
  static contextType = AppContext;
  constructor() {
    super()
    this.state = {
      preparationSelected: {
        id: '',
        title: 'Cual es tu favorita?',
        description: '',
        use: ''
      }
    }
  }

  componentDidMount() {
    this.context.preparationsRequest();
    console.log(this.context.state);
  }

  chosenPreparation(data) {
    if (!data) {
      this.setState({
        preparationSelected: this.state.preparationSelected
      })
    } else {
      this.setState({
        preparationSelected: data
      })
    }
  }

  errorHandler() {
    this.setState({
      error: {}
    })
  }

  render () {
    return (
      <Fragment>
        {/* {this.state.error.errorType && <ErrorModal error={this.state.error} onClick={this.errorHandler.bind(this)} /> } */}
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
        <ErrorBoundary>
          <div className='buttonContainer'>
            <SearchBar 
              preparation={this.chosenPreparation.bind(this)}
              label='Busca tu preparación favorita: '/>
          </div>
        </ErrorBoundary>
      </Fragment>
      
      
    )
  }
}

export default PreparationsCard;
