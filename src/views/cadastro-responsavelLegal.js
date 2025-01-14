import React, { useState, useEffect } from 'react';
import Card from '../components/card';
import SubCard from '../components/sub-card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL2 } from '../config/axios';



const baseURL = `${BASE_URL2}/responsaveisLegais`;

function CadastroResponsavelLegal() {
  const navigate = useNavigate();
  const { idParam } = useParams();

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [relacaoPaciente, setRelacaoPaciente] = useState('');
  const [telefoneCelular, setTelefoneCelular] = useState('');
  const [telefoneFixo, setTelefoneFixo] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (idParam) {
      axios.get(`${baseURL}/${idParam}`).then((response) => {
        const { id, nome, cpf, relacaoPaciente, telefoneCelular, telefoneFixo, email } = response.data;
        setId(id);
        setNome(nome);
        setCpf(cpf);
        setRelacaoPaciente(relacaoPaciente);
        setTelefoneCelular(telefoneCelular);
        setTelefoneFixo(telefoneFixo);
        setEmail(email);
      });
    }
  }, [idParam]);

  const salvar = async () => {
    const responsavelLegal = {
      id,
      nome,
      cpf,
      relacaoPaciente,
      telefoneCelular,
      telefoneFixo,
      email,
    };

    try {
      if (id) {
        await axios.put(`${baseURL}/${id}`, responsavelLegal);
        mensagemSucesso('Responsável legal atualizado com sucesso!');
      } else {
        await axios.post(baseURL, responsavelLegal);
        mensagemSucesso('Responsável legal cadastrado com sucesso!');
      }
      navigate('/listagem-responsaveisLegais');
    } catch (error) {
      mensagemErro('Erro ao salvar os dados do responsável legal!');
    }
  };

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
                <button
                  type='button'
                  className='btn btn-success'
                  onClick={salvar}
                >
                  Salvar
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => navigate('/listagem-responsaveisLegais')}
                >
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
