import React from 'react';
import classnames from 'classnames'

export default function Item({ item }) {
  return (
    <li className={classnames({'new-trx': item.newTrx})}>
      <div className="tx-index">{item.tx_index}</div>
      <div className="tx-n">{item.n}</div>
      <div className="tx-prev">{item.prev ? 'Yes' : 'No'}</div>
      <div className="tx-spent">{item.spent ? 'Yes' : 'No'}</div>
      <div className="tx-value">{item.value}</div>
    </li>
  );
}
