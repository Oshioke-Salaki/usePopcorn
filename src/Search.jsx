import React, { useEffect, useRef } from 'react'

function Search({ query, setQuery }) {
  const inputEl = useRef(null)

  useEffect(function(){
    function callback(e){
      if(e.code === 'Enter'){
        if(document.activeElement === inputEl.current) return;
        inputEl.current.focus()
        setQuery('')
      }
    }

    document.addEventListener('keydown', callback)
    inputEl.current.focus()

    return function(){
      document.removeEventListener('keydown', callback)
    }
  }, [setQuery])
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)} 
      ref={inputEl}
      />
  );
}
export default Search
