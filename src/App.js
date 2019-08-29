import React from 'react';
import Container from './components/Container'
import FormMapState from './components/FormMapState'
import FormOnlyFilter from './components/FormOnlyFilter'
import FormOnlyOptions from './components/FormOnlyOptions'
import FormAllOptions from './components/FormAllOptions'

const App = () => {
  return (
    <Container className='text-center mt-5'>
      <div className="row">
        <div className="col-6">
          <FormMapState />
        </div>
        <div className="col-6">
          <FormOnlyFilter />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <FormOnlyOptions />
        </div>
        <div className="col-6">
          <FormAllOptions />
        </div>
      </div>
    </Container>
  )
}

export default App