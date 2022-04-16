import React, { useState } from 'react';
import Checkbox from '../../../_components/Checkbox';
import Chip from '../../../_components/Chip';
import { CollapseItem } from '../../../_components/Collapse';
import Select, {Option} from '../../../_components/Select';
import { motion, PanInfo, useAnimation} from 'framer-motion'
import './agendaItem.scss';

interface IAgendaItemProps {
  todo: string;
  optionState: string;
  checkboxState: boolean;
  tags?: {
    _id: string | number,
    name: string;
    variant: string;
  }[];
}

function AgendaItem({todo, optionState, checkboxState, tags}: IAgendaItemProps) {
  const [isChecked, setIsChecked] = useState(checkboxState);
  const [selectValue, setSelectValue] = useState(optionState);
  const controls = useAnimation();

  const onDragEnd = (_: never, info: PanInfo) => {
    const shouldDrawerClose = info.velocity.x > 20 || (info.velocity.x >=0 && info.point.x > 45)
    if (shouldDrawerClose) {
      // console.log('close')
      controls.start("close")
    } else {
      // console.log('open')
      controls.start("open")
    }
  }

  return (
    <CollapseItem className='agenda-row'>
      <motion.div 
        drag="x" 
        dragConstraints={{ right: 0, left: -110 }}
        dragElastic={0.5}
        animate={controls}
        dragTransition={{ bounceStiffness: 2400, bounceDamping: 80}}
        onDragEnd={onDragEnd}
        transition={{
          type: "spring",
          damping: 80,
          stiffness: 2400
        }}
        variants={{
          close: { x: 0 },
          open: { x: -110 }
        }}
        className="column agenda-details">
        <div className='row'>
          <Checkbox checked={isChecked} onChange={()=>setIsChecked(prev=>!prev)} />
          <div className='todo-name'>{todo}</div>
          <Select value={selectValue} onChange={e=>setSelectValue(e.target.value)}>
            <Option value={1}>On going</Option>
            <Option value={1}>On hold</Option>
            <Option value={1}>Done</Option>
          </Select>
        </div>
        <div className='row'>
          {tags.map(t=><Chip key={t._id} name={t.name} variant={t.variant} />)}
        </div>
      </motion.div>
      <div className="column agenda-archive">
        <div className='right-side-drawer'><h3>Archive</h3></div>
        {/* <div className='right-side-drawer'><h3>Delete</h3></div> */}
      </div>
    </CollapseItem>
  )
}

export default AgendaItem