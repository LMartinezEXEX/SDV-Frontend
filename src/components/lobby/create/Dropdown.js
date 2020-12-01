import React, {useState} from 'react'
import '../../../assets/css/dropdown.css'

const Dropdown = (label, defaultState, options) => {
    const [state, setState] = useState(defaultState);
    const Dropdownmaker = () => (
      <label htmlFor={label}>
        {label}
            <select 
                id={label}
                value={state}
                onChange={e=>setState(e.target.value)}
                onBlur={e=>setState(e.target.value)}
                disabled={!options.length}
            >
            <option> </option>
                {options.map(item=>
                <option key={item} value={item}>{item}</option>)}
          </select>
    </label>
    );
    return [state, Dropdownmaker, setState]
}
export default Dropdown