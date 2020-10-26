import React,{useState} from 'react'


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
          <input type="email" className='login-email' value={username} required={true} placeholder="Email" onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          <input type="password" className='login-password' value={pass} maxlength={8} required={true} placeholder="Password" onChange={handlePassChange} />
        </label>
      </div>

      <input type="submit" name="Login"  className="app-btn small-btn" value="Ingresar" />
    </form>
  );
}
  
export default LoginForm;
