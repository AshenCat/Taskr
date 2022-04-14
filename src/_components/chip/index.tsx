import React from 'react'
import { VscClose } from 'react-icons/vsc';
import './chip.scss'

interface IChipProps {
    variant?: string,
    name: string,
    closeAction?: ()=>void
}

function Chip(props: IChipProps) {
    const {variant, name, closeAction} = props;
    return (
      <div className={`chip ${variant ?? ''} ${!!closeAction && 'with-button'}`}>
        <span>{name}</span>
        {closeAction && <div 
          className='chip-action-button' 
          onClick={closeAction} 
          role="button" 
          tabIndex={0}>
            <VscClose />
        </div>}
      </div>
  )
}

export default Chip