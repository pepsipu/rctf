const path = require('path')
const fs = require('fs')
const nodemailer = require('nodemailer')
const mustache = require('mustache')
const config = require('../../config/server')

const transport = nodemailer.createTransport(config.smtpUrl)
const verifyHtml = fs.readFileSync(path.join(__dirname, 'emails/verify.html')).toString()
const verifyText = fs.readFileSync(path.join(__dirname, 'emails/verify.txt')).toString()

const sendVerification = async ({ token, kind, email }) => {
  const emailView = {
    ctf_name: config.ctfName,
    origin: config.origin,
    token: encodeURIComponent(token),
    register: kind === 'register',
    recover: kind === 'recover'
  }
  let subject
  if (kind === 'register') {
    subject = `Email verification for ${config.ctfName}`
  } else if (kind === 'recover') {
    subject = `Account recovery for ${config.ctfName}`
  }
  await transport.sendMail({
    from: `${config.ctfName} <${config.emailFrom}>`,
    to: email,
    subject,
    html: mustache.render(verifyHtml, emailView),
    text: mustache.render(verifyText, emailView)
  })
}

module.exports = {
  sendVerification
}
