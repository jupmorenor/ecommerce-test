import React, { useState } from 'react';
import Producto from '../producto/Producto';
import './Carrito.css'

function Carrito() {
    const [productos, actualizarProductos] = useState([]);
    var subtotal = 0;

    fetch('https://blackisp.herokuapp.com/products').then(
        response => response.json()
    ).then(datos => {
        actualizarProductos(datos);
    }).catch(error => alert('Error al cargar los productos')); 
     

    return (
        <div className='carrito-compras'>
            <header className='carrito-header'>RESUMEN DE LA ORDEN</header>
            
            {
                productos.map((producto, index) => {
                    subtotal += parseInt(producto.price, 10);
                    return <Producto key={index} data={producto} />
                })
            }
            <div className='boton-carrito-container'>
                <button className='boton-carrito' type='button'>EDITAR</button>
            </div>
            <div className='subtotal'>
                <p>SUBTOTAL</p>
                <p>{subtotal.toLocaleString('es-CO', {style: 'currency', currency: 'COP'})}</p>
                <p>ENVIO</p>
                <p>A calcular</p>
            </div>
            <div className='total'>
                <p>TOTAL</p>
                <p>{subtotal.toLocaleString('es-CO', {style: 'currency', currency: 'COP'})}</p>
            </div>
        </div>
    )
}

export default Carrito;
