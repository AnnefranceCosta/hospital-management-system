import React from 'react';
import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import '../custom.css';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material'; 
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete'; 

function ListagemMedicamentos() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-medicamentos`);
  };

  const editar = (id) => {
    navigate(`/cadastro-medicamentos/${id}`);
  };

  const [dados, setDados] = React.useState([]);
  const [selectedTarja, setSelectedTarja] = React.useState('');

  
  const excluir = async (id) => {
    try {
      // let url = `${baseURL}/${id}`;
      // await axios.delete(url);
      mensagemSucesso(`Medicamento excluído com sucesso!`);
      setDados(dados.filter((dado) => dado.id !== id));
    } catch (error) {
      mensagemErro(`Erro ao excluir o medicamento`);
    }
  };

  React.useEffect(() => {
    // axios.get(baseURL).then((response) => {
    //   setDados(response.data);
    // });
  }, []);

  if (dados.length === 0) {
    return (
      <div className='container'>
        <Card title='Listagem de Medicamentos'>
          <p>Não há medicamentos cadastrados.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className='container'>
      <Card title='Listagem de Medicamentos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={cadastrar}
              >
                Novo Medicamento
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome do Medicamento</th>
                    <th scope='col'>Número de Identificação</th>
                    <th scope='col'>Dosagem</th>
                    <th scope='col'>Tarja</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td> {}
                      <td>{dado.dosagem}</td> {}
                      <td>
                        <FormControl fullWidth>
                          <InputLabel>Tarja</InputLabel>
                          <Select
                            value={selectedTarja || dado.tarja}
                            onChange={(e) => setSelectedTarja(e.target.value)}
                            label="Tarja"
                          >
                            <MenuItem value="Sim">Sim</MenuItem>
                            <MenuItem value="Não">Não</MenuItem>
                          </Select>
                        </FormControl>
                      </td>
                      <td>{dado.id}</td> {}
                      <td>
                        <Stack spacing={1} direction='row'>
                          <IconButton
                            aria-label='editar'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='excluir'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemMedicamentos;
