import './Producto.css';

function Producto(props) {
    return (
        <div className='producto-container'>
            <img className='producto-imagen' src={props.data.image} alt={props.data.name}></img>
            <h5 className='producto-nombre'>{props.data.name} </h5>
            <p className='producto-precio'>{ parseInt(props.data.price, 10).toLocaleString('es-CO', {style: 'currency', currency: 'COP'})} </p>
        </div>
    )
}

export default Producto;
