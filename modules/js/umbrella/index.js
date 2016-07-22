"use strict";

const Module = require('jsrml');
const math   = require('mathjs');
const _      = require('lodash');
const parser = math.parser();

function strhash(str) {
  var hash = 0;
  for (let letter of str) {
    hash = Math.abs(letter.charCodeAt(0) +
    (hash << 6) + (hash << 16) - hash);
  }
  return hash;
}

class Umbrella extends Module {
    constructor() {
        super("Umbrella", "A module for utility purposes")
    }

    cal(msg, args) {
        const eqt = args.join(" ");
        let res;
        try { // Try parsing
            res = parser.eval(eqt);
        } catch (e) { /* Quietly fail */ }
        // Return result if not a function
        if (!_.isFunction(res)) this.say(msg.Args[0], res);
    }

    hash(msg, args) {
        if (args[0]) {
          this.say(msg.Args[0], strhash(args[0]));
        } else {
          this.say(msg.Args[0], "Nothing to hash");
        }
    }
}

if (require.main === module) {
    const m = new Umbrella();

    m.initialize()
    .then(() => {
        m.addCommand("cal", {
            Help: 'Parses math',
            Fun: m.cal
        });

        m.addCommand("hash", {
            Help: 'Hashes a given string',
            Fun: m.hash
        });

        m.register();
    })
    .fail((error) => {
        console.error(error);
    });
}