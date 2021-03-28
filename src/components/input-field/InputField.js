import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './InputField.css';

function InputField(props) {
    return(
        <div className='campo-container'>
            <div className='etiqueta'>
                <label htmlFor={props.nombre}>
                    <FontAwesomeIcon icon={props.icono} color='white' />
                </label>
            </div>
            <input className='campo' type='text' placeholder={props.placeholder} name={props.nombre} />
        </div>
    );
}

export default InputField;
