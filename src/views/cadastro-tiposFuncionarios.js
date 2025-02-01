import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';
import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroTiposFuncionarios() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/tipos-funcionarios`;

  const [id, setId] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prontuario, setProntuario] = useState(false);
  const [cadastroPacientes, setCadastroPacientes] = useState(false);
  const [cadastroFuncionarios, setCadastroFuncionarios] = useState(false);

  const [dadosTiposFuncionarios, setDados] = useState([]);

  function inicializar() {
    if (!idParam) {
      setId('');
      setTipo('');
      setDescricao('');
      setProntuario(false);
      setCadastroPacientes(false);
      setCadastroFuncionarios(false);
    } else {
      setId(dadosTiposFuncionarios.id);
      setTipo(dadosTiposFuncionarios.tipo);
      setDescricao(dadosTiposFuncionarios.descricao);
      setProntuario(dadosTiposFuncionarios.prontuario);
      setCadastroPacientes(dadosTiposFuncionarios.cadastroPacientes);
      setCadastroFuncionarios(dadosTiposFuncionarios.cadastroFuncionarios);
    }
  }

  async function salvar() {
    let data = {
      id,
      tipo,
      descricao,
      prontuario,
      cadastroPacientes,
      cadastroFuncionarios,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Tipo de funcionário ${tipo} cadastrado com sucesso!`);
          navigate(`/listagem-tiposFUncionarios`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Tipo de funcionário ${tipo} cadastrado com sucesso!`);
          navigate(`/listagem-tiposFuncionarios`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
        setId(response.data.id);
        setTipo(response.data.tipo);
        setDescricao(response.data.descricao);
        setProntuario(response.data.prontuario);
        setCadastroPacientes(response.data.cadastroPacientes);
        setCadastroFuncionarios(response.data.cadastroFuncionarios);
      });
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  return (
    <div className='container'>
      <Card title='Cadastro de Tipos de Funcionários'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Tipo: *' htmlFor='inputTipo'>
                <input
                  type='text'
                  id='inputTipo'
                  value={tipo}
                  className='form-control'
                  onChange={(e) => setTipo(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Descrição: *' htmlFor='inputDescricao'>
                <input
                  type='text'
                  id='inputDescricao'
                  value={descricao}
                  className='form-control'
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Prontuário: ' htmlFor='inputProntuario'>
                <input
                  type='checkbox'
                  id='inputProntuario'
                  checked={prontuario}
                  onChange={(e) => setProntuario(e.target.checked)}
                />
              </FormGroup>
              <FormGroup label='Cadastro de Pacientes: ' htmlFor='inputCadastroPacientes'>
                <input
                  type='checkbox'
                  id='inputCadastroPacientes'
                  checked={cadastroPacientes}
                  onChange={(e) => setCadastroPacientes(e.target.checked)}
                />
              </FormGroup>
              <FormGroup label='Cadastro de Funcionários: ' htmlFor='inputCadastroPacientes'>
                <input
                  type='checkbox'
                  id='inputCadastroFuncionarios'
                  checked={cadastroFuncionarios}
                  onChange={(e) => setCadastroFuncionarios(e.target.checked)}
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

export default CadastroTiposFuncionarios;
