import React, { FormEvent, useEffect, useState } from 'react'
import Button from '../../../_components/Button';
import Chip from '../../../_components/Chip';
import Input from '../../../_components/Input';
import './createTodo.scss'

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

  useEffect(()=>{
    
  }, [])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    
  }

  const onAddTag = () => {
    setTags([...tags, {name: tagName, variant: tagVariant}]);
    setTagVariant('info');
    setTagName('')
  }

  return (
    <section className='create-todo'>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor='todo'>Task: </label>
          <Input show={true} name="todo" type="text" value={task} onChange={e=>setTask(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor='set'>Set: </label>
          <Input show={true} name="set" type="text"  value={set} onChange={e=>setSet(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor='tags'>Tags: </label>
          <div className='input-group'>
            <Input show={true} name="tags" type="text" className='create-todo-variant-name' value={tagName} onChange={e=>setTagName(e.target.value)} />
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
    </section>
  )
}

export default CreateTodo