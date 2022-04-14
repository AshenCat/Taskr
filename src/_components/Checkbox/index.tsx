import React from 'react'

interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    key?: string
}

function Checkbox(props: ICheckboxProps) {
  return (
    <input {...props} className={`${props.className || ''} custom-checkbox`} type='checkbox' />
  )
}

export default Checkbox