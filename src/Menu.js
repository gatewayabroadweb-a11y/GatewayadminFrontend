import React from 'react'
import { Link } from 'react-router-dom'
import { getDataFromLocalStorage } from './constant/common-utils'
import { constant } from './constant/index.constant';
import NavMenu from './component/custom-component/NavMenu';

function Menu() {
  const userName = getDataFromLocalStorage('name') || '';
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Profile" />
            </div>
            <div className="info">
              <Link to="#" className="d-block">{userName}</Link>
            </div>
          </div>
          <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <NavMenu items={constant.ADMIN_SIDE_BAR} />
            </ul>
          </nav>
        </div>
      </aside>
    </div>

  )
}
export default Menu
