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
import Transactions from 'components/Transactions'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 300,
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

  updateTransactions = (data) => {
      this.setState((state) => {
        let newTransactions = [data].concat(state.transactions);
        if (newTransactions.length > this.state.limit) {
          newTransactions = newTransactions.slice(0, this.state.limit)
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
          <div>
            <button onClick={() => this.subscribe()} >Subscribe</button>
            <button onClick={() => this.unsubscribe()} >Unsubscribe</button>
          </div>
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
