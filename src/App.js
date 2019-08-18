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
      limit: 60,
      transactions: [],
      error: undefined
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  subscribe = () => {
    Connect();
    SubscribeTrx();
    GetTrx(this.updateTransactions);
    GetError(this.updateError);
  }

  unsubscribe = () => {
    UnsubscribeTrx();
    Disconnect();
  }

  markOldX = transactions => {
    return transactions.map(trx => Object.assign({}, trx, {oldX: true}));
  }

  updateTransactions = (data) => {
      this.setState((state) => {
        let newTransactions = mergeOuts(data);
        let oldTransactions = this.markOldX(state.transactions);
        newTransactions = [].concat(newTransactions, oldTransactions);
        
        if (newTransactions.length > this.state.limit) {
          newTransactions = newTransactions.slice(0, this.state.limit - 1)
        }
        return { transactions: newTransactions }
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
