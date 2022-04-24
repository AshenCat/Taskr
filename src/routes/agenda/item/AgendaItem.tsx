import React, { useRef, useState } from 'react';
import Checkbox from '../../../_components/Checkbox';
import Chip from '../../../_components/Chip';
import Select, {Option} from '../../../_components/Select';
import { motion, PanInfo, useAnimation} from 'framer-motion'
import './agendaItem.scss';
import { todoConstants } from '../../../../constants';

export interface IAgendaItemProps {
  _id: string;
  name: string;
  status: string;
  done: boolean;
  due?: Date | string;
  tags?: {
    _id: string | number,
    name: string;
    variant: string;
  }[];
}

function AgendaItem({name, status, done, tags, _id, due}: IAgendaItemProps) {
  const [isChecked, setIsChecked] = useState(done);
  const [selectValue, setSelectValue] = useState(status);
  const controls = useAnimation();
  const timeRef = useRef<number>(0)

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

  const onCheckboxClick = () => {
    setIsChecked(prev=>!prev);
    window.electron.todoApi(todoConstants.TOGGLE_DONE_TODO, _id);
  }

  const onArchive = () => {
    window.electron.todoApi(todoConstants.ARCHIVE_TODO, _id);
  }

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
    window.electron.todoApi(todoConstants.UPDATE_STATUS_TODO, {id: _id, status: e.target.value})
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    timeRef.current = Date.now();
  }
  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(Date.now() - timeRef.current);
    if (Date.now() - timeRef.current < 400) {
      console.log('click')
    }
  }

  return (
    <div className='agenda-row'>
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
        className={`column agenda-details ${selectValue.toLowerCase().replace(/\s/g, '-') ?? ''}`}>
        <div className='row'>
          <Checkbox defaultChecked={isChecked} onChange={onCheckboxClick} _id={_id} />
          <div 
            className={`${isChecked ? 'strike-through' : ''} todo-name`}        
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            tabIndex={0}
            role="button"><span>{name}</span></div>
          <Select value={selectValue} onChange={onSelectChange}>
            <Option value={'Pending'}>Pending</Option>
            <Option value={'On hold'}>On hold</Option>
            <Option value={'Past due'}>Past due</Option>
          </Select>
        </div>
        <div 
          className="row todo-date"        
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          tabIndex={0}
          role="button">
          Due date: <span>&nbsp;
            {due ? due.toLocaleString('en-GB', {
              day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', hour12: true, minute: '2-digit'
            }) : 'N/A'}
          </span>
        </div>
        <div 
          className='row w-100 todo-tag'        
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          tabIndex={0}
          role="button">
          {tags.map(t=><Chip key={t._id} name={t.name} variant={t.variant} />)}
        </div>
      </motion.div>
      <div className="column agenda-archive">
        <div className='right-side-drawer' role="button" tabIndex={0} onClick={onArchive}><h3>Archive</h3></div>
        {/* <div className='right-side-drawer'><h3>Delete</h3></div> */}
      </div>
    </div>
  )
}

export default AgendaItem