import React from "react";
import { Field, reduxForm } from "redux-form";

const LoginForm = ({ handleSubmit, pristine, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>E-mail</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <label>Nombre de Usuario</label>
        <div>
          <Field
            name="nombre"
            component="input"
            type="text"
            placeholder="Nombre"
          />
        </div>
      </div>
      <div>
        <label>Contraseña</label>
        <div>
          <Field
            name="contraseña"
            component="input"
            type="password"
            placeholder="contraseña"
          />
        </div>
      </div>
      <div>
        <label>Foto</label>
        <div>
          <Field
            name="foto"
            component="input"
            type='file'
            accept='.jpg, .png, .jpeg'
            placeholder="Foto"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Registrarse
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "register" // a unique identifier for this form
})(LoginForm);
