const fs = require('fs')
const axios = require('axios')

const { CLIENT_ID_IMGUR_API } = process.env; 

const uploadImage = async (pathImage) => {
  const image = fs.readFileSync(pathImage); // Substitua pelo caminho da sua imagem
  const base64Image = Buffer.from(image).toString('base64'); // Converte a imagem para base64

  try {
    const response = await axios.post(
      'https://api.imgur.com/3/image',
      {
        image: base64Image, // Imagem convertida para base64
        type: 'base64', // Especifica que a imagem está em formato base64
      },
      {
        headers: {
          Authorization: `Client-ID ${CLIENT_ID_IMGUR_API}`, // Substitua pelo seu Client ID
        },
      }
    );
    return response.data.data.link;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error.response ? error.response.data : error.message);
  }
};

module.exports = uploadImage