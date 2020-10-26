import ReactDOM from 'react-dom';
import React,{ Component , useState} from 'react'


const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [avatar, setAvatar] = useState(0);
  const avatars = ["Harry","Ron","Hermione","Snape","Draco","Lucius","Umbridge","Voldemort"]

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePassChange = (event) => {
    setPass(event.target.value);
  }

  const handleSubmit = (event) => {
    alert('Datos Ingresados:' +
          '\nEmail: ' + email +
          '\nNombre de Usuario: ' + username +
          '\nContraseña: ' + pass +
          '\nAvatarID:' + avatar +
          '\nCreation Date:\n' + new Date());
    event.preventDefault();
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input type="email" value={email} required="true" onChange={handleEmailChange} />
          </label>
        </div>
        <div>
          <label>
            Nombre de Usuario:
            <input type="text" value={username} required="true" onChange={handleNameChange} />
          </label>
        </div>
        <div>
          <label>
            Contraseña:
            <input type="password" maxlength="8" required="true" value={pass} onChange={handlePassChange} />
          </label>
        </div>
        <div>
          Avatar: {avatars[avatar]}
        </div>

        <input type="submit" value="¡Regístrate!" />
      </form>
      <div>
        <button className="harry" onClick={() => setAvatar(0)} />
        <button className="ron" onClick={() => setAvatar(1)} />
        <button className="hermione" onClick={() => setAvatar(2)} />
        <button className="snape" onClick={() => setAvatar(3)} />
        <button className="draco" onClick={() => setAvatar(4)} />
        <button className="lucius" onClick={() => setAvatar(5)} />
        <button className="umbridge" onClick={() => setAvatar(6)} />
        <button className="voldemort" onClick={() => setAvatar(7)} />
      </div>
    </div>
  );
}
  
export default RegisterForm;
