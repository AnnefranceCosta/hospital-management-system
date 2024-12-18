import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroFuncionario() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/funcionarios`;

  // Estados para os campos do formulário
  const [id, setId] = useState('');
  const [nomeFuncionario, setNomeFuncionario] = useState('');
  const [cpf, setCpf] = useState(0);
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const[cidade, setCidade] = useState('');
  const[estado, setEstado] = useState('');
  const[cep, setCep] = useState('');

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNomeFuncionario('');
      setCpf('');
      setDataNascimento('');
      setEmail('');
      setLogradouro('');
      setNumero('');
      setComplemento('');
      setBairro('');
      setCidade('');
      setEstado('');
      setCep('');

    }
  }

  async function salvar() {
    const data = JSON.stringify({
      id,
      nomeFuncionario,
      cpf,
      dataNascimento,
      email,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep
    });

    if (idParam == null) {
      await axios
        .post(baseURL, data, { headers: { 'Content-Type': 'application/json' } })
        .then(() => {
          mensagemSucesso(`Funcionario ${nomeFuncionario} cadastrado com sucesso!`);
          navigate(`/listagem-funcionarios`);
        })
        .catch((error) => {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, { headers: { 'Content-Type': 'application/json' } })
        .then(() => {
          mensagemSucesso(`Funcionario ${nomeFuncionario} alterado com sucesso!`);
          navigate(`/listagem-funcionarios`);
        })
        .catch((error) => {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      const dados = response.data;
      setId(dados.id);
      setNomeFuncionario(dados.nomeFuncionario);
      setCpf(dados.cpf);
      setDataNascimento(dados.dataNascimento);
      setEmail(dados.email);
      setLogradouro(dados.logradouro);
      setNumero(dados.numero);
      setComplemento(dados.complemento);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setEstado(dados.estado);
      setCep(dados.cep);
    });
  }

  return (
    <div className='container'>
      <Card title='Cadastro de Funcionarios'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome do Funcionario: *' htmlFor='inputNomeFuncionario'>
                <input
                  type='text'
                  id='inputNomeFuncionario'
                  value={nomeFuncionario}
                  className='form-control'
                  onChange={(e) => setNomeFuncionario(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='CPF: *' htmlFor='inputCpf'>
                <input
                  type='number'
                  id='inputCpf'
                  value={cpf}
                  className='form-control'
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Data de Nascimento: *' htmlFor='inputDataNascimento'>
                <input
                  type='number'
                  id='inputDataNascimento'
                  value={dataNascimento}
                  className='form-control'
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Email: *' htmlFor='inputEmail'>
                <input
                  type='text'
                  id='inputEmail'
                  value={email}
                  className='form-control'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Logradouro: *' htmlFor='inputLogradouro'>
                <input
                  id='inputLogradouro'
                  className='form-control'
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                >
                </input>
              </FormGroup>

              <FormGroup label='Numero: *' htmlFor='inputNumero'>
                <input
                  id='inputNumero'
                  className='form-control'
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                >
                </input>
              </FormGroup>

              <FormGroup label='Complemento: *' htmlFor='inputComplemento'>
                <input
                  id='inputComplemento'
                  className='form-control'
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                >
                </input>
              </FormGroup>

              <FormGroup label='Bairro: *' htmlFor='inputBairro'>
                <input
                  id='inputBairro'
                  className='form-control'
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                >
                </input>
              </FormGroup>

              <FormGroup label='Cidade: *' htmlFor='inputCidade'>
                <input
                  id='inputCidade'
                  className='form-control'
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                >
                </input>
              </FormGroup>

              <FormGroup label='Estado: *' htmlFor='inputCidade'>
                <input
                  id='inputEstado'
                  className='form-control'
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                </input>
              </FormGroup>

              <FormGroup label='Cep: *' htmlFor='inputCep'>
                <input
                  id='inputCep'
                  className='form-control'
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                >
                </input>
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

export default CadastroFuncionario;
