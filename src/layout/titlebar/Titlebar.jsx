import React from 'react'
import './titlebar.scss'
import {VscChromeClose, VscChromeMaximize, VscChromeMinimize} from 'react-icons/vsc'

function Titlebar() {
  return (
    <header className='title-bar'>
      <h1 className='app-name'>TaskR</h1>
      <span className='window-button'><VscChromeMinimize /></span>
      <span className='window-button'><VscChromeMaximize /></span>
      <span className='window-button'><VscChromeClose /></span>
    </header>
  )
}

export default Titlebar