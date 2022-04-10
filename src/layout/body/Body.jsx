import React from 'react'
import useStore from '../../state'
import './body.scss'
import Drawer from './drawer/Drawer'

function Overlay ({show, toggleDrawer}) {
  return <div className={`drawer-backdrop ${show? 'open': ''}`} onClick={toggleDrawer} />
}

function Body() {
  const {open, toggleDrawer} = useStore(state=>({open: state.drawerOpen, toggleDrawer: state.toggleDrawer}))
  return (
    <main className='main'>
        <Drawer />
        <div className='content'>
          <Overlay show={open} toggleDrawer={toggleDrawer} />
          <section className={`body-container ${open? 'blur' : ''}`}>
            <h1>app comp</h1>
            <button onClick={()=>{
                electron.notificationApi.sendNotification('my custom notification')
            }}>notify</button>
          </section>
        </div>
    </main>
  )
}

export default Body