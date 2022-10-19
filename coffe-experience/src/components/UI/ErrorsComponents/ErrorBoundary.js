// import ErrorModal from './ErrorModal';
import React, { Component } from 'react'
import AppContext from '../../../store'
import ErrorModal from './ErrorModal'

class ErrorBoundary extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props)
    this.state = { hasError: false}
  }
  
  // static getDerivedStateFromError(err) {
  //   return { hasError: true}
  // }

  componentDidCatch(er) {
    console.log('in didCatch: ', er);
    this.setState({hasError: true})
  }
  
  errorHandler() {
    this.setState({
      hasError: false
    })
  }

  render() {
    // console.log(this.state.hasError);
    // return (<p>sssssss</p> )
    if (this.state.hasError) {
      // return (<p>sssssss</p> )
      return <ErrorModal error={this.context.state.errorState} onClick={this.errorHandler.bind(this)} />
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
