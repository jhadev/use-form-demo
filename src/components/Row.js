import React from 'react';

const Row = ({ helper, children }) => (
  <div className={helper ? `row ${helper}` : 'row'}>{children}</div>
)

export default Row;