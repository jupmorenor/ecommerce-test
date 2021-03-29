import React, { Component } from 'react';
import InputField from '../input-field/InputField';
import { 
    faUser, 
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faMapMarkedAlt,
} from '@fortawesome/free-solid-svg-icons';
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

    constructor() {
        super();
        this.state = {
            nombre: '',
            apellidos: '',
            correo: '',
            telefono: '',
            postal: '',
            colonia: [],
            coloniaElegida: '',
            estado: '',
            ciudad: '',
            municipio: '',
            calle: '',
            facturacion: false,
            touched: {
                nombre: false,
                apellidos: false,
                correo: false,
                telefono: false,
                calle: false,
                postal: false,
            }
        }
        this.submitForm = this.submitForm.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    submitForm(event) {
        const errores = this.validarCampos();
        if (errores.nombre === '' && errores.apellidos === '' && errores.correo === '' 
            && errores.telefono === '' && errores.calle === '' && errores.postal === '' 
            && this.state.touched.nombre && this.state.touched.apellidos && this.state.touched.correo
            && this.state.touched.telefono && this.state.touched.calle && this.state.touched.postal){
                const requestOptions  = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nombre: this.state.nombre,
                        apellidos: this.state.apellidos,
                        correo: this.state.correo,
                        telefono: this.state.telefono,
                        postal: this.state.postal,
                        colonia: this.state.coloniaElegida,
                        estado: this.state.estado,
                        ciudad: this.state.ciudad,
                        municipio: this.state.municipio,
                        calle: this.state.calle,
                        facturacion: this.state.facturacion,
                    })
                }
                fetch('https://blackisp.herokuapp.com/contact', requestOptions).then(
                    alert('El formulario se ha enviado con éxito')
                ).catch(
                    error => alert('Error enviando los datos del formulario')
                );
        } else {
            event.preventDefault();
            alert('El formulario se encuentra incompleto');
        }
    }

    inputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })

        if (name === 'postal' && value.length === 5) {
            fetch('https://blackisp.herokuapp.com/postalCodes/' + value).then(
                response => response.json()                    
            ).then(data => {
                if (Object.keys(data).length > 0) {
                    this.setState({
                        estado: data['state'],
                        ciudad: data['city'],
                        municipio: data['town'],
                        colonia: data['colonies'],
                    })
                } else {
                    this.setState({
                        coloniaElegida: '',
                        estado: '',
                        ciudad: '',
                        municipio: '',
                        colonia: [],
                    })
                }
            }).catch(error => {
                alert('Error obteniendo los datos de ubicación')
            })
        } else if (name === 'postal' && value.length !== 5) {
            this.setState({
                coloniaElegida: '',
                estado: '',
                ciudad: '',
                municipio: '',
                colonia: [],
            });
        }
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validarCampos() {
        const errores = {
            nombre: '',
            apellidos: '',
            correo: '',
            telefono: '',
            calle: '',
            postal: '',
        }

        if (this.state.touched.nombre && this.state.nombre.length < 3) {
            errores.nombre = 'El nombre debe ser mas largo'
        } else if (this.state.touched.nombre && this.state.nombre.length > 15) {
            errores.nombre = 'El nombre es muy largo'
        }
        
        if (this.state.touched.apellidos && this.state.apellidos.length < 3) {
            errores.apellidos = 'El apellido debe ser mas largo'
        } else if (this.state.touched.apellidos && this.state.apellidos.length > 15) {
            errores.apellidos = 'El apellido es muy largo'
        }

        if (this.state.touched.correo && this.state.correo.split('').filter(x => x === '@').length !== 1) {
            errores.correo = 'Debe contener @'
        }

        const regexp = /^\d+$/;
        if (this.state.touched.telefono && !regexp.test(this.state.telefono) && this.state.telefono.length < 7) {
            errores.telefono = 'Numero telefónico invalido'
        }

        if (this.state.touched.calle && this.state.calle.length < 3) {
            errores.calle = 'La dirección de la calle debe ser mas larga'
        } else if (this.state.touched.calle && this.state.calle.length > 15) {
            errores.calle = 'La dirección de la calle es muy larga'
        }

        if (this.state.touched.postal && this.state.postal.length !== 5) {
            errores.postal = 'Código postal inválido'
        }
        return errores;
    }

    render() {
        const errores = this.validarCampos();

        return(
            <>
            <header className="App-header">
                <h1>DIRECCIÓN DE ENVÍO</h1>
            </header>
            <form onSubmit={this.submitForm} >
            <div className='container'>
                {
                    formulario.map((campo, index) => {
                        return <InputField key={index} 
                            nombre={campo.nombre} 
                            icono={campo.icono}
                            coloniaElegida={this.state.coloniaElegida} 
                            placeholder={campo.placeholder}
                            valor={this.state[campo.nombre]}
                            error={errores[campo.nombre]}
                            onChange={this.inputChange}
                            onBlur={this.handleBlur(campo.nombre)}
                        />
                    })
                }
                <div className='boton-container'>
                    <button className='boton font-class' type='button'>Libreta de direcciones</button>
                    <button className='boton font-class' type='submit'>Guardar</button>
                </div>
                <label className='font-class' ><input type='checkbox' name='facturacion' onChange={this.inputChange} /> Utilizar como dirección de facturación</label>
            </div>
            </form>
            </>
        );
    }
}

export default Menu;
