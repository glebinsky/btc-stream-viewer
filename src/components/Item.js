import React from 'react';
import cn from 'classnames'

export default function Item({ item, index }) {
  return (
    <li className={cn({'old-trx': item.oldX})}>
      <div className="tx-index">{item.tx_index}</div>
      <div className="tx-prev">{item.prev ? 'Yes' : 'No'}</div>
      <div className="tx-spent">{item.spent ? 'Yes' : 'No'}</div>
      <div className="tx-value">{item.value}</div>
    </li>
  );
}
