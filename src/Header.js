import React, { memo } from 'react'
import { clearLocalStorage } from './constant/common-utils';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearLocalStorage();
    navigate('/');
  };

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="void(#)">
              <i className="fa fa-sign-out" style={{ fontSize: '38px' }} onClick={handleLogout} />
            </a>
          </li>
        </ul>
      </nav>
    </div>

  )
}

export default memo(Header)
