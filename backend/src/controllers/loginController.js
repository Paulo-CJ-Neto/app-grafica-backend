const prisma = require('../prisma/prismaClient')

exports.signIn = async (req, res) => {
  const { email, senha } = req.body

  if (!(email && senha)) {
    return res.status(400).send('Todos os campos precisam ser preenchidos!')
  }

  try {
    const clienteBD = await prisma.cliente.findUnique({
      where: {
        email: email,
        senha: senha
      }
    })
    
    if (!clienteBD) {
      return res.status(400).send('Email ou senha incorretos!')
    }

    const tokenCliente = await prisma.token.findFirst({
      where: {
        clienteId: clienteBD.id
      }
    })

    if (tokenCliente.status === 'checked') {
      return res.status(200).json(clienteBD)
    } else {
      return res.status(500).send(`Você precisa validar o token enviado para o email "${clienteBD.email}"!`)
    }

  } catch (err) {
    return res.status(500).send(`Não foi possivel por causa do serviudor ${err}`)
  } finally {
    await prisma.$disconnect()
  }
}