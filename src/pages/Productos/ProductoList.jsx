import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, Link, useParams } from "react-router-dom";

const ProductoList = () => {

    const { id } = useParams()

    const [listaProductos, setListaProductos] = useState([])
    const [categoriaNombre, setCategoriaNombre] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('id') != null) {
            if(id !== undefined){
                fetchProductoListByCategoria()
            } else {
                fetchProductoList()
            }
        } else {
            navigate('/')
        }
    }, [])

    const fetchProductoList = () => {
        axios.get('http://127.0.0.1:8000/api/productos/getAllProductos/', {
            headers: { 'Authorization': `token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getAllProductos res', res.data)
            setListaProductos(res.data)
        }).catch((err) => {
            console.log('error al llamar getAllProductos: ', err)
        })
    }

    const fetchProductoListByCategoria = () => {
        axios.post('http://127.0.0.1:8000/api/productos/getProductosByCategoria/',{"id": id}, {
            headers: { 'Authorization': `token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getAllProductos res', res.data)
            setListaProductos(res.data)
            setCategoriaNombre(res.data[0].categoria_nombre)
        }).catch((err) => {
            console.log('error al llamar getAllProductos: ', err)
        })
    }

    const titulo = () => {
        if(id !== undefined){
            return (
                <h3>Lista Productos por categoria: {categoriaNombre}</h3>
            )
        } else {
            return (
                <h3>Lista Productos</h3>
            )
        }
    }

    return (
        <Container>
            {titulo()}
            <Card>
                <Card.Body>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Categoria</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaProductos.map(producto =>
                                <tr key={"producto-" + producto.id}>
                                    <td><h4>{producto.id}</h4></td>
                                    <td><h4>{producto.nombre}</h4></td>
                                    <td><h4>{producto.precio} $</h4></td>
                                    <td><h4>{producto.categoria_nombre}</h4></td>
                                    <td><Link to={`/formProducto/${producto.id}`} className='btn btn-info'>Ver Detalles</Link></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>

    );
}

export default ProductoList;