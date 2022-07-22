import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";

const CategoriaList = () => {

    const [listaCategorias, setListaCategorias] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('id') != null) {
            fetchCategoriaList()
        } else {
            navigate('/')
        }
    }, [])

    const fetchCategoriaList = () => {
        axios.get('http://127.0.0.1:8000/api/categorias/getAllCategorias/', {
            headers: { 'Authorization': `token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getAllCategorias res', res.data)
            setListaCategorias(res.data)
        }).catch((err) => {
            console.log('error al llamar getAllCategorias: ', err)
        })
    }

    return (
        <Container>
            <h3>Lista de Categoria</h3>
            <Card>
                <Card.Body>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaCategorias.map(categoria =>
                                <tr key={"categoria-" + categoria.id}>
                                    <td><h4>{categoria.id}</h4></td>
                                    <td><h4><Link to={`/productosByCategoria/${categoria.id}`}>{categoria.nombre}</Link></h4></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>

    );
}

export default CategoriaList;