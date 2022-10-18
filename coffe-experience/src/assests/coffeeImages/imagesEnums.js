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
import prensa from './prensa.jpeg';
import moka from './moka.jpeg';
import chemex from './chemex.jpeg'

export const getImage = (selection) => {
  const selected = selection.toLowerCase();
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
    case 'chemex':
      return chemex;
    case 'moka':
      return moka;
    case 'prensa':
      return prensa;
    default:
      return defaultImage;;
  }
};

