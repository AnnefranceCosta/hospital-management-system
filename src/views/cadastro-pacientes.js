import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Card from '../components/card';
import SubCard from '../components/sub-card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';
import axios from 'axios';
import { BASE_URL2 } from '../config/axios';

function CadastroPacientes() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL2}/pacientes`;

  const [id, setId] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('0');
  const [genero, setGenero] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [alergias, setAlergias] = useState('');
  const [carteirinhaSus, setCarteirinhaSus] = useState('0');
  const [telefoneCelular, setTelefoneCelular] = useState('0');
  const [telefoneFixo, setTelefoneFixo] = useState('0');
  const [email, setEmail] = useState('');
  const [profissao, setProfissao] = useState('');
  const [religiao, setReligiao] = useState('');
  const [convenios, setConvenios] = useState(false);
  const [numeroCarteirinha, setNumeroCarteirinha] = useState('0');
  const [responsavelLegal, setResponsavelLegal] = useState(false);
  const [endereco, setEndereco] = useState({
    logradouro: '',
    numero: '0',
    cep: '0',
    bairro: '',
    uf: '',
    complemento: '',
  });

  const [dadosPaciente, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNomeCompleto('');
      setCpf('');
      setDataNascimento('');
      setGenero('');
      setTipoSanguineo('');
      setAlergias('');
      setCarteirinhaSus('');
      setTelefoneCelular('');
      setTelefoneFixo('');
      setEmail('');
      setProfissao('');
      setReligiao('');
      setConvenios(false);
      setNumeroCarteirinha('');
      setResponsavelLegal(false);
      setEndereco({
        logradouro: '',
        numero: '',
        cep: '',
        bairro: '',
        uf: '',
        complemento: '',
      });
    } else {
      setId(dadosPaciente.id);
      setNomeCompleto(dadosPaciente.nomeCompleto);
      setCpf(dadosPaciente.cpf);
      setDataNascimento(dadosPaciente.dataNascimento);
      setGenero(dadosPaciente.genero);
      setTipoSanguineo(dadosPaciente.tipoSanguineo);
      setAlergias(dadosPaciente.alergias);
      setCarteirinhaSus(dadosPaciente.carteirinhaSus);
      setTelefoneCelular(dadosPaciente.telefoneCelular);
      setTelefoneFixo(dadosPaciente.telefoneFixo);
      setEmail(dadosPaciente.email);
      setProfissao(dadosPaciente.profissao);
      setReligiao(dadosPaciente.religiao);
      setConvenios(dadosPaciente.convenios);
      setNumeroCarteirinha(dadosPaciente.numeroCarteirinha);
      setResponsavelLegal(dadosPaciente.responsavelLegal);
      setEndereco(dadosPaciente.endereco);
    }
  }

  async function salvar() {
    let data = {
      id,
      nomeCompleto,
      cpf,
      dataNascimento,
      genero,
      tipoSanguineo,
      alergias,
      carteirinhaSus,
      telefoneCelular,
      telefoneFixo,
      email,
      profissao,
      religiao,
      convenios,
      numeroCarteirinha,
      responsavelLegal,
      endereco,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Paciente ${nomeCompleto} cadastrado com sucesso!`);
          navigate(`/listagem-pacientes`);
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
          mensagemSucesso(`Paciente ${nomeCompleto} cadastrado com sucesso!`);
          navigate(`/listagem-pacientes`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null){
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);

      setId(dadosPaciente.id);
      setNomeCompleto(dadosPaciente.nomeCompleto);
      setCpf(dadosPaciente.cpf);
      setDataNascimento(dadosPaciente.dataNascimento);
      setGenero(dadosPaciente.genero);
      setTipoSanguineo(dadosPaciente.tipoSanguineo);
      setAlergias(dadosPaciente.alergias);
      setCarteirinhaSus(dadosPaciente.carteirinhaSus);
      setTelefoneCelular(dadosPaciente.telefoneCelular);
      setTelefoneFixo(dadosPaciente.telefoneFixo);
      setEmail(dadosPaciente.email);
      setProfissao(dadosPaciente.profissao);
      setReligiao(dadosPaciente.religiao);
      setConvenios(dadosPaciente.convenios);
      setNumeroCarteirinha(dadosPaciente.numeroCarteirinha);
      setResponsavelLegal(dadosPaciente.responsavelLegal);
      setEndereco(dadosPaciente.endereco);
    });
  }
}

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dadosPaciente) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Pacientes'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome Completo: *' htmlFor='inputNomeCompleto'>
                <input
                  type='text'
                  id='inputNomeCompleto'
                  value={nomeCompleto}
                  className='form-control'
                  onChange={(e) => setNomeCompleto(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='CPF: *' htmlFor='inputCpf'>
                <input
                  type='text'
                  id='inputCpf'
                  value={cpf}
                  className='form-control'
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data de Nascimento: *' htmlFor='inputDataNascimento'>
                <input
                  type='date'
                  id='inputDataNascimento'
                  value={dataNascimento}
                  className='form-control'
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Gênero: *' htmlFor='inputGenero'>
                <select
                  id='inputGenero'
                  value={genero}
                  className='form-control'
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <option value=''>Selecione</option>
                  <option value='Masculino'>Masculino</option>
                  <option value='Feminino'>Feminino</option>
                  <option value='Outro'>Outro</option>
                </select>
              </FormGroup>
              <FormGroup label='Tipo Sanguíneo:' htmlFor='inputTipoSanguineo'>
                <input
                  type='text'
                  id='inputTipoSanguineo'
                  value={tipoSanguineo}
                  className='form-control'
                  onChange={(e) => setTipoSanguineo(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Alergias:' htmlFor='inputAlergias'>
                <textarea
                  id='inputAlergias'
                  value={alergias}
                  className='form-control'
                  onChange={(e) => setAlergias(e.target.value)}
                />
              </FormGroup>
              <br></br>
              <SubCard title='Contatos' >
                <div className='form-group'>
                  <label>Telefone Celular:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={telefoneCelular}
                    onChange={(e) => setTelefoneCelular(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Telefone Fixo:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={telefoneFixo}
                    onChange={(e) => setTelefoneFixo(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Email:</label>
                  <input
                    type='email'
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </SubCard>
              <br></br>
              <SubCard title='Endereços'>
                <div className='form-group'>
                  <label>Logradouro:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={endereco.logradouro}
                    onChange={(e) =>
                      setEndereco({ ...endereco, logradouro: e.target.value })
                    }
                  />
                </div>
                <div className='form-group'>
                  <label>Número:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={endereco.numero}
                    onChange={(e) =>
                      setEndereco({ ...endereco, numero: e.target.value })
                    }
                  />
                </div>
                <div className='form-group'>
                  <label>CEP:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={endereco.cep}
                    onChange={(e) =>
                      setEndereco({ ...endereco, cep: e.target.value })
                    }
                  />
                </div>
                <div className='form-group'>
                  <label>Bairro:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={endereco.bairro}
                    onChange={(e) =>
                      setEndereco({ ...endereco, bairro: e.target.value })
                    }
                  />
                </div>
                <div className='form-group'>
                  <label>UF:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={endereco.uf}
                    onChange={(e) =>
                      setEndereco({ ...endereco, uf: e.target.value })
                    }
                  />
                </div>
                <div className='form-group'>
                  <label>Complemento:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={endereco.complemento}
                    onChange={(e) =>
                      setEndereco({ ...endereco, complemento: e.target.value })
                    }
                  />
                </div>
              </SubCard>

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

export default CadastroPacientes;
