/**
 * Created by Юрий on 22.11.2018.
 */
export default socket => store => next => action => {
    if (action.meta && action.meta.remote) {
        console.log('state', store.getState());
        socket.emit('action', action);
    }
    return next(action);
}