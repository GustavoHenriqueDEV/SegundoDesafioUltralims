import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AppBar from '../src/components/appbar/appbar';
import Footer from '../src/components/footer/footer';
import './App.css';

function App() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState({});
  const [storedAddresses, setStoredAddresses] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

 
  const consultarCEP = () => {
    axios.post('http://localhost:5000/consulta_cep', { cep })
      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const newAddress = response.data;
          setAddress(newAddress);
          const updatedAddresses = [...storedAddresses, newAddress];
          localStorage.setItem('storedAddresses', JSON.stringify(updatedAddresses));
          setStoredAddresses(updatedAddresses);
        }
      })
      .catch(error => console.error('Erro ao consultar CEP:', error));
  };
  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };
  const sortAddresses = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  useEffect(() => {
    if (sortBy) {
      const sortedAddressesCopy = [...storedAddresses];
      sortedAddressesCopy.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
      setStoredAddresses(sortedAddressesCopy);
    }
  }, [sortBy, sortOrder, storedAddresses]);

  useEffect(() => {
    const storedAddressesFromLocalStorage = localStorage.getItem('storedAddresses');
    if (storedAddressesFromLocalStorage) {
      setStoredAddresses(JSON.parse(storedAddressesFromLocalStorage));
    }
  }, []); 

  return (
    <div className="App">
      <AppBar showHistory={showHistory} toggleHistory={toggleHistory} />
      <div className='container'>
        <div className='contentWrapper'>
          <h1>Consulta de Endereço</h1>
          <div className="webflow-style-input">
            <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} placeholder="Digite o CEP" />
          </div>
          <button className='button-31' onClick={consultarCEP}>Consultar</button>
          <hr style={{ margin: '20px 0' }} />
          <div className='consult'>
            <h2>Endereço Consultado</h2>
            {address.logradouro && (
              <div>
                <p><strong>Logradouro:</strong> {address.logradouro}</p>
                <p><strong>Bairro:</strong> {address.bairro}</p>
                <p><strong>Cidade:</strong> {address.localidade}</p>
                <p><strong>Estado:</strong> {address.uf}</p>
              </div>
            )}
          </div>
        </div>
        {showHistory && (
          <div className='localStorage'>
            <h2>Endereços Armazenados</h2>
            <div className="sort-options">
              <button onClick={() => sortAddresses('logradouro')}>Ordenar por Logradouro</button>
              <button onClick={() => sortAddresses('bairro')}>Ordenar por Bairro</button>
              <button onClick={() => sortAddresses('localidade')}>Ordenar por Cidade</button>
              <button onClick={() => sortAddresses('uf')}>Ordenar por Estado</button>
            </div>
            <ul className='citys'>
              {storedAddresses.map((address, index) => (
                <li key={index}>
                  {`${address.logradouro}, ${address.bairro}, ${address.localidade}, ${address.uf}`}
                  <hr />

                </li>
                
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
