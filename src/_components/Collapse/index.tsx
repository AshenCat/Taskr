import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { VscChevronRight } from 'react-icons/vsc';
import {collapseChildren, collapseChildrenItem} from './animation'
import './collapse.scss'

interface ICollapseProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    headerClassName?: string;
    key?: string | number;
    earlyExit?: boolean
}

function Collapse(props: ICollapseProps) {
  const [showChildren, setShowChildren] = useState<boolean>(false)

  const chevRef = useRef<HTMLSpanElement>(null)

  const onHeaderMouseDown = () => {
    setShowChildren(prev => !prev);
  }

  return (
    <div className={`${props.className || ''} custom-collapse`}>
      <div className={`${props.headerClassName || ''} collapse-header`} onMouseDown={onHeaderMouseDown} role="button" tabIndex={0}>
        <div className='collapse-chevron'><span ref={chevRef} className={`${showChildren && 'rotate-90' || ''}`}><VscChevronRight /></span></div>
        <div className={`collapse-title ${showChildren && 'active' || ''}`}>{props.title}</div>
      </div>
      {/* <AnimatePresence exitBeforeEnter={!props.earlyExit} initial={false}> */}
        {showChildren && <motion.div className='collapse-children' variants={collapseChildren} initial="initial" animate="show" exit="exit">{props.children}</motion.div>}
      {/* </AnimatePresence> */}
    </div>
  )
}

export const CollapseItem = (props: ICollapseProps) => {
    return <motion.div key={props.key} className={`children-item ${props.className || ''}`} variants={collapseChildrenItem}>
        {props.children}
    </motion.div>
}

export default Collapse;