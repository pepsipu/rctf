require('dotenv').config()

module.exports = {
  environmentVariables: {
    API_ENDPOINT: '/api/v1'
  },
  files: [
    'test/**/*.js'
  ],
  timeout: '30000'
}
