// Uses webtask.io
// wt create ./recaptcha/recaptcha.js --secret secretkey=6LcqUawUAAAAAF1SV-nUtCpCjZ_QFSY3Rd0dxtzV --meta 'wt-node-dependencies'='{"grecaptcha":"latest"}'
const Grecaptcha = require('grecaptcha')

module.exports = (body, callback) => {
  console.log('recaptcha')
  const client = new Grecaptcha(body.secrets.secretkey)
  if (await client.verify(body.data.token)) {
    console.log('accepted')
  }
  else {
    console.log('denied')
  }
}
