import React, { Component } from 'react';
import '../App.css';
import Header from './shared/Header';
import Footer from './shared/Footer';
import Sidebar from './shared/Sidebar';
import axios from 'axios';

class Acoes extends Component{

  state = {
    acoes: []
  }

  componentDidMount(){
    this.lista()
  }

  novo = () => {
    this.props.history.push("/acoes/novo")
  }

  excluir = (acao) => {
    if(window.confirm("Confirma exclusão?")){
      axios.create({
        baseURL: `http://localhost:3000/acoes/${acao._id}.json`,
        headers: {'token': '123456'}
      }).delete().then((res) => {
        this.lista()
      })
    }
  }

  alterar = (acao) => {
    this.props.history.push(`/acoes/${acao._id}/editar`)
  }

  lista = () => {
    axios.create({
      baseURL: 'http://localhost:3000/acoes.json',
      headers: {'token': '123456'}
    }).get().then((res) => {
      this.setState({ acoes: res.data });
    })
  }

  render(){
    return (
      <div>
        <div className="App" id="wrapper">
          <Sidebar></Sidebar>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header></Header>
              <div className="container-fluid alinhamento-esquerda">
                <h1>Ações Million</h1>
                <button onClick={this.novo} className="btn btn-primary">Novo</button>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Empresa</th>
                      <th scope="col">Taxa</th>
                      <th scope="col">Tipo</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.acoes.map((acao, index) => (
                        <tr key={index}>
                          <td>{acao.cod_empresa}</td>
                          <td>{acao.nome_empresa}</td>
                          <td>{acao.taxa_juros}</td>
                          <td>{acao.tipo}</td>
                          <td>
                            <button onClick={() => { this.alterar(acao) }} className="btn btn-warning">Editar</button>
                          </td>
                          <td>
                            <button onClick={() => { this.excluir(acao) }} className="btn btn-danger">Excluir</button>
                          </td>
                        </tr>
                       ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Acoes;
