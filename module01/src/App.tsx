import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Header from './components/Header/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export function WrappedApp() {
  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
