import React from 'react';

const Column = ({ base = 12, md, lg, xl, children }) => {

  let buildClassName = `col-${base}`
  if (md) {
    buildClassName = buildClassName.concat(` col-md-${md}`)
  }
  if (lg) {
    buildClassName = buildClassName.concat(` col-lg-${lg}`)
  }
  if (xl) {
    buildClassName = buildClassName.concat(` col-xl-${xl}`)
  }

  return <div className={buildClassName}>{children}</div>
}

export default Column;