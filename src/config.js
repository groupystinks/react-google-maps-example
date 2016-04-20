const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  baseUrl: 'http://roommatee.azurewebsites.net',
  app: {
    title: 'react-google-maps-example',
    description: '',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'react-google-maps-example',
        'og:locale': 'zh-TW',
        'og:title': 'react-google-maps-example'
      }
    }
  }
}, environment);
