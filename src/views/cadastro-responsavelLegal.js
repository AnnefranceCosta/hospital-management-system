import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Card from '../components/card';
import SubCard from '../components/sub-card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';

function CadastroResponsavelLegal() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL2}/responsaveisLegais`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [relacaoPaciente, setRelacaoPaciente] = useState('');
  const [telefoneCelular, setTelefoneCelular] = useState('0');
  const [telefoneFixo, setTelefoneFixo] = useState('0');
  const [email, setEmail] = useState('');

  const [dadosResponsavelLegal, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setCpf('');
      setRelacaoPaciente('');
      setTelefoneCelular('0');
      setTelefoneFixo('0');
      setEmail('');
    }else{
      setId(dadosResponsavelLegal.id);
      setNome(dadosResponsavelLegal.nome);
      setCpf(dadosResponsavelLegal.cpf);
      setRelacaoPaciente(dadosResponsavelLegal.relacaoPaciente);
      setTelefoneCelular(dadosResponsavelLegal.telefoneCelular);
      setTelefoneFixo(dadosResponsavelLegal.telefoneFixo);
      setEmail(dadosResponsavelLegal.email);
    }
  }

  async function salvar() {
    let data = {
      id,
      nome,
      cpf,
      relacaoPaciente,
      telefoneCelular,
      telefoneFixo,
      email,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Responsável legal ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-responsavelLegal`);
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
          mensagemSucesso(`ResponsavelLegal ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-responsavelLegal`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  };

  async function buscar() {
    if (idParam != null){
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
      setId(dadosResponsavelLegal.id);
      setNome(dadosResponsavelLegal.nome);
      setCpf(dadosResponsavelLegal.cpf);
      setRelacaoPaciente(dadosResponsavelLegal.relacaoPaciente);
      setTelefoneCelular(dadosResponsavelLegal.telefoneCelular);
      setTelefoneFixo(dadosResponsavelLegal.telefoneFixo);
      setEmail(dadosResponsavelLegal.email);
  }
}

useEffect(() => {
  buscar(); // eslint-disable-next-line
}, [id]);

if (!dadosResponsavelLegal) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Responsável Legal'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <form>
                <div className='form-group'>
                  <label>Nome:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>CPF:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Relação com o Paciente:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={relacaoPaciente}
                    onChange={(e) => setRelacaoPaciente(e.target.value)}
                  />
                </div>
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
                <button onClick={salvar} type='button' className='btn btn-success'>
                  Salvar
                </button>
                <button onClick={inicializar} type='button' className='btn btn-danger'>
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroResponsavelLegal;
