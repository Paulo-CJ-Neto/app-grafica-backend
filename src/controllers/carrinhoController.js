const prisma = require('../prisma/prismaClient')

exports.getCartByClientId = async (req, res) => {
  const clienteId = parseInt(req.params.clientId)

  try {
    const result = await prisma.carrinho.findMany({
      where: {
        clienteId
      }
    })

    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).send('Nao foi possivel pegar itens do carrinho do cliente')
  } finally {
    await prisma.$disconnect()
  }
}

exports.deleteCartItem = async (req, res) => {
  const cartItemId = parseInt(req.params.cartItemId)

  try {
    await prisma.carrinho.delete({
      where: {
        id: cartItemId
      }
    })

    return res.status(200).send('Item excluido com sucesso')
  } catch (err) {
    return res.status(500).send('Nao foi possivel excluir esse item')
  } finally {
    await prisma.$disconnect()
  }
}

exports.postCartItem = async (req, res) => {
  try {
    const { clientId, produtoId, quantidade, ...outrosCampos } = req.body

    const numericClientId = parseInt(clientId)
    const numericProdutoId = parseInt(produtoId)
    const numericQuantidade = parseInt(quantidade)

    const result = await prisma.carrinho.create({
      data: {
        clienteId: numericClientId,
        produtoId: numericProdutoId,
        quantidade: numericQuantidade,
        ...outrosCampos
      }
    })

    return res.status(201).json(result)
  } catch (err) {
    res.status(500).send('Nao foi possivel adicionar esse produto ao carrinho')
  } finally {
    await prisma.$disconnect()
  }
}