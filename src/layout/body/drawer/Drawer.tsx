import React, { FunctionComponent } from 'react'
import './drawer.scss'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useStore from '../../../state'
import AgendaItems from './applicationSubSelection/AgendaItems'
import { VscSettingsGear } from 'react-icons/vsc'


function drawer() {
  const {drawerSelected, setDrawerSelected, setDrawerOpen, drawerOpen} = useStore(state=>state)

  const navigate = useNavigate();

  const onDrawerItemClick = (section: string) => {
    setDrawerOpen(true);
    setDrawerSelected(section)
  }

  const onSelectionClick = (route: string) => {
    navigate(route)
    setDrawerOpen(false);
  }

  const RenderSelectionItems: FunctionComponent = () => {
    switch(drawerSelected) {
      case 'Settings':
        return <></>
      case 'Agenda':
        return <AgendaItems />
      case 'Alarm':
      default:
        return <></>
    }
  }

  return (
    <nav className={`drawer ${drawerOpen ? 'drawer-open' : ''}`}>
      <aside>
        <motion.div
          whileHover={{
            rotate: 45,
            scale: 1.1,
          }}
          whileTap={{
            rotate: 0,
            scale: 1.2,
          }}
          onClick={()=>onDrawerItemClick('Settings')}
          className="settings" 
          role='button' 
          tabIndex={0}>
           <VscSettingsGear />
        </motion.div>
        <header><div onClick={()=>onSelectionClick('/')} role='button' tabIndex={0}>Apps</div></header>
        <motion.ol>
          <li className={`${drawerSelected === 'Agenda' ? 'mark' : ''}`}>
            <motion.div whileTap={{scale:1.15}} onClick={()=>onDrawerItemClick('Agenda')} className="drawer-item" role='button' tabIndex={0}>A</motion.div>
            <span>Agenda</span>
          </li>
          <li className={`${drawerSelected === 'Alarm' ? 'mark' : ''}`}>
            <motion.div whileTap={{scale:1.15}} onClick={()=>onDrawerItemClick('Alarm')} className="drawer-item" role='button' tabIndex={0}>A</motion.div>
            <span>Alarm</span>
          </li>
        </motion.ol>
      </aside>
      <section className='selections'>
        <RenderSelectionItems />
      </section>
    </nav>
  )
}

export default drawer