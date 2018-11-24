/**
 * Created by Юрий on 18.11.2018.
 */
//import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!doctype html><html><body></body></html>`, { url: "http://localhost:3000/" });

//const { JSDOM } = jsdom;
//const { win } = (new JSDOM('')).window;
//const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});

chai.use(chaiImmutable);