"use strict";

const Module  = require('jsrml');
const math    = require('mathjs');
const _       = require('lodash');
const parser  = math.parser();
const rainbox = new (require('sandbox'))()

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
        if (!_.isFunction(res)) this.say(msg.Params[0], res);
    }

    hash(msg, args) {
        if (args[0]) {
          this.say(msg.Params[0], strhash(args[0]));
        } else {
          this.say(msg.Params[0], strhash(msg.Name));
        }
    }

    jip(msg, args) {
        rainbox.run(args.join(' '), (output) => {
            let text = output.result;
            text = text.replace(/^'/, '').replace(/'$/, '');
            this.say(msg.Params[0], text);
        });
    }

    roll(msg, pargs) {
        const args = [];
        const to = msg.Params[0];
        
        pargs = pargs.join(' ');

        if (args.length > 3) {
            this.say(to, 'Too many params');
            return;
        }

        args[0] = pargs.match(/(\d+)r/);
        args[1] = pargs.match(/(\d+)d/);
        args[2] = pargs.match(/(\d+)p/);

        const reps = args[0] ? args[0][1] : 1;
        const dice = args[1] ? args[1][1] : 6;
        const pair = args[2] ? args[2][1] : 1;

        let rolls = [];

        for (let i = 0; i < reps; i++) {
            let sum = 0;
            for (let i = 0; i < pair; i++ ) {
                sum += randomIntFromInterval(1, dice);
            }
            rolls.push(sum);
        }

        this.say(to, rolls.join(', '));
    }
}

if (require.main === module) {
    const m = new Umbrella();

    m.addCommand("cal", {
        Help: 'Parses math',
        Fun: m.cal
    });

    m.addCommand("hash", {
        Help: 'Hashes a given string',
        Fun: m.hash
    });

    m.addCommand("jip", {
        Help: 'Evaluates javascript',
        Fun: m.jip
    });

    m.addCommand("roll", {
        Help: 'You can roll with it if you like',
        Fun: m.roll
    });

    m.register(process.argv);
}