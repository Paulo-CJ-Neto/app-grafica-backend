const prisma = require('./../prisma/prismaClient')

exports.getAdressById = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const adress = await prisma.endereco.findUnique({
      where: {
        id
      }
    })
    return res.status(200).json(adress)
  } catch (err) {
    return res.status(500).send('não foi possivel buscar endereco pelo id')
  } finally {
    await prisma.$disconnect()
  }
}

exports.putAdressById = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const adress = await prisma.endereco.update({
      where: {
        id
      },
      data: req.body
    })
    return res.status(200).send('endereco atualizado')
  } catch (err) {
    return res.status(500).send('não foi possivel atualizar endereco pelo id')
  } finally {
    await prisma.$disconnect()
  }
}

exports.postAdressByClientId = async (req, res) => {
  try {
    const clientId = Number(req.params.id)
    const newAdress = await prisma.endereco.create({
      data: req.body
    })
    await prisma.cliente.update({
      where: {
        id: clientId
      },
      data: {
        enderecoId: newAdress.id
      }
    })
    
    return res.status(200).send('o novo endereço foi criado e associado')
  } catch (err) {
    return res.status(500).send('não foi possivel criar endereco ou associa-lo ao cliente')
  } finally {
    await prisma.$disconnect()
  }
}