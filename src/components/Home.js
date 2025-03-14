import React from "react";
import './Home.css'; // Импортируем стили для компонента Home

const Home = () => {
  return (
    <div className="home-container" style={{ zIndex: 2 }}>
      <div className="welcome-message" style={{ zIndex: 2 }}>
        <h2>Добро пожаловать в ваш персональный финансовый менеджер!</h2>
      </div>
    </div>
  );
};

export default Home;
