import React from 'react';
import SearchBar from '../components/Header/SearchBar';
import MainPage from '../components/MainPage/MainPage';

function Home() {
  return (
    <div className="container">
      <SearchBar />
      <MainPage />
    </div>
  );
}

export default Home;
