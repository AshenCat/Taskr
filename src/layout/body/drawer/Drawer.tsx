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
    console.log(drawerSelected)
  }

  const onSelectionClick = (route: string) => {
    navigate(route)
    setDrawerOpen(false);
  }

  const RenderSelectionItems: FunctionComponent = () => {
    switch(drawerSelected) {
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
            rotate: 135,
            scale: 1.2,
          }}
          onClick={()=>setDrawerOpen(true)}
          className="settings" 
          role='button' 
          tabIndex={0}>
           <VscSettingsGear />
        </motion.div>
        <header><div onClick={()=>onSelectionClick('/')} role='button' tabIndex={0}>Apps</div></header>
        <motion.ol>
          <li className={`${drawerSelected === 'Agenda' ? 'mark' : ''}`}>
            <motion.div whileTap={{scale:1.15}} onClick={()=>navigate('Agenda')} className="drawer-item" role='button' tabIndex={0}>A</motion.div>
            <span>Agenda</span>
          </li>
          <li className={`${drawerSelected === 'Alarm' ? 'mark' : ''}`}>
            <motion.div whileTap={{scale:1.15}} onClick={()=>navigate('Alarm')} className="drawer-item" role='button' tabIndex={0}>A</motion.div>
            <span>Alarm</span>
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