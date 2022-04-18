import React from 'react'
import './checkbox.scss'
interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  _id?: string;
}

function Checkbox(props: ICheckboxProps) {
  return (
    <input {...props} className={`${props.className || ''} custom-checkbox`} type='checkbox' />
  )
}

export default Checkbox