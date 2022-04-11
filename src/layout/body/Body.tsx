import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Set from '../../routes/set/Set'
import CreateTodo from '../../routes/todo/CreateTodo'
import Todo from '../../routes/todo/Todo'
import useDrawer from '../../state/drawer'
import useTodo from '../../state/todo'
import './body.scss'
import Drawer from './drawer/Drawer'

interface IOverlay {
  show: boolean,
  setDrawer: (bool: boolean)=>void
}

function Overlay ({show, setDrawer}: IOverlay) {
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  return <div className={`drawer-backdrop ${show? 'open': ''}`} role="button" tabIndex={0} onClick={()=>setDrawer(false)} />
}

function Body() {
  // const {electron} = window;
  const {open} = useTodo(state=>state)
  const {openDrawer, setDrawer} = useDrawer(state=>({openDrawer: state.drawerOpen, setDrawer: state.setDrawer}))
  return (
    <main className='main'>
        <Drawer />
        <div className='content'>
          <AnimatePresence exitBeforeEnter> 
            <Overlay show={openDrawer} setDrawer={setDrawer} />
            <section className={`body-container ${openDrawer? 'blur' : ''}`}>
              <Routes>
                <Route path='/' element={<></>} />
                <Route path='/set' element={<Set />} />
                <Route path='/todo' element={<Todo />} />
                <Route path='/alarm' element={<></>} />
                <Route path='/schedule' element={<></>} />
                <Route path='*' element={<Navigate to="/" replace />} />
              </Routes>
            </section>
            {open && <CreateTodo />}
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