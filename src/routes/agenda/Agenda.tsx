import React from 'react'
import { useNavigate } from 'react-router-dom';
import Checkbox from '../../_components/Checkbox';
import Collapse, { CollapseItem } from '../../_components/Collapse';
import Select, { Option } from '../../_components/Select';
import './agenda.scss'

function Todo() {
  const navigate = useNavigate();
  return (
    <div className='agenda'>
      <h2>Agenda</h2>
        <Collapse title='Today'>
          <CollapseItem>
            <div className='row'>
              <Checkbox />
              <div>Collapse</div>
              <Select>
                <Option value={1}>Done</Option>
              </Select>
            </div>
            <div>
              
            </div>
          </CollapseItem>
          <CollapseItem className='row'>
            <Checkbox />
            <div>Select</div>
            <Select>
              <Option value={1}>Done</Option>
            </Select>
          </CollapseItem>
          <CollapseItem className='row'>
            <Checkbox />
            <div>Todo</div>
            <Select>
              <Option value={1}>Done</Option>
            </Select>
          </CollapseItem>
          <CollapseItem className='row'>
            <Checkbox />
            <div>Set</div>
            <Select>
              <Option value={1}>Done</Option>
            </Select>
          </CollapseItem>
        </Collapse>

        <Collapse title='Tomorrow'>
          <CollapseItem className='row'>
            <Checkbox />
            <div>Collapse</div>
            <Select>
              <Option value={1}>Done</Option>
            </Select>
          </CollapseItem>
          <CollapseItem className='row'>
            <Checkbox />
            <div>Select</div>
            <Select>
              <Option value={1}>Done</Option>
            </Select>
          </CollapseItem>
          <CollapseItem className='row'>
            <Checkbox />
            <div>Todo</div>
            <Select>
              <Option value={1}>Done</Option>
            </Select>
          </CollapseItem>
          <CollapseItem className='row'>
            <Checkbox />
            <div>Set</div>
            <Select>
              <Option value={1}>Done</Option>
            </Select>
          </CollapseItem>
        </Collapse>

        
        <Collapse title='OTHERS'>
          {[...Array(40)].map((_, c)=><CollapseItem  className='row' key={c}><Checkbox /><div>TEST</div><Select><Option value="1">test</Option></Select></CollapseItem>)}
        </Collapse>
    </div>
  )
}

export default Todo