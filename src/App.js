import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Datastorage from './Components/Datastorage';
import City from './Components/City';
import State from './Components/State';
import Country from './Components/Country';

function App() {
  return (
<>
<BrowserRouter>
<Routes>

  
  <Route path='/login' element={<Login/>}></Route>
  <Route path='/register' element={<Register/>}></Route>
  <Route path='/datastorage' element={<Datastorage/>}></Route>
  <Route path='/country' element={<Country/>}></Route>
  <Route path='/state' element={<State/>}></Route>
  <Route path='/city' element={<City/>}></Route>


</Routes>
</BrowserRouter>

</>
  
  );
}

export default App;
