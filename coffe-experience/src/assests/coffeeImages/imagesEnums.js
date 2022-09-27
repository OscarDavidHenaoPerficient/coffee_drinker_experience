/* eslint-disable no-unused-vars */
import defaultImage from './default.png';
import americano from './americano.png';
import espresso from './espresso.png';
import cappuccino from './cappuccino.png';
import latte from './latte.png';
import mocha from './mocha.png';
import macchiato from './macchiato.png';
import carajillo from './carajillo.png';
import lungo from './lungo.png';
import frappe from './frappe.png';
import irlandes from './irlandes.png';
import coldBrew from './cold brew.png';
import ristretto from './ristretto.png';
import vienes from './vienes.png';
import flatWhite from './flat white.png';
import spilled from './spilled.webp';

export const getImage = (selected) => {
  switch (selected) {
    case 'Espresso':
      return espresso;
    case 'Americano':
      return americano;
    case 'Cappuccino':
      return cappuccino;
    case 'Latte':
      return latte;
    case 'Mocha':
      return mocha;
    case 'Macchiato':
      return macchiato;
    case 'Carajillo':
      return carajillo;
    case 'Lungo':
      return lungo;
    case 'Frappé':
      return frappe;
    case 'Irlandes':
      return irlandes;
    case 'Cold Brew':
      return coldBrew;
    case 'Ristretto':
      return ristretto;
    case 'Vienes':
      return vienes;
    case 'Flat White':
      return flatWhite;
    case 'spilled':
      return spilled;
    default:
    return defaultImage;;
  }
};

