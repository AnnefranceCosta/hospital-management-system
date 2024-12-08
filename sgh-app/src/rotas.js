import React from 'react';
import ListagemMedicamentos from './views/listagem-medicamentos';
import Login from './views/login';
import CadastroMedicamentos from './views/cadastro-medicamentos';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro-medicamentos/:idParam?' element={<CadastroMedicamentos />} />
        <Route path='/listagem-medicamentos' element={<ListagemMedicamentos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
