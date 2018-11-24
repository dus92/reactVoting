/**
 * Created by Юрий on 22.11.2018.
 */
export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function vote(entry) {
    return {
        meta: {remote: true},
        type: 'VOTE',
        entry
    };
}

export function next() {
    return {
        meta: {remote: true},
        type: 'NEXT'
    };
}

export function restart() {
    console.log('restart');
    return {
        meta: {remote: true},
        type: 'RESTART'
    };
}