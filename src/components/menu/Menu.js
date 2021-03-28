import React, { Component } from 'react';
import InputField from '../input-field/InputField';
import { 
    faUser, 
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faMapMarkedAlt,
} from '@fortawesome/free-solid-svg-icons'
import './Menu.css';


const formulario = [
    {
        nombre: 'nombre',
        placeholder: 'Nombre',
        icono: faUser,
    },
    {
        nombre: 'apellidos',
        placeholder: 'Apellidos',
        icono: faUser,
    },
    {
        nombre: 'correo',
        placeholder: 'Correo Electrónico',
        icono: faEnvelope,
    },
    {
        nombre: 'telefono',
        placeholder: 'Número de teléfono',
        icono: faPhone,
    },
    {
        nombre: 'postal',
        placeholder: 'Código postal',
        icono: faMapMarkerAlt,
    },
    {
        nombre: 'colonia',
        placeholder: 'Colonia',
        icono: faMapMarkerAlt,
    },
    {
        nombre: 'estado',
        placeholder: 'Estado/Región',
        icono: faMapMarkerAlt,
    },
    {
        nombre: 'ciudad',
        placeholder: 'Ciudad',
        icono: faMapMarkerAlt,
    },
    {
        nombre: 'municipio',
        placeholder: 'Delegación o municipio',
        icono: faMapMarkerAlt,
    },
    {
        nombre: 'calle',
        placeholder: 'Calle',
        icono: faMapMarkedAlt,
    },

]

class Menu extends Component {


    render() {
        return(
            <div className='container'>
                {
                    formulario.map((campo, index) => {
                        return <InputField key={index} nombre={campo.nombre} icono={campo.icono} placeholder={campo.placeholder} />
                    })
                }
                <div className='boton-container'>
                    <button className='boton' type='button'>Libreta de direcciones</button>
                    <button className='boton' type='button'>Guardar</button>
                </div>
            </div>
        );
    }
}

export default Menu;
