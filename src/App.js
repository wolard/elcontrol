import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={Landing} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Router>
    </div>
  );
}


export default App;