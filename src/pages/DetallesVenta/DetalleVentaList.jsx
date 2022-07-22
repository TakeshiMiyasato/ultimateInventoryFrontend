import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Card ,Form } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const DetalleVentaList = () => {
    const { id } = useParams()
    const [detalleVentaList, setDetalleVentaList] = useState([])
    const navigate = useNavigate()

    const [nit_factura, setNit_factura] = useState(0)
    const [nombre_factura, setNombre_factura] = useState('')
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        } if (id !== undefined) {
            fetchDetalleVentaList(id)
        } else if (id === undefined) {
            thisIsWhereTheFunBegins()
        }
        fetchDetalleVentaList(id)
    }, [id])

    const precioParcial = (precio, cantidad) =>{
        setTotal(total + (precio * cantidad))
        return precio * cantidad
    }

    const thisIsWhereTheFunBegins = () => {
        if (localStorage.getItem('carrito').length > 0) {
            return (
                <Container>
                    <h3>Venta</h3>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Label><h5>Nombre en Factura</h5></Form.Label>
                                <Form.Control placeholder='Sin Nombre' value={nombre_factura} onChange={(e) => {
                                    setNombre_factura(e.target.value)
                                }} />
                                <Form.Label><h5>Nit Factura</h5></Form.Label>
                                <Form.Control placeholder='Sin Nit' value={nit_factura} onChange={(e) => {
                                    setNit_factura(e.target.value)
                                }} />
                                <br />
                            </Form>
                            <h4 style={{ marginLeft: 'auto', marginRight: 'auto' }}>Detalle de ventas</h4>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio parcial</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {JSON.parse(localStorage.getItem('carrito')).map(detalleVenta =>
                                        <tr key={"detalleVenta-" + detalleVenta.producto}>
                                            <td><h4>{detalleVenta.producto}</h4></td>
                                            <td><h4>{detalleVenta.nombre}</h4></td>
                                            <td><h4>{detalleVenta.cantidad}</h4></td>
                                            <td><h4>{precioParcial(detalleVenta.cantidad, detalleVenta.precio)} $</h4></td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Container>
            )
        }
    }

    const fetchDetalleVentaList = (id) => {
        axios.post(`http://127.0.0.1:8000/api/detalleVentas/getDetalleVentasByVenta/`, {
            "idVenta": id
        }, {
            headers: { 'Authorization': `token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getDetalleVenta res', res.data)
            setDetalleVentaList(res.data)
        }).catch((err) => {
            console.log('Error en getDetalleVenta: ', err)
        })
    }


    return (
        <Container>
            <Card>
                <Card.Body>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio del Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detalleVentaList.map(detalleVenta =>
                                <tr key={"detalleVenta-" + detalleVenta.id}>
                                    <td><h4>{detalleVenta.id}</h4></td>
                                    <td><h4>{detalleVenta.producto_nombre}</h4></td>
                                    <td><h4>{detalleVenta.cantidad}</h4></td>
                                    <td><h4>{detalleVenta.precioVenta} $</h4></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>


    );
}

export default DetalleVentaList;