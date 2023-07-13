import './App.css';
import { Route, Routes } from 'react-router-dom';
import Authors from './Pages/Authors';
import Books from './Pages/Books';

import Header from './Components/Header/Header';


function App() {
  return (
    <div className="App">
      <Header />

     <Routes>
   <Route path="/" Component={Books} />
   <Route path="/authors" Component={Authors} />
   
</Routes>
    </div>
  );
}

export default App;
