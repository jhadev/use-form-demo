import React from 'react';
import Container from './components/Container';
import Row from './components/Row';
import Column from './components/Column';
import FormMapState from './components/FormMapState';
import FormOnlyFilter from './components/FormOnlyFilter';
import FormOnlyOptions from './components/FormOnlyOptions';
import FormAllOptions from './components/FormAllOptions';
import FormWithSubmit from './components/FormWithSubmit';

const App = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Column md={6}>
          <FormMapState />
        </Column>
        <Column md={6}>
          <FormOnlyFilter />
        </Column>
      </Row>
      <Row>
        <Column md={6}>
          <FormOnlyOptions />
        </Column>
        <Column md={6}>
          <FormAllOptions />
        </Column>
      </Row>
      <Row helper={'justify-content-center'}>
        <Column md={6}>
          <FormWithSubmit />
        </Column>
      </Row>
    </Container>
  );
};

export default App;
