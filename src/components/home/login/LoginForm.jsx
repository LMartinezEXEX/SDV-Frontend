import ReactDOM from 'react-dom';
import React,{ Component , useState} from 'react'


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePassChange = (event) => {
    setPass(event.target.value);
  }

  const handleSubmit = (event) => {
    alert('Datos Ingresados:' +
          '\nNombre de Usuario: ' + username +
          '\nContraseña: ' + pass);
    event.preventDefault();
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nombre de Usuario:
          <input type="text" value={username} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          Contraseña:
          <input type="password" value={pass} onChange={handlePassChange} />
        </label>
      </div>

      <input type="submit" value="Ingresar" />
    </form>
  );
}
  
export default LoginForm;
