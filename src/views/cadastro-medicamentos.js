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

  // Estados para os campos do formulário
  const [id, setId] = useState("");
  const [nomeMedicamento, setNomeMedicamento] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [dosagem, setDosagem] = useState("");
  const [formaFarmaceutica, setFormaFarmaceutica] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tarja, setTarja] = useState("");
  const [lote, setLote] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [tarjas, setTarjas] = useState(["Branca", "Vermelha", "Preta"]);
  const [lotes, setLotes] = useState([]);

  function inicializar() {
    if (!idParam) {
      setId("");
      setNomeMedicamento("");
      setQuantidade(0);
      setDosagem("");
      setFormaFarmaceutica("");
      setCategoria("");
      setTarja("");
      setLote("");
    }
  }

  async function salvar() {
    const data = JSON.stringify({
      id,
      nomeMedicamento,
      quantidade,
      dosagem,
      formaFarmaceutica,
      categoria,
      tarja,
      lote,
    });

    try {
      if (!idParam) {
        await axios.post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(
          `Medicamento ${nomeMedicamento} cadastrado com sucesso!`
        );
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(
          `Medicamento ${nomeMedicamento} alterado com sucesso!`
        );
      }
      navigate(`/listagem-medicamentos`);
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar medicamento!");
    }
  }

  async function buscar() {
    try {
      const { data } = await axios.get(`${baseURL}/${idParam}`);
      setId(data.id);
      setNomeMedicamento(data.nomeMedicamento);
      setQuantidade(data.quantidade);
      setDosagem(data.dosagem);
      setFormaFarmaceutica(data.formaFarmaceutica);
      setCategoria(data.categoria);
      setTarja(data.tarja);
      setLote(data.lote);
    } catch (error) {
      mensagemErro("Erro ao buscar medicamento!");
    }
  }

  useEffect(() => {
    if (idParam) buscar();

    // Carregar categorias e lotes
    axios
      .get(`${BASE_URL}/categoriaMedicamentos`)
      .then((response) => setCategorias(response.data))
      .catch(() => mensagemErro("Erro ao carregar categorias!"));

    axios
      .get(`${BASE_URL}/lotes`)
      .then((response) => setLotes(response.data))
      .catch(() => mensagemErro("Erro ao carregar lotes!"));
  }, [idParam]);

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
                  onClick={salvar}
                  type="button"
                  className="btn btn-success"
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type="button"
                  className="btn btn-danger"
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

export default CadastroMedicamento;
