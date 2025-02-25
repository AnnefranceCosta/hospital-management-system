import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { mensagemSucesso, mensagemErro } from "../components/toastr";

import "../custom.css";
import axios from "axios";
import { BASE_URL } from "../config/axios";

function CadastroMedicamento() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/medicamentos`;

  const [id, setId] = useState('');
  const [nomeMedicamento, setNomeMedicamento] = useState('');
  const [quantidade, setQuantidade] = useState('0');
  const [dosagem, setDosagem] = useState('0');
  const [formaFarmaceutica, setFormaFarmaceutica] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tarja, setTarja] = useState('');
  const [lote, setLote] = useState('');

  const [categorias, setCategorias] = useState([]);
  const [tarjas, setTarjas] = useState(["Branca", "Vermelha", "Preta"]);
  const [lotes, setLotes] = useState([]);

  const [dadosMedicamentos, setDados] = React.useState([]);

  function inicializar() {
    if (!idParam) {
      setId('');
      setNomeMedicamento('');
      setQuantidade('0');
      setDosagem('');
      setFormaFarmaceutica('');
      setCategoria('');
      setTarja('');
      setLote('');
    } else {
      setId(dadosMedicamentos.id);
      setNomeMedicamento(dadosMedicamentos.nomeMedicamento);
      setQuantidade(dadosMedicamentos.quantidade);
      setDosagem(dadosMedicamentos.dosagem);
      setFormaFarmaceutica(dadosMedicamentos.formaFarmaceutica);
      setCategoria(dadosMedicamentos.categoria);
      setTarja(dadosMedicamentos.tarja);
      setLote(dadosMedicamentos.lote);
    }
  }

  async function salvar() {
    let data = {
      id,
      nomeMedicamento,
      quantidade,
      dosagem,
      formaFarmaceutica,
      categoria,
      tarja,
      lote,
    };

    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Medicamento ${nomeMedicamento} cadastrado com sucesso!`);
          navigate(`/listagem-medicamentos`);
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
          mensagemSucesso(`Medicamento ${nomeMedicamento} cadastrado com sucesso!`);
          navigate(`/listagem-medicamentos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);

        setId(dadosMedicamentos.id);
        setNomeMedicamento(dadosMedicamentos.nomeMedicamento);
        setQuantidade(dadosMedicamentos.quantidade);
        setDosagem(dadosMedicamentos.dosagem);
        setFormaFarmaceutica(dadosMedicamentos.formaFarmaceutica);
        setCategoria(dadosMedicamentos.categoria);
        setTarja(dadosMedicamentos.tarja);
        setLote(dadosMedicamentos.lote);
      });
    }
  }

  useEffect(() => {
    if (idParam) {
      buscar();
    }
  
    axios
      .get(`${BASE_URL}/categoriaMedicamentos`)
      .then((response) => setCategorias(response.data))
      .catch(() => mensagemErro("Erro ao carregar categorias!"));
  
    axios
      .get(`${BASE_URL}/lotes`)
      .then((response) => setLotes(response.data))
      .catch(() => mensagemErro("Erro ao carregar lotes!"));
  
  }, [idParam]);
  

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dadosMedicamentos) return null;

  return (
    <div className="container">
      <Card title="Cadastro de Medicamentos">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup
                label="Nome do Medicamento: *"
                htmlFor="inputNomeMedicamento"
              >
                <input
                  type="text"
                  id="inputNomeMedicamento"
                  value={nomeMedicamento}
                  className="form-control"
                  onChange={(e) => setNomeMedicamento(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Quantidade: *" htmlFor="inputQuantidade">
                <input
                  type="number"
                  id="inputQuantidade"
                  value={quantidade}
                  className="form-control"
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Dosagem: *" htmlFor="inputDosagem">
                <input
                  type="text"
                  id="inputDosagem"
                  value={dosagem}
                  className="form-control"
                  onChange={(e) => setDosagem(e.target.value)}
                />
              </FormGroup>

              <FormGroup
                label="Forma Farmacêutica: *"
                htmlFor="inputFormaFarmaceutica"
              >
                <input
                  type="text"
                  id="inputFormaFarmaceutica"
                  value={formaFarmaceutica}
                  className="form-control"
                  onChange={(e) => setFormaFarmaceutica(e.target.value)}
                />
              </FormGroup>

              <FormGroup
                label="Categoria: *"
                htmlFor="inputCategoriaMedicamentos"
              >
                <select
                  id="inputCategoriaMedicamentos"
                  className="form-control"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nomeCategoria}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label="Tarja: *" htmlFor="selectTarja">
                <select
                  id="selectTarja"
                  className="form-control"
                  value={tarja}
                  onChange={(e) => setTarja(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {tarjas.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label="Lote: *" htmlFor="selectLote">
                <select
                  id="selectLote"
                  className="form-control"
                  value={lote}
                  onChange={(e) => setLote(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {lotes.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.id} - {l.fornecedor}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <Stack spacing={1} padding={1} direction="row">
                <button
                  onClick={salvar} type="button" className="btn btn-success">
                  Salvar
                </button>
                <button
                  onClick={inicializar} type="button" className="btn btn-danger">
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

export default CadastroMedicamento;
