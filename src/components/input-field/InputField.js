import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './InputField.css';

function InputField(props) {
    return(
        <div className='form-control' >
            <div className='campo-container'>
                <div className='etiqueta'>
                    <label htmlFor={props.nombre}>
                        <FontAwesomeIcon icon={props.icono} color='white' />
                    </label>
                </div>
                {
                    (props.nombre === 'colonia' && props.valor.length > 1 ) ?
                    <select className='campo'
                        placeholder={props.placeholder} 
                        name='coloniaElegida' 
                        id={props.nombre}
                        value={props.coloniaElegida}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                    >
                        {
                            props.valor.map((opcion, index) => {
                                return <option className='campo' key={index} value={opcion}>{opcion}</option>
                            })
                        }
                    </select>
                    :
                    <input className='campo' type='text' 
                        placeholder={props.placeholder} 
                        name={props.nombre} 
                        id={props.nombre}
                        value={props.valor}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                    />

                }
            </div>
            <p className='error'>{props.error}</p>
        </div>

    );
}

export default InputField;
