import React from 'react';

const Input = ({attribute, handleChange, param}) => {
    return (
        <div>
            <input 
                id = {attribute.id}
                name = {attribute.name}
                placeholder = {attribute.placeholder}
                type = {attribute.type}
                required = {attribute.required}
                onChange = { (e) => handleChange(e.target.name, e.target.value) }
                className = {param ? 'input-error' : 'login-style' }  //pasar una clase de manera dinámica
            />
        </div>
    )
}

export default Input;
