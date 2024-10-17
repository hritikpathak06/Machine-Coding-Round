import React from 'react'
import DragDrop from './components/DragDrop'
import { initialData } from './data/sample_data'
import Todo from './components/Todo'

const App = () => {
  return (
    <div>
      {/* <DragDrop data={initialData}/> */}
      <Todo/>
    </div>
  )
}

export default App
