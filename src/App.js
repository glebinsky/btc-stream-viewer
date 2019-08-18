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
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      error: undefined
    };
  }

  componentDidMount() {
    Connect();
    SubscribeTrx();
    GetTrx(this.updateTransactions);
    GetError(this.updateError);
  }

  componentWillUnmount() {
    UnsubscribeTrx();
    Disconnect();
  }

  updateTransactions = (data) => {
      this.setState((state) => {
        let newTransactions = [data].concat(state.transactions);
        if (newTransactions.length > 20) {
          newTransactions = newTransactions.slice(0, 20)
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
        </header>
        <main>
          <ul>
          { this.state.transactions.map(trx => (
              <Transaction key={trx.x.hash} trx={trx} />
          ))}
          </ul>
          { this.state.error && <Error err={this.state.error} /> }
        </main>
      </div>
    );
  }
}

export default App;

function Transaction(props) {
  // console.log(props.trx)
  return (
    <li>{JSON.stringify(props.trx.x)}</li>
  )
}

function Error(props) {
  return (
    <div>{props.err}</div>
  )
}
