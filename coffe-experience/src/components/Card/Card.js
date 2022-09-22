import classes from './Card.module.css';
import PropTypes from 'prop-types';
import {motion} from 'framer-motion';
import { Fragment } from 'react';
import React from 'react';

const Card = (props) => {
  return (
    <Fragment>
      {/* <motion.div
        layout
        initial={{ x: "-300px"}}
        animate={{ x: 0, opacity: 1 }}
        exit={{ y: '-300px', opacity: 0 }}
        style={{height: openDescription ? '100px' : '500px'}}
        transition={{layout: {duration: 1}}}
        className={classes.expand}
      > */}
        <section
          className={`${classes.card} ${props.className ? props.className : ''}`}
          data-testid='card'
        >
          {props.children}
        </section>
      {/* </motion.div> */}
    </Fragment>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Card;
