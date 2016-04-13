import Firebase from 'firebase';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

/*
 * This silly underscore is here to avoid a mysterious
 * "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */

class _FirebaseApiClient {
  constructor() {
    methods.forEach((method) =>
      this[method] = (children, { data } = {}) => new Promise((resolve, reject) => {
        const ref = new Firebase(`${config.firebaseUrl}/${children}`);
        switch (method) {
          case 'get':
            ref.on('value', (snapshot) => {
              resolve(snapshot.val());
            }, (error) => {
              reject(error.code);
            });
            break;
          case 'post':
            ref.set(data);
            break;
          default:
            return true;
        }
      }));
  }
}

const FirebaseApiClient = _FirebaseApiClient;

export {
  FirebaseApiClient
};
