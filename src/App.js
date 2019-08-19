import React from 'react';
// import useBTCWebSocket from 'hooks/UseBTCWebSocket'
import {
  Connect,
  Disconnect,
  SubscribeTrx,
  UnsubscribeTrx,
  GetTrx,
  GetError,
} from 'utils/BTCWebSocket'
import { mergeOuts } from 'utils/BTCData'
import Transactions from 'components/Transactions'
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 50,
      transactions: [],
      error: undefined
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  subscribe = () => {
    this.unsubscribe();
    Connect();
    SubscribeTrx();
    GetTrx(this.updateTransactions);
    GetError(this.updateError);
  }

  unsubscribe = () => {
    UnsubscribeTrx();
    Disconnect();
  }

  updateTransactions = (data) => {
    this.setState(({ transactions, limit }) => {
      let newTransactions = mergeOuts(data);
      let allTransactions = [].concat(
        newTransactions.map(trx => ({...trx, newTrx: true })),
        transactions.map(trx => ({...trx, newTrx: false }))
      );
      return { transactions: allTransactions.slice(0, limit) }
    });
  }

  updateError = (data) => {
    this.setState({ error: data })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button type="button" onClick={() => this.subscribe()} >Subscribe</button>
          <button onClick={() => this.unsubscribe()} >Unsubscribe</button>
        </header>
        <main>
          <Transactions transactions={this.state.transactions} />
          { this.state.error && <Error err={this.state.error} /> }
        </main>
      </div>
    );
  }
}

export default App;

function Error(props) {
  return (
    <div>{props.err}</div>
  )
}
