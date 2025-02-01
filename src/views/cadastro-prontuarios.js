import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';
import axios from 'axios';
import { BASE_URL2 } from '../config/axios';

function CadastroProntuario() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL2}/prontuarios`;

  const [id, setId] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [crm, setCrm] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');
  const [motivoConsulta, setMotivoConsulta] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [medicamentos, setMedicamentos] = useState([]);
  const [examesLaudos, setExamesLaudos] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [listaMedicamentos, setListaMedicamentos] = useState([]);
  const [dadosProntuario, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNomeCompleto('');
      setCrm('');
      setDataConsulta('');
      setMotivoConsulta('');
      setSintomas('');
      setDiagnostico('');
      setMedicamentos([]);
      setExamesLaudos('');
      setObservacoes('');
    } else {
      setId(dadosProntuario.id);
      setNomeCompleto(dadosProntuario.nomeCompleto);
      setCrm(dadosProntuario.crm);
      setDataConsulta(dadosProntuario.dataConsulta);
      setMotivoConsulta(dadosProntuario.motivoConsulta);
      setSintomas(dadosProntuario.sintomas);
      setDiagnostico(dadosProntuario.diagnostico);
      setMedicamentos(dadosProntuario.medicamentos);
      setExamesLaudos(dadosProntuario.examesLaudos);
      setObservacoes(dadosProntuario.observacoes);
      }
    }

  async function salvar() {
    let data = {
      id,
      nomeCompleto,
      crm,
      dataConsulta,
      motivoConsulta,
      sintomas,
      diagnostico,
      medicamentos,
      examesLaudos,
      observacoes,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Prontuario de ${nomeCompleto} cadastrado com sucesso!`);
          navigate(`/listagem-prontuarios`);
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
          mensagemSucesso(`Prontuario de ${nomeCompleto} cadastrado com sucesso!`);
          navigate(`/listagem-prontuarios`);
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

        setId(dadosProntuario.id);
        setNomeCompleto(dadosProntuario.nomeCompleto);
        setCrm(dadosProntuario.crm);
        setDataConsulta(dadosProntuario.dataConsulta);
        setMotivoConsulta(dadosProntuario.motivoConsulta);
        setSintomas(dadosProntuario.sintomas);
        setDiagnostico(dadosProntuario.diagnostico);
        setMedicamentos(dadosProntuario.medicamentos);
        setExamesLaudos(dadosProntuario.examesLaudos);
        setObservacoes(dadosProntuario.observacoes);
      });
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dadosProntuario) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Prontuário'>
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
              <FormGroup label='CRM: *' htmlFor='inputCrm'>
                <input
                  type='text'
                  id='inputCrm'
                  value={crm}
                  className='form-control'
                  onChange={(e) => setCrm(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data da Consulta: *' htmlFor='inputDataConsulta'>
                <input
                  type='date'
                  id='inputDataConsulta'
                  value={dataConsulta}
                  className='form-control'
                  onChange={(e) => setDataConsulta(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Motivo da Consulta: *' htmlFor='inputMotivoConsulta'>
                <textarea
                  id='inputMotivoConsulta'
                  value={motivoConsulta}
                  className='form-control'
                  onChange={(e) => setMotivoConsulta(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Sintomas:' htmlFor='inputSintomas'>
                <textarea
                  id='inputSintomas'
                  value={sintomas}
                  className='form-control'
                  onChange={(e) => setSintomas(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Diagnóstico:' htmlFor='inputDiagnostico'>
                <textarea
                  id='inputDiagnostico'
                  value={diagnostico}
                  className='form-control'
                  onChange={(e) => setDiagnostico(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Medicamentos:' htmlFor='inputMedicamentos'>
                <select
                  id='inputMedicamentos'
                  value={medicamentos}
                  className='form-control'
                  multiple
                  onChange={(e) =>
                    setMedicamentos(Array.from(e.target.selectedOptions, (option) => option.value))
                  }
                >
                  {listaMedicamentos.map((medicamento) => (
                    <option key={medicamento.id} value={medicamento.id}>
                      {medicamento.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Exames/Laudos:' htmlFor='inputExamesLaudos'>
                <textarea
                  id='inputExamesLaudos'
                  value={examesLaudos}
                  className='form-control'
                  onChange={(e) => setExamesLaudos(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Observações:' htmlFor='inputObservacoes'>
                <textarea
                  id='inputObservacoes'
                  value={observacoes}
                  className='form-control'
                  onChange={(e) => setObservacoes(e.target.value)}
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

export default CadastroProntuario;
