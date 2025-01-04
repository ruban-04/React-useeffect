import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Datastorage from './Components/Datastorage';

function App() {
  return (
<>
<BrowserRouter>
<Routes>
  <Route path='/login' element={<Login/>}></Route>
  <Route path='/register' element={<Register/>}></Route>
  <Route path='/datastorage' element={<Datastorage/>}></Route>

</Routes>
</BrowserRouter>

</>
  
  );
}

export default App;
