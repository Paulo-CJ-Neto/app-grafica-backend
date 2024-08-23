const prisma = require('../prisma/prismaClient')

exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany()
    return res.status(200).send(clientes)
  } catch (err) {
    return res.status(500).send('Deu pau nao deu pra pegar tds os clientes')
  } finally {
    await prisma.$disconnect()
  }
}

exports.putUpdatedClient = async (req, res) => {
  const newClient = req.body
  const id = Number(req.params.id)
  try {
    const client = await prisma.cliente.update({
      where: {
        id
      },
      data: {
        nome: newClient.nome,
        email: newClient.email,
        senha: newClient.senha,
        cpf: newClient.cpf,
        telefone: newClient.telefone
      }
    })
    return res.status(200).send('Usuario alterado com sucesso!')
  } catch (err) {
    return res.status(500).send(err)
  } finally {
    await prisma.$disconnect()
  }
}

exports.getClienteById = async (req, res) => {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        id: Number(req.params.id)
      }
    })
    return res.status(200).json(cliente)
  } catch (err) {
    return res.status(500).send('não foi possivel pegar cliente pelo id')
  }
}