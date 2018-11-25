import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import * as actionCreators from '../action_creators';

let createReactClass = require('create-react-class');

export const VOTE_WIDTH_PERCENT = 8;

export const Results = createReactClass({
    mixins: [PureRenderMixin],
    getPair() {
        return this.props.pair || [];
    },
    getVotes(entry) {
        if (this.props.tally && this.props.tally.hasOwnProperty(entry)) {
            return this.props.tally[entry];
        }
        return 0;
    },
    getVotesBlockWidth(entry) {
        return (this.getVotes(entry) * VOTE_WIDTH_PERCENT) + '%';
    },
    render() {
        return this.props.winner ?
            <div>
                <Winner ref="winner" winner={this.props.winner} />
                <div className="restart_div">
                    <button ref="restart"
                            className="restart"
                            onClick={this.props.restart}>
                        Restart
                    </button>
                </div>
            </div> :
            <div className="results">
                <div className="tally">
                    {this.getPair().map(entry =>
                        <div key={entry} className="entry">
                            <h1>{entry}</h1>
                            <div className="voteVisualization">
                                <div className="votesBlock"
                                     style={{width: this.getVotesBlockWidth(entry)}}>
                                </div>
                            </div>
                            <div className="voteCount">
                                {this.getVotes(entry)}
                            </div>
                        </div>
                    )}
                </div>
                <div className="management">
                    <button ref="restart"
                            className="restart"
                            onClick={this.props.restart}>
                        Restart
                    </button>
                    <button ref="next"
                            className="next"
                            onClick={this.props.next}>
                        Next
                    </button>
                </div>
            </div>;
    }
});

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        tally: state.getIn(['vote', 'tally']),
        winner: state.get('winner')
    }
}

export const ResultsContainer = connect(
    mapStateToProps,
    actionCreators
)(Results);