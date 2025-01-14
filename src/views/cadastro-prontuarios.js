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

  const inicializar = useCallback(() => {
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
      axios.get(`${baseURL}/${idParam}`).then((response) => {
        const prontuario = response.data;
        setId(prontuario.id);
        setNomeCompleto(prontuario.nomeCompleto);
        setCrm(prontuario.crm);
        setDataConsulta(prontuario.dataConsulta);
        setMotivoConsulta(prontuario.motivoConsulta);
        setSintomas(prontuario.sintomas);
        setDiagnostico(prontuario.diagnostico);
        setMedicamentos(prontuario.medicamentos);
        setExamesLaudos(prontuario.examesLaudos);
        setObservacoes(prontuario.observacoes);
      });
    }
  }, [idParam, baseURL]);

  const carregarMedicamentos = useCallback(() => {
    axios.get(`${BASE_URL2}/medicamentos`).then((response) => {
      setListaMedicamentos(response.data);
    });
  }, []);

  const salvar = async () => {
    const data = {
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
    try {
      if (idParam == null) {
        await axios.post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Prontuário de ${nomeCompleto} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Prontuário de ${nomeCompleto} atualizado com sucesso!`);
      }
      navigate(`/listagem-prontuarios`);
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar prontuário.');
    }
  };

  useEffect(() => {
    inicializar();
    carregarMedicamentos();
  }, [inicializar, carregarMedicamentos]);

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
