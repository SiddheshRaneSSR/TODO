import { useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const [page, setPage] = useState('register');

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={() => setPage('register')}>Register</button>
      <button onClick={() => setPage('login')}>Login</button>
      {page === 'register' ? <Register /> : <Login />}
    </div>
  );
}

export default App;

