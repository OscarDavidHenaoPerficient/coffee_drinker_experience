import classes from './Card.module.css';
import PropTypes from 'prop-types';

const Card = (props) => {
  return (
    <section
      className={`${classes.card} ${props.className ? props.className : ''}`}
      data-testid='card'
    >
      {props.children}
    </section>
  );
};

Card.propTypes = {
  children: PropTypes.node
}
export default Card;
