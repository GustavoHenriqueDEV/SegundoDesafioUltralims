const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

let storedAddresses = [];

const getAddressFomCEP = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Erro ao consultar CEP:', error);
    return null;
  }
};

app.use(express.json());
app.use(cors()); 

app.post('/consulta_cep', async (req, res) => {
  const { cep } = req.body;
  const address = await getAddressFomCEP(cep);
  if (address) {
    storedAddresses.push(address);
    res.status(200).json(address);
  } else {
    res.status(400).json({ error: 'CEP inválido' });
  }
});

app.get('/enderecos', (req, res) => {
  res.json(storedAddresses);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
