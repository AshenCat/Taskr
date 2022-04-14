import React from 'react';
import './select.scss';

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    id?: string;
}

function Select(props: ISelectProps) {
  return (
    <select 
        className={`custom-select ${props.className ?? ''}`}
        {...props}>
            {props.children}
    </select>
  )
}

export const Option = (props: React.OptionHTMLAttributes<HTMLOptionElement>) => {
  return <option className={`custom-option ${props.className ?? ''}`}>
    {props.children}
  </option>
}

export default Select