import React, { FormEvent, useEffect, useState } from 'react'
import Button from '../../../_components/Button';
import Chip from '../../../_components/Chip';
import Input from '../../../_components/Input';
import {motion, PanInfo, useAnimation} from 'framer-motion';
import './createTodo.scss'
import useStore from '../../../state';
import {todoConstants} from '../../../../constants'
import { VscRefresh } from 'react-icons/vsc';

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
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const controls = useAnimation();

  const {todoCreateOpen, setToastOpen, setToastMessage, setToastVariant, todoCreateSetOpen} = useStore(state=>state)

  useEffect(()=>{
    if (todoCreateOpen) {
      controls.start("open")
    } else {
      controls.start("close")
    }
  }, [todoCreateOpen])

  const onDragEnd = (_: never, info: PanInfo) => {
    const shouldTodoClose = info.velocity.y > 20 || (info.velocity.y >=0 && info.point.y > 25)
    if (shouldTodoClose) {
      controls.start("close")
      todoCreateSetOpen(false)
    } else {
      controls.start("open")
      todoCreateSetOpen(true)
    }
  }

  const validationSuccess = () => {
    if (task.length < 3) {
      console.log(task.length)
      return false;
    }
    return true;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if(!validationSuccess()) {
      // notification
      setToastOpen(false)
      setToastMessage('Validation failed')
      setToastVariant('WARNING')
      setToastOpen(true)
      return;
    } 
    let dueDate = null;

    if (date !== '' && time !== '') {
      dueDate = new Date(date + " " + time)
    }

    window.electron.todoApi(todoConstants.CREATE_TODO, {
      ...task && {name: task},
      ...set && {set: set},
      ...dueDate && {due: dueDate},
      ...tags && {tags: tags}
    })
    todoCreateSetOpen(false)
    onReset();
  }

  const onAddTag = () => {
    if (tags.length < 2 && tagName.length > 0) {
      setTags([...tags, {name: tagName, variant: tagVariant, id: '' + tags.length}]);
      setTagVariant('info');
      setTagName('');
    }
  }

  const removeTag = (i: number) => {
    const newTags = tags.filter((_, index) => index !== i);
    setTags(newTags);
  }

  const onReset = () => {
    setTask('');
    setTags([]);
    setTagName('');
    setDate('');
    setTime('');
    setSet('');
    setTagVariant('info');
  }

  return (
    <motion.section 
      key="create-todo"
      className='create-todo '
      initial="close"
      animate={controls}
      variants={{
        open: {y: 50},
        close: {y: 345}
      }}
      drag="y"
      dragTransition={{ bounceStiffness: 8000, bounceDamping: 400}}
      dragConstraints={{ bottom: 345, top: 50 }}
      dragElastic={0.5}
      transition={{
        type: "spring",
        damping: 80,
        stiffness: 2400
      }}
      onDragEnd={onDragEnd}
      >
      <div className="relative center">
        <h3>Create task</h3>
        <Button className='reset-button center' type="reset" onClick={onReset}><VscRefresh /></Button>
      </div>
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
          <label htmlFor="due">Due date: </label>
          <div className="input-group">
            <Input className='create-todo-due-date' name="due" type="date" value={date} onChange={e=>setDate(e.target.value)} />
            <Input className='create-todo-due-time' name="due" type="time" value={time} onChange={e=>setTime(e.target.value)} />
          </div>
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
            <Button className='create-todo-add-tag' onClick={onAddTag} disabled={tagName.length === 0}>Add</Button>
          </div>
        </div>
        <div className='tag-list'>
          {tags.map((t, i)=><Chip name={t.name} variant={t.variant} key={t.id} closeAction={()=>removeTag(i)} />)}
        </div>
        <Button className='create-todo-submit' type="submit">Create</Button>
      </form>
      <div className='blank-extension'></div>
    </motion.section>
  )
}

export default CreateTodo