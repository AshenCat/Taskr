import React, { FormEvent, useEffect, useState } from 'react'
import Button from '../../../_components/Button';
import Chip from '../../../_components/Chip';
import Input from '../../../_components/Input';
import {motion, PanInfo, useAnimation} from 'framer-motion';
import './createTodo.scss'
import useStore from '../../../state';

interface ITags {
  id?: string,
  name: string,
  variant: string
}

function CreateTodo() {
  const [task, setTask] = useState<string>('');
  const [set, setSet] = useState<string>('');
  const [tagName, setTagName] = useState<string>('');
  const [tagVariant, setTagVariant] = useState<string>('info');
  const [tags, setTags] = useState<ITags[]>([]);

  const controls = useAnimation();

  const {todoCreateOpen, todoCreateSetOpen} = useStore(state=>state) 

  useEffect(()=>{
    if (todoCreateOpen) {
      controls.start("open")
    } else {
      controls.start("close")
    }
  }, [todoCreateOpen, controls])

  const onDragEnd = (_: never, info: PanInfo) => {
    const shouldTodoClose = info.velocity.y > 20 || (info.velocity.y >=0 && info.point.y > 45)
    if (shouldTodoClose) {
      todoCreateSetOpen(false)
    } else {
      todoCreateSetOpen(true)
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    
  }

  const onAddTag = () => {
    if (tags.length < 2) {
      setTags([...tags, {name: tagName, variant: tagVariant}]);
      setTagVariant('info');
      setTagName('')
    }
  }

  return (
    <motion.section 
    key="create-todo"
      className='create-todo'
      initial="close"
      animate={controls}
      variants={{
        open: {y: 100},
        close: {y: 345}
      }}
      drag="y"
      dragTransition={{ bounceStiffness: 8000, bounceDamping: 400}}
      dragConstraints={{ bottom: 345, top: 100 }}
      dragElastic={0.5}
      transition={{
        type: "spring",
        damping: 80,
        stiffness: 2400
      }}
      onDragEnd={onDragEnd}
      >
      <h3>Create task</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor='todo'>Task: </label>
          <Input name="todo" type="text" value={task} onChange={e=>setTask(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor='set'>Set: </label>
          <Input name="set" type="text"  value={set} onChange={e=>setSet(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor='tags'>Tags: </label>
          <div className='input-group'>
            <Input name="tags" type="text" className='create-todo-variant-name' value={tagName} onChange={e=>setTagName(e.target.value)} />
            <select 
              className='create-todo-variant-dropdown'
              value={tagVariant}
              onChange={e=>{setTagVariant(e.target.value)}}>
                <option value={'info'}>info</option>
                <option value={'warning'}>warning</option>
                <option value={'success'}>success</option>
                <option value={'danger'}>danger</option>
            </select>
            <Button className='create-todo-add-tag' onClick={onAddTag}>Add</Button>
          </div>
        </div>
        <div className='tag-list'>
          {tags.map(t=><Chip name={t.name} variant={t.variant} key={t.id} closeAction={()=>{}} />)}
        </div>
        <Button className='create-todo-submit'>Create</Button>
      </form>
      <div className='blank-extension'></div>
    </motion.section>
  )
}

export default CreateTodo