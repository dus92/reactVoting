import React from 'react';
import {List, Map} from 'immutable';

let createReactClass = require('create-react-class');

export default createReactClass({
    render: function() {
        return this.props.children;
    }
});