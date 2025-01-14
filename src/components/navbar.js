import React from "react";
import "bootswatch/dist/flatly/bootstrap.css";

import NavbarItem from "./navbarItem";

function Navbar(props) {
  return (
<<<<<<< HEAD
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
        <a href="/" className="navbar-brand">
          SGH
        </a>
=======
    <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          SGH
        </a> 
>>>>>>> cfe5ef7a63be80941d0248afcbfdddcbc42b9ce8
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
<<<<<<< HEAD
        <ul className="navbar-nav">
          <NavbarItem
            render="true"
            href="/listagem-funcionarios"
            label="Funcionários"
          />
        </ul>
        <ul className="navbar-nav">
          <NavbarItem
            render="true"
            href="/listagem-tiposFuncionarios"
            label="Tipos de Funcionarios"
          />
        </ul>
        <ul className="navbar-nav">
          <NavbarItem
            render="true"
            href="/listagem-pacientes"
            label="Pacientes"
          />
        </ul>
        <ul className="navbar-nav">
          <NavbarItem
            render="true"
            href="/listagem-responsavelLegal"
            label="Responsável Legal"
          />
        </ul>
        <ul className="navbar-nav">
          <NavbarItem
            render="true"
            href="/listagem-prontuarios"
            label="Prontuários"
          />
        </ul>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
=======
        <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-funcionarios'
              label='Funcionários'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-tiposFuncionarios'
              label='Tipos de Funcionarios'
            />
          </ul>
        <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-pacientes'
              label='Pacientes'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-responsavelLegal'
              label='Responsável Legal'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-prontuarios'
              label='Prontuários'
            />
          </ul>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
>>>>>>> cfe5ef7a63be80941d0248afcbfdddcbc42b9ce8
            <NavbarItem
              render="true"
              href="/listagem-medicamentos"
              label="Medicamentos"
            />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem render="true" href="/listagem-lotes" label="Lotes" />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-categoriaMedicamentos"
              label="Categoria de Medicamentos"
            />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-funcionarios"
              label="Funcionarios"
            />
            <NavbarItem href="/listagem-agendamentos" label="Agendamentos" />
          </ul>
<<<<<<< HEAD
          <ul className="navbar-nav">
            <NavbarItem render="true" href="/login" label="Entrar" />
=======
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-agendamentos'
              label='Agendamentos'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/login' label='Entrar' />
>>>>>>> cfe5ef7a63be80941d0248afcbfdddcbc42b9ce8
          </ul>
          <ul className="navbar-nav">
            <NavbarItem render="true" href="/" label="Sair" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;