import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import CategoryList from './Pages/CategoryList';
import Draggable from 'react-draggable';

function App() {
  const ref = useRef(null)
  return (
    <Draggable nodeRef={ref}>
      <div ref={ref}>
     <CategoryList />
     </div>
    </Draggable>
  );
}

export default App;
