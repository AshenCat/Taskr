import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Set from '../../routes/set/Set'
import CreateTodo from '../popups/createTodo/CreateTodo'
import Agenda from '../../routes/agenda/Agenda'
import useStore from '../../state'
import './body.scss'
import Drawer from './drawer/Drawer'

interface IOverlay {
  show: boolean,
  setDrawerOpen: (bool: boolean)=>void
}

function Overlay ({show, setDrawerOpen}: IOverlay) {
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  return <div key={'overlay'} className={`drawer-backdrop ${show? 'open': ''}`} role="button" tabIndex={0} onClick={()=>setDrawerOpen(false)} />
}

function Body() {
  const {drawerOpen, setDrawerOpen, todoCreateOpen} = useStore(state => state)
  // const {electron} = window;
  return (
    <main className='main'>
        <Drawer />
        <div className='content'>
          <AnimatePresence exitBeforeEnter> 
            <Overlay show={drawerOpen} setDrawerOpen={setDrawerOpen} />
            <section key={'section'} className={`body-container ${drawerOpen? 'blur' : ''}`}>
              <Routes>
                <Route key={'/'} path='/' element={<></>} />
                <Route key={'/agenda'} path='/agenda' element={<Agenda />} />
                <Route key={'/alarm'} path='/alarm' element={<></>} />
                <Route key={'*'} path='*' element={<Navigate to="/" replace />} />
              </Routes>
            </section>
            {todoCreateOpen && <CreateTodo />}
          </AnimatePresence>
        </div>
    </main>
  )
}

export default Body

{/* <h1>app comp</h1>
            <button onClick={()=>{
              electron.notificationApi.sendNotification('my custom notification')
            }}>notify</button> */}