export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => { //eslint-disable-line
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, ...rest } = action;
      if (!promise) {
        return next(action);
      }

      next({ ...rest, type: action.type });
      return promise(client).then(
        (result) => next({ ...rest, result, type: action.type.concat('_SUCCESS') }),
        (error) => next({ ...rest, error, type: action.type.concat('_FAILURE') })
      ).catch((error) => {
        console.error('MIDDLEWARE ERROR:', error);
        next({ ...rest, error, type: action.type.concat('_FAILURE') });
      });
    };
  };
}
