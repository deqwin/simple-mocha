const utils = require('./utils');

class Suite {
    constructor (props) {
        this.title = props.title; 
        this.suites = [];
        this.tests = [];
        this._beforeEach = [];
        this._beforeAll = [];
        this._afterEach = [];
        this._afterAll = [];
        // this.parent = props.parent || null;
        if (props.parent instanceof Suite) {
            props.parent.suites.push(this);
        }
    }
}

module.exports = Suite;