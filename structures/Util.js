const fs = require('fs');
const mongoose = require('mongoose');

class Util {
  constructor(client) {
    this.client = client;
  }

  toProperCase(string) {
    return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
  } 
}

module.exports = Util;