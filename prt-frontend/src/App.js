import logo from './logo.svg';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <h2>Peer Recognition</h2>
        </div>
      </Router>
    );
  }
}

export default App;
