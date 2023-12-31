import React from 'react';
import AppRouter from './routes/AppRouter';
import AuthProvider from './contexts/authContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;