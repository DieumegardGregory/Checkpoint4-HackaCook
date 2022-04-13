import { Routes, Route } from 'react-router-dom';
import HomePage from './2.Public/HomePage/HomePage';
import Admin from './1.Admin/Admin';
import ListeRecettes from './2.Public/ListeRecettes/ListeRecettes';
import Register from './2.Public/Register/Register';
import Login from './2.Public/Login/Login';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/recettes" element={<ListeRecettes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
