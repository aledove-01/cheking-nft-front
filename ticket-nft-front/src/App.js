import logo from './logo.svg';
import './App.css';
import { createContext } from 'react';
import ContainerCentral from './components/ContainerCentral/ContainerCentral';
import Profile from './components/Profile/Profile';

const ContextCentral = createContext([{theme: 'light'},{lenguaje: 'es'}]);

function App() {
  return (
    <ContextCentral.Provider value={[{theme: 'light'},{lenguaje: 'es'}]}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Tickets NFT</h1>
          <Profile className=""></Profile>
        </header>
        <ContainerCentral >
         
        </ContainerCentral>
        <footer className='App-footer'>

        </footer>
      </div>
    </ContextCentral.Provider>
  );
}

export default App;
