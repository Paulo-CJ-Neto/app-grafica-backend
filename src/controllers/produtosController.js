const prisma = require('../prisma/prismaClient')

exports.getProductsByType = async (req, res) => {
  const { tipo, subtipo } = req.query

  try {
    const selectedProducts = await prisma.produto.findMany({
      where: {
        tipo,
        subtipo
      }
    })
    return res.status(200).json(selectedProducts)
  } catch (err) {
    return res.status(500).send('Não foi possivel buscar os produtos por erro no servidor.')
  } finally {
    await prisma.$disconnect()
  }
}

exports.postProduct = async (req, res) => {
  const productCharacteristics = req.body


  try {
    const produto = await prisma.produto.create({
      data: productCharacteristics
    })
    return res.status(201).send('Produto adicionado')
  } catch (err) {
    console.error(err)
    return res.status(500).send('nao foi possivel adicionar o produto')
  } finally {
    await prisma.$disconnect()
  }
}

exports.deleteProduct = async (req, res) => {
  const { id } = req.params
  const idNumber = parseInt(id)

  try {
    await prisma.produto.delete({
      where: {
        id: idNumber
      }
    })
    return res.status(200).send('produto excluido')
  } catch (err) {
    return res.status(500).send('nao foi possivel excluir o produto')
  } finally {
    await prisma.$disconnect()
  }
}

exports.putProduct = async (req, res) => {
  const id = Number(req.params.id)
  const productCharacteristics = req.body

  try {
    await prisma.produto.update({
      where: {
        id
      },
      data: productCharacteristics
    })

    return res.status(201).send('Produto alterado')
  } catch (err) {
    return res.status(500).send('nao foi possivel alterar o produto')
  } finally {
    await prisma.$disconnect()
  }
}