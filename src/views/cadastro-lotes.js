import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';
import '../custom.css';

function CadastroLotes() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/lotes`;

  const [id, setId] = useState('');
  const [quantidadeEstoque, setQuantidadeEstoque] = useState(0);
  const [fornecedor, setFornecedor] = useState('');
  const [dataFabricacao, setDataFabricacao] = useState('');
  const [dataValidade, setDataValidade] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setQuantidadeEstoque(0);
      setFornecedor('');
      setDataFabricacao('');
      setDataValidade('');
    } else {
      setId(dados.id);
      setQuantidadeEstoque(dados.quantidadeEstoque);
      setFornecedor(dados.fornecedor);
      setDataFabricacao(dados.dataFabricacao);
      setDataValidade(dados.dataValidade);
    }
  }

  async function salvar() {
    let data = {
      id,
      quantidadeEstoque,
      fornecedor,
      dataFabricacao,
      dataValidade,
    };

    data = JSON.stringify(data);
    if (!idParam == null) {
        await axios
        .post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Lote de ${fornecedor} cadastrado com sucesso!`);
          navigate(`/listagem-lotes`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
        await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Lote de ${fornecedor} alterado com sucesso!`);
          navigate(`/listagem-lotes`);
      })
      .catch (function (error) {
      mensagemErro(error.response.data);
    });
  }
  }

  async function buscar() {
    if (idParam) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);

        setId(dados.id);
        setQuantidadeEstoque(dados.quantidadeEstoque);
        setFornecedor(dados.fornecedor);
        setDataFabricacao(dados.dataFabricacao);
        setDataValidade(dados.dataValidade);
      });
    }
  }

  useEffect(() => {
    buscar();
    inicializar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Lote'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Quantidade em Estoque: *' htmlFor='inputQuantidadeEstoque'>
                <input
                  type='number'
                  id='inputQuantidadeEstoque'
                  value={quantidadeEstoque}
                  className='form-control'
                  onChange={(e) => setQuantidadeEstoque(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Fornecedor: *' htmlFor='inputFornecedor'>
                <input
                  type='text'
                  id='inputFornecedor'
                  value={fornecedor}
                  className='form-control'
                  onChange={(e) => setFornecedor(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data de Fabricação: *' htmlFor='inputDataFabricacao'>
                <input
                  type='date'
                  id='inputDataFabricacao'
                  value={dataFabricacao}
                  className='form-control'
                  onChange={(e) => setDataFabricacao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data de Validade: *' htmlFor='inputDataValidade'>
                <input
                  type='date'
                  id='inputDataValidade'
                  value={dataValidade}
                  className='form-control'
                  onChange={(e) => setDataValidade(e.target.value)}
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} type='button' className='btn btn-success'>
                  Salvar
                </button>
                <button onClick={inicializar} type='button' className='btn btn-danger'>
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroLotes;
