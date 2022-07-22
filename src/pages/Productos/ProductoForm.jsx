import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";

const ProductoForm = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const [listaCategoria, setListaCategoria] = useState([])

    const [nombre, setNombre] = useState('')
    const [categoriaNombre, setCategoriaNombre] = useState(0)
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState(0)
    const [stock, setStock] = useState(0)
    const [item, setItem] = useState({})
    const [cantidad, setCantidad] = useState(0)
    var carting = []
    const [cart, setCart] = useState([]);


    function esCereza(mierda) {
        return mierda.producto === id;
    }

    const fetchCantidadAgregada = () => {
        if (localStorage.getItem('carrito').length > 0) {
            carting = JSON.parse(localStorage.getItem('carrito'))
            if (JSON.parse(localStorage.getItem('carrito')).find(esCereza) !== undefined) {
                carting = JSON.parse(localStorage.getItem('carrito'))
                const objIndex = carting.findIndex((obj) => obj.producto == parseInt(id))
                setCantidad(carting[objIndex].cantidad)
            } else {
                setCantidad(0)
            }

        } else {
            setCantidad(0)
        }
        localStorage.setItem('carrito', JSON.stringify(carting))
        console.log(JSON.parse(localStorage.getItem('carrito')))
    }

    const agregar1Producto = () => {
        if (stock !== 0) {
            if (localStorage.getItem('carrito').length > 0) {
                carting = JSON.parse(localStorage.getItem('carrito'))
                if (JSON.parse(localStorage.getItem('carrito')).find(esCereza) !== undefined) {
                    if (JSON.parse(localStorage.getItem('carrito')).find(esCereza).cantidad > stock - 1) {
                        window.confirm('No puedes agegar mas cantidad de este producto')
                        carting = JSON.parse(localStorage.getItem('carrito'))
                    } else {
                        carting = JSON.parse(localStorage.getItem('carrito'))
                        const objIndex = carting.findIndex((obj) => obj.producto == parseInt(id))
                        carting[objIndex].cantidad = carting[objIndex].cantidad + 1
                        setCantidad(carting[objIndex].cantidad)
                    }
                } else {
                    carting.push({ "producto": id, "cantidad": 1, "nombre": nombre, "precio": precio })
                    setCantidad(1)
                }

            } else {
                carting.push({ "producto": id, "cantidad": 1, "nombre": nombre, "precio": precio })
                setCantidad(1)
            }
            localStorage.setItem('carrito', JSON.stringify(carting))
            console.log(JSON.parse(localStorage.getItem('carrito')))
        } else {
            window.confirm('El stock esta vacio, no puedes agregar este producto a tu carrito')
        }

    }

    const quitar1Producto = () => {
        if (localStorage.getItem('carrito').length > 0) {
            carting = JSON.parse(localStorage.getItem('carrito'))
            if (JSON.parse(localStorage.getItem('carrito')).find(esCereza) !== undefined) {
                if (JSON.parse(localStorage.getItem('carrito')).find(esCereza).cantidad === 1) {
                    if (window.confirm('El articulo se quitara completamente del carrito')) {
                        carting = JSON.parse(localStorage.getItem('carrito'))
                        const objIndex = carting.findIndex((obj) => obj.producto == parseInt(id))
                        setCantidad(0)
                        removeFromCart(objIndex)
                    }
                } else {
                    carting = JSON.parse(localStorage.getItem('carrito'))
                    const objIndex = carting.findIndex((obj) => obj.producto == parseInt(id))
                    carting[objIndex].cantidad = carting[objIndex].cantidad - 1
                    setCantidad(carting[objIndex].cantidad)
                    localStorage.setItem('carrito', JSON.stringify(carting))
                }
            }

        }
        console.log(JSON.parse(localStorage.getItem('carrito')))
    }


    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        }
        fetchProductoDetail(id)
        fetchCantidadAgregada()

    }, [id,])

    const removeFromCart = (index) => {
        const i = Array.from(JSON.parse(localStorage.getItem('carrito')))
        i.splice(index, 1)
        localStorage.setItem('carrito', JSON.stringify(i))
    }


    const fetchProductoDetail = () => {
        axios.post(`http://127.0.0.1:8000/api/productos/getProductoById/`, { "id": id }, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
            console.log('getSingleProducto res', res.data)
            setItem(res.data)
            setNombre(res.data.nombre)
            setCategoriaNombre(res.data.categoria_nombre)
            setDescripcion(res.data.descripcion)
            setPrecio(res.data.precio)
            setStock(res.data.stock)
        }).catch((err) => {
            console.log('Error en getSingleProducto: ', err)
        })
    }

    const titulo = () => {
        if (id !== undefined) {
            return (
                <h3>Edición de Producto</h3>
            )
        } else {
            return (
                <h3>Creación de Producto</h3>
            )
        }
    }

    return (
        <Container>
            {titulo()}
            <Card className="text-center">
                <Card.Body >
                    <div>
                        <h5>Nombre del producto:</h5>
                        <p>{nombre}</p>
                    </div>
                    <div>
                        <h5>Categoria</h5>
                        <p>{categoriaNombre}</p>
                    </div>
                    <div>
                        <h5>Descripcion</h5>
                        <p>{descripcion}</p>
                    </div>
                    <div>
                        <h5>Precio</h5>
                        <p>{precio} $</p>
                    </div>
                    <div>
                        <h5>Unidades en Stock</h5>
                        <p>{stock}</p>
                    </div>
                    <Button className='btn btn-success' onClick={() => agregar1Producto()}>Agregar 1 unidad al carrito</Button>
                    <Button className='btn btn-danger' onClick={() => quitar1Producto()}>Quitar 1 unidad al carrito</Button>
                    <div>
                        <h5>Cantidad Agregada</h5>
                        <p>{cantidad}</p>
                    </div>
                </Card.Body>
            </Card>
        </Container>

    );
}

export default ProductoForm;