import React from 'react';
import Outs from 'components/Outs'

export default function Transactions({ transactions }) {
  return (
    <ul className="transaction-list">
    { transactions.map(({x}) => {
      const {
        hash,
        inputs,
        out,
        size
      } = x
      console.log(x)

      return (
        <li key={hash}>
          <div>{hash} - {size}</div>
          <Outs
            title="Previous Outs"
            items={inputs}
            prev
          />
          <Outs
            title="Outs"
            items={out}
          />
        </li>
      )
    })}
    </ul>
  )
}
