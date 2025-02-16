import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/card";
import { mensagemSucesso, mensagemErro } from "../components/toastr";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { BASE_URL2 } from "../config/axios";

const ListagemSetores = () => {
  const navigate = useNavigate();
  const baseURL = `${BASE_URL2}/setores`;

  const [setores, setSetores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const carregarSetores = async () => {
    try {
      const response = await axios.get(baseURL);
      setSetores(response.data);
      setIsLoading(false);
    } catch (error) {
      mensagemErro("Erro ao carregar setores.");
      setIsLoading(false);
    }
  };

  const cadastrar = () => {
    navigate(`/cadastro-setores`);
  };

  const editar = (id) => {
    navigate(`/cadastro-setores/${id}`);
  };

  const excluir = async (id) => {
    const confirmarExclusao = window.confirm(
      "Deseja realmente excluir este setor?"
    );
    if (!confirmarExclusao) return;

    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso("Setor excluído com sucesso!");
      setSetores(setores.filter((setor) => setor.id !== id));
    } catch (error) {
      mensagemErro("Erro ao excluir o setor.");
    }
  };

  useEffect(() => {
    carregarSetores();
  }, []);

  if (isLoading) return <p>Carregando setores...</p>;

  return (
    <div className="container">
      <Card title="Listagem de Setores">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning "
                onClick={cadastrar}
              >
                Novo Setor
              </button>
              {setores.length > 0 ? (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Nome do Setor</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {setores.map((setor) => (
                      <tr key={setor.id}>
                        <td>{setor.nomeSetor}</td>
                        <td>{setor.descricao}</td>
                        <td>
                          <Stack spacing={1} direction="row">
                            <IconButton
                              aria-label="edit"
                              onClick={() => editar(setor.id)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => excluir(setor.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Nenhum setor encontrado.</p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ListagemSetores;
