const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'paulocjneto@gmail.com',
    pass: 'okuk xryh glxx dhbw'
  }
})

exports.sendVerificationEmail = (userEmail, verificationToken) => {
  const verificationLink = `http://192.168.1.106:3000/api/verify?token=${verificationToken}`

  const mailOptions = {
    from: 'agraficadoseventosteste@gmail.com',
    to: userEmail,
    subject: 'Verifique seu e-mail',
    html: `<p> Obrigado por se cadastrar! Clique no link abaixo para verificar seu e-mail:</p> <a href="${verificationLink}">Verificar E-mail</a>`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error ao enviar e-mail:', error)      
    } else {
      console.log('E-mail enviado: ', info.response);
    }
  })
}
