import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Card from '../Card/Card';
import Button from '../Users/Button';
import classes from './ErrorModal.module.css';
import * as actions from '../../store/app-actions';
import { useStore } from '../../store/app-context';

const Backdrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onClick} ></div>
  )
};

const ModalOverlay = (props) => {

  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onClick}>Got it!</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  const {errorType, message } = props.error;

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, document.getElementById('backdrop_root'))}
      {ReactDOM.createPortal(<ModalOverlay title={errorType} message={message} onClick={props.onClick} />, document.getElementById('overlay_root'))}
    </Fragment>
  );
}

export default ErrorModal;
