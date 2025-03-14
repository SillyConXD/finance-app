import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import PropTypes from "prop-types";

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/charts">Доходы и расходы</Link>
          </li>
          <li>
            <Link to="/budget">Бюджет</Link>
          </li>
          <li>
            <Link to="/reports">Отчеты</Link>
          </li>
          <li>
            <Link to="/reminders">Напоминания</Link>
          </li>
          <li>
            <Link to="/savings">Резервный фонд</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;