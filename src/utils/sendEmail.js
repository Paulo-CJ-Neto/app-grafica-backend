require('dotenv').config()
const nodemailer = require('nodemailer')

const API_URL = process.env.API_URL

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'paulocjneto@gmail.com',
    pass: 'okuk xryh glxx dhbw'
  }
})

exports.sendVerificationEmail = (userEmail, verificationToken) => {
  const verificationLink = `${API_URL}/api/verify?token=${verificationToken}`

  const mailOptions = {
    from: 'agraficadoseventosteste@gmail.com',
    to: userEmail,
    subject: 'Verifique seu e-mail',
    html: `<p> Obrigado por se cadastrar! Clique no link abaixo para verificar seu e-mail:</p> <a href="${verificationLink}">Verificar E-mail</a>`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error ao enviar e-mail:', error)      
    } else {
      console.warn('E-mail enviado: ', info.response);
    }
  })
}
