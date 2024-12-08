import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import { Stack, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
// import axios from 'axios';  
// import { BASE_URL } from '../config/axios';  

import '../custom.css';

function CadastroMedicamentos() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  // const baseURL = `${BASE_URL}/medicamentos`;  

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [tarja, setTarja] = useState('');
  const [dados, setDados] = useState(null);

  function inicializar() {
    if (!dados || idParam == null) {
      setId('');
      setNome('');
      setTarja('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setTarja(dados.tarja || ''); 
    }
  }

  async function salvar() {
    let data = { id, nome, tarja };
    data = JSON.stringify(data);

    // if (idParam == null) {
    //   await axios
    //     .post(baseURL, data, {
    //       headers: { 'Content-Type': 'application/json' },
    //     })
    //     .then(function (response) {
    //       mensagemSucesso(`Medicamento cadastrado com sucesso!`);
    //       navigate(`/listagem-medicamentos`);
    //     })
    //     .catch(function (error) {
    //       mensagemErro(error.response.data);
    //     });
    // } else {
    //   await axios
    //     .put(`${baseURL}/${idParam}`, data, {
    //       headers: { 'Content-Type': 'application/json' },
    //     })
    //     .then(function (response) {
    //       mensagemSucesso(`Medicamento alterado com sucesso!`);
    //       navigate(`/listagem-medicamentos`);
    //     })
    //     .catch(function (error) {
    //       mensagemErro(error.response.data);
    //     });
    // }
  }

  async function buscar() {
    // if (idParam) {
    //   await axios.get(`${baseURL}/${idParam}`).then((response) => {
    //     setDados(response.data);
    //   });
    // }
  }

  useEffect(() => {
    buscar(); 
  }, [idParam]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Medicamentos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='ID: *' htmlFor='inputId'>
                <input
                  type='text'
                  id='inputId'
                  value={id}
                  className='form-control'
                  name='id'
                  onChange={(e) => setId(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Nome do Medicamento: *' htmlFor='inputNomeMedicamento'>
                <input
                  type='text'
                  maxLength='100'
                  id='inputNomeMedicamento'
                  value={nome}
                  className='form-control'
                  name='nomeMedicamento'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Tarja: *' htmlFor='inputTarja'>
                <FormControl fullWidth>
                  <InputLabel>Tarja</InputLabel>
                  <Select
                    value={tarja}
                    onChange={(e) => setTarja(e.target.value)}
                    label="Tarja"
                    id="inputTarja"
                  >
                    <MenuItem value="Sim">Sim</MenuItem>
                    <MenuItem value="Não">Não</MenuItem>
                    <MenuItem value="Controlado">Controlado</MenuItem>
                  </Select>
                </FormControl>
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
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

export default CadastroMedicamentos;
