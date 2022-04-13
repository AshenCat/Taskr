import React, { useState } from 'react'
import Input from '../Input'
import './autocomplete.scss'

interface IAutocompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suggestions: string[];
}

function Autocomplete(props: IAutocompleteProps) {
  const {suggestions} = props;

  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [input, setInput] = useState<string>('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;

    const unLinked = suggestions.filter(s=>s.toLowerCase().indexOf(userInput.toLowerCase()) > -1);

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  }

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    const cast = e.target as HTMLElement
    setFilteredSuggestions([]);
    setInput(cast.innerText)
    setActiveSuggestionIndex(0);
    setShowSuggestions(false)
  }

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (<ul className='suggestions'>
      {filteredSuggestions.map((suggestion, index) => {
        let className;
        // flag the active suggestion with a class
        if(index === activeSuggestionIndex) 
          className = "suggestion-active";
        return (<li className={className} key={suggestion}>
          <div onClick={onClick} tabIndex={0} role="button"></div>
        </li>)
      })}
    </ul>) : (<div className='no-suggestions'>
      <em>No suggestions</em>
    </div>)
  }

  return (
    <>
        <Input {...props} className={`${props.className} custom-autocomplete`}>Autocomplete</Input>
        {showSuggestions && input && <SuggestionsListComponent />}
    </>
  )
}


export default Autocomplete