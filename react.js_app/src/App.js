import './App.css';
import AppContainer from './containers/AppContainer';
<<<<<<< HEAD

function App() {
  return (
      <AppContainer/>
=======
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppContainer />
      </BrowserRouter>
    </div>
>>>>>>> main
  );
}

export default App;
