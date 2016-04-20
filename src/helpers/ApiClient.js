import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/'.concat(path) : path;
  return config.baseUrl.concat('/api').concat(adjustedPath);
}

class _ApiClient {
  constructor() {
    methods.forEach((method) => // eslint-disable-line
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => { // eslint-disable-line
          return err ? reject(body || err) : resolve(body);
        });
      }));
  }
}

const ApiClient = _ApiClient;

export {
  ApiClient
};
