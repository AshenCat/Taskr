import React, { FunctionComponent } from 'react'
import useDrawer from '../../../state/drawer'
import './drawer.scss'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'


function drawer() {
  const {open, setDrawer, selected, setSelected} = useDrawer(state=>({open: state.drawerOpen, ...state}))

  const navigate = useNavigate();

  const onDrawerItemClick = (section: string) => {
    setDrawer(true);
    setSelected(section)
  }

  const onSelectionClick = (route: string) => {
    navigate(route)
    setDrawer(false);
    console.log(route)
  }

  const RenderSelectionItems: FunctionComponent = () => {
    switch(selected) {
      case 'Todo':
        return <ol>
          <li>
            <div className='selection' onClick={()=>onSelectionClick('/set')} role="button" tabIndex={0}>List all sets</div>
          </li>
          <li>
            <div className='selection' onClick={()=>onSelectionClick('/set?create=true')} role="button" tabIndex={0}>Create a set</div>
          </li>
          <li>
            <div className='selection' onClick={()=>onSelectionClick('/todo')} role="button" tabIndex={0}>List all todos</div>
          </li>
          <li>
            <div className='selection' onClick={()=>onSelectionClick('/todo?create=true')} role="button" tabIndex={0}>Create a todo</div>
          </li>
        </ol>
      case 'Alarm':
      case 'Sched':
      default:
        return <></>
    }
  }

  return (
    <nav className={`drawer ${open ? 'drawer-open' : ''}`}>
      <aside>
        <header><div onClick={()=>onSelectionClick('/')} role='button' tabIndex={0}>Apps</div></header>
        <motion.ol>
          <li className={`${selected === 'Todo' ? 'mark' : ''}`}>
            <motion.div whileTap={{scale:1.1}} onClick={()=>onDrawerItemClick('Todo')} className="drawer-item" role='button' tabIndex={0}>T</motion.div>
            <span>Todo</span>
          </li>
          <li className={`${selected === 'Alarm' ? 'mark' : ''}`}>
            <motion.div whileTap={{scale:1.1}} onClick={()=>onDrawerItemClick('Alarm')} className="drawer-item" role='button' tabIndex={0}>A</motion.div>
            <span>Alarm</span>
          </li>
          <li className={`${selected === 'Sched' ? 'mark' : ''}`}>
            <motion.div whileTap={{scale:1.1}} onClick={()=>onDrawerItemClick('Sched')} className="drawer-item" role='button' tabIndex={0}>S</motion.div>
            <span>Sched</span>
          </li>
        </motion.ol>
      </aside>
      <section>
        <RenderSelectionItems />
      </section>
    </nav>
  )
}

export default drawer