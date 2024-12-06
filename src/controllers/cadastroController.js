const prisma = require('../prisma/prismaClient')
const { isValidEmail, isValidPassword, isValidName } = require('../utils/validator')
const { generateToken } = require('../utils/generateToken')
const { sendVerificationEmail } = require('../utils/sendEmail');

exports.signUp = async (req, res) => {
  const { nome, email, senha, confirmacao } = req.body

  try {
    if (!(nome && email && senha && confirmacao)) {
      return res.status(400).send('Todos os campos precisam ser preenchidos!')
    }

    // Verificação de e-mail já cadastrado
    const clienteAssociado = await prisma.cliente.findFirst({
      where: { email: email }
    })

    if (clienteAssociado) {
      const tokenCliente = await prisma.token.findFirst({
        where: { clienteId: clienteAssociado.id }
      })
      if (tokenCliente && tokenCliente.status !== "checked") {
        const tokenGenerated = generateToken()
        await prisma.token.update({
          where: { clienteId: clienteAssociado.id },
          data: { token: tokenGenerated }
        })
        sendVerificationEmail(email, tokenGenerated)
        return res.status(400).send('Verifique o último link de verificação enviado ao seu e-mail!')
      }
      return res.status(400).send('E-mail já cadastrado!')
    }

    // Validações de dados de entrada
    if (!isValidEmail(email)) return res.status(400).send('Digite um e-mail válido!')
    if (!isValidName(nome)) return res.status(400).send('Seu nome de usuário deve conter pelo menos 5 caracteres!')
    if (senha !== confirmacao) return res.status(400).send('Senhas não coincidem!')
    if (!isValidPassword(senha)) return res.status(400).send('Sua senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 8 caracteres no total!')

    // Criando novo cliente
    const clienteBD = await prisma.cliente.create({
      data: { nome, email, senha }
    })

    if (!clienteBD) {
      return res.status(500).send('Não foi possível cadastrar o cliente!')
    }

    // Criando token de verificação para o novo cliente
    const tokenGenerated = generateToken()
    await prisma.token.create({
      data: {
        token: tokenGenerated,
        clienteId: clienteBD.id
      }
    })

    sendVerificationEmail(email, tokenGenerated)
    return res.status(200).send('Foi enviado um e-mail de verificação')

  } catch (err) {
    return res.status(500).send(`Erro interno ao cadastrar: ${err.message}`)
  } finally {
    await prisma.$disconnect()
  }
}

exports.verifyTokenEmail = async (req, res) => {
  const tokenWeb = req.query.token

  try {
    const token = await prisma.token.update({
      where: { token: tokenWeb },
      data: { status: 'checked' }
    })

    if (token) {
      return res.status(200).send('Bem-vindo! Seu token foi validado, já pode fazer login')
    }
  } catch (err) {
    return res.status(500).send('Erro interno ao validar token')
  } finally {
    await prisma.$disconnect()
  }
}
