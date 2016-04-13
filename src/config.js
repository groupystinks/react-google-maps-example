const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  firebaseUrl: 'https://fiery-torch-9452.firebaseio.com',
  app: {
    title: 'writer',
    description: '',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'editor',
        'og:locale': 'zh-TW',
        'og:title': 'editor'
      }
    }
  }
}, environment);
