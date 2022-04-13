import React from 'react'
import './button.scss'

interface IBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    show?: boolean;
}

function Button(props: IBtnProps) {
  return (
    <button {...props} className={`custom-button ${props.className ?? ''}`}>{props.children}</button>
  )
}

export default Button