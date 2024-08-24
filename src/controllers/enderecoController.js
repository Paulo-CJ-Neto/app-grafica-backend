const prisma = require('./../prisma/prismaClient')

exports.getAdressById = async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).send('ID inválido')
    }

    const adress = await prisma.endereco.findUnique({
      where: {
        id
      }
    })

    if (!adress) {
      return res.status(404).send('Endereço não encontrado')
    }

    return res.status(200).json(adress)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Não foi possível buscar endereço pelo ID')
  }
}

exports.putAdressById = async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).send('ID inválido')
    }

    const adress = await prisma.endereco.update({
      where: {
        id
      },
      data: req.body
    })

    return res.status(200).send('Endereço atualizado com sucesso')
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Não foi possível atualizar o endereço pelo ID')
  }
}

exports.postAdressByClientId = async (req, res) => {
  try {
    const clientId = Number(req.params.id)
    if (isNaN(clientId)) {
      return res.status(400).send('ID do cliente inválido')
    }

    // Verifique se req.body contém os campos necessários
    if (!req.body.rua || !req.body.numero || !req.body.cep) {
      return res.status(400).send('Dados do endereço incompletos')
    }

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

    return res.status(201).send('O novo endereço foi criado e associado com sucesso')
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Não foi possível criar o endereço ou associá-lo ao cliente')
  }
}
