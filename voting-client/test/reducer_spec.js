/**
 * Created by Юрий on 22.11.2018.
 */
import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('обрабатывает SET_STATE с простой JS-нагрузкой', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: {Trainspotting: 1}
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        }));
    });

    it('обрабатывает SET_STATE без начального состояния', () => {
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: {Trainspotting: 1}
                }
            }
        };
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        }));
    });

    it('handles VOTE by setting myVote', () => {
        const state = fromJS({
            vote: {
                round: 42,
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        });
        const action = {type: 'VOTE', entry: 'Trainspotting'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            },
            myVote: {
                round: 42,
                entry: 'Trainspotting'
            }
        }));
    });

    it('does not set myVote for VOTE on invalid entry', () => {
        const state = fromJS({
            vote: {
                round: 42,
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        });
        const action = {type: 'VOTE', entry: 'Sunshine'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                round: 42,
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        }));
    });

    it('removes myVote on SET_STATE if round has changed', () => {
        const initialState = fromJS({
            vote: {
                round: 42,
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            },
            myVote: {
                round: 42,
                entry: 'Trainspotting'
            }
        });
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    round: 43,
                    pair: ['Sunshine', 'Trainspotting']
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                round: 43,
                pair: ['Sunshine', 'Trainspotting']
            }
        }));
    });

});