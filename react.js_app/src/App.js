import './App.css';
import AppContainer from './containers/AppContainer';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
