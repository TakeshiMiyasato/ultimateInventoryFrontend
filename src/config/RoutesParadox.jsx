import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoriaList from '../pages/Categorias/CategoriaList';
import DetalleVentaList from '../pages/DetallesVenta/DetalleVentaList';
import ProductoForm from '../pages/Productos/ProductoForm';
import ProductoList from '../pages/Productos/ProductoList';
import LoginForm from '../pages/RegisterLogin/LoginForm';
import RegisterForm from '../pages/RegisterLogin/RegisterForm';
import VentaCreate from '../pages/Ventas/VentaCreate';
import VentaForm from '../pages/Ventas/VentaForm';
import VentaList from '../pages/Ventas/VentaList';

const RoutesParadox = () => {
    return (
            <Routes>
                <Route path='/' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm/>}/>
                <Route path='/categorias' element={<CategoriaList/>}/>
                <Route path='/productos' element={<ProductoList/>}/>
                <Route path='/productosByCategoria/:id' element={<ProductoList/>}/>
                <Route path='/ventas' element={<VentaList/>}/>
                <Route path='/detalleVenta/:id' element={<DetalleVentaList/>}/>
                <Route path='/crearVenta' element={<VentaCreate/>}/>
                <Route path='/formVenta/:id' element={<VentaForm/>}/>
                <Route path='/formProducto/:id' element={<ProductoForm/>}/>
            </Routes>

    );
}

export default RoutesParadox;