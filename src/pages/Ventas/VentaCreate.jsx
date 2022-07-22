import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Card, Form } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const VentaCreate = () => {
    const { id } = useParams()
    const [detalleVentaList, setDetalleVentaList] = useState([])
    const navigate = useNavigate()

    const [nit_factura, setNit_factura] = useState(0)
    const [nombre_factura, setNombre_factura] = useState('')
    var total = 0

    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        }
    }, [])

    const precioParcial = (precio, cantidad) => {
        total = total + (precio * cantidad)
        return precio * cantidad
    }

    const crearVenta =() =>{
        const params = {
            "detallesVentas": JSON.parse(localStorage.getItem('carrito')),
            "venta": {
                nombre_factura,
                nit_factura,
                "usuario": localStorage.getItem('id')
            }
        }

        axios.post('http://127.0.0.1:8000/api/ventas/createVenta/', params, {
            headers: { 'Authorization': `token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('postVenta res', res.data)
            localStorage.setItem('carrito', [])
            navigate('/')
        }).catch((err) => {
            console.log('error postVenta: ', err)
            window.confirm(err.Exception)
        })
    }

    const thisIsWhereTheFunBegins = () => {
        if (localStorage.getItem('carrito').length > 2) {
            return (
                <div>
                    <h3>Compra</h3>
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
                            <h4 style={{ marginLeft: 'auto', marginRight: 'auto' }}>Detalle de la compra</h4>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio parcial</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from(JSON.parse(localStorage.getItem('carrito'))).map(detalleVenta =>
                                        <tr key={"detalleVenta-" + detalleVenta.producto}>
                                            <td><h4>{detalleVenta.producto}</h4></td>
                                            <td><h4>{detalleVenta.nombre}</h4></td>
                                            <td><h4>{detalleVenta.cantidad}</h4></td>
                                            <td><h4>{precioParcial(detalleVenta.cantidad, detalleVenta.precio)} $</h4></td>
                                            <td><Link to={`/formProducto/${detalleVenta.producto}`} className='btn btn-info'>Ver Detalles</Link></td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            <h2 style={{color: 'green'}}>Total: {total} $</h2>
                            <Button className='btn btn-success' onClick={() => crearVenta()}>Generar Compra</Button>
                        </Card.Body>
                    </Card>
                </div>
            )
        } else  {
            return(
                <div style={{textAlign: 'center'}}><h1>Que vas a comprar?, no tienes nada en tu carrito de compras</h1></div>
            )
        }
    }


    return (
        <Container>
            <div>
                {thisIsWhereTheFunBegins()}
            </div>

        </Container>

    );
}
export default VentaCreate;