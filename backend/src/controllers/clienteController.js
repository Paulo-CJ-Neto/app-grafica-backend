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

