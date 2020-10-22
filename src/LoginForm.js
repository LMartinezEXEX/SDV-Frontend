import React from "react";
import { Field, reduxForm } from "redux-form";

const LoginForm = ({ handleSubmit, pristine, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={pristine || submitting}>
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "login" // a unique identifier for this form
})(LoginForm);
