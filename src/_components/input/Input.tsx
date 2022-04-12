import React from 'react'
import './input.scss'

interface MyButtonProps extends React.InputHTMLAttributes<HTMLInputElement>{
    show?: boolean;
}

function Input(props: MyButtonProps) {
  return (
    <input className='custom-input' {...props} />
  )
}

export default Input