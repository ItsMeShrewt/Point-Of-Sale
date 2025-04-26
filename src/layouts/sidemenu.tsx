import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/macky.png';

function Sidemenu() {
  const location = useLocation();
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Check if the current route is any warehouse route
  const isWarehouseActive = ['/inventory', '/inventory/list2', '/inventory/list3'].includes(location.pathname);

  // Dropdown open state
  const [isDropdownOpen, setDropdownOpen] = useState(isWarehouseActive);

  // Toggle when clicking "Inventory"
  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  // Close dropdown when clicking outside (optional)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Don't close if user is in warehouse page
        if (!isWarehouseActive) {
          setDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWarehouseActive]);

  // Watch for route changes
  useEffect(() => {
    // If it's a Warehouse page, keep it open
    if (isWarehouseActive) {
      setDropdownOpen(true);
    } else {
      // If user navigates to a non-Warehouse page, close it
      setDropdownOpen(false);
    }
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <aside className="app-sidebar bg-red-800 h-screen" id="sidebar">
        <div className="main-sidebar-header">
          <a href="/" className="header-logo"></a>
        </div>

        <div className="main-sidebar bg-red-800 h-full" id="sidebar-scroll">
          <nav className="main-menu-container nav nav-pills flex-col sub-open">
            <div className="slide-left" id="slide-left"></div>

            <ul className="main-menu">
              <li>
                <a href="/dashboard">
                  <center>
                    <img src={logo} className="transparent-shadow" style={{ maxHeight: '150px' }} />
                  </center>
                </a>
              </li>

              <li><hr className="mt-3" /></li>  

              <li className="slide__category">
                <span className="category-name" style={{ color: 'white' }}>Main</span>
              </li>

              {/* Dashboard */}
              <li className={`slide ${isActive('/') ? 'bg-red-700' : ''}`}>
                <Link to="/dashboard" className="side-menu__item">
                  <i className="w-6 h-4 side-menu__icon bi bi-speedometer" style={{ color: 'white' }}></i>
                  <span className="side-menu__label" style={{ color: 'white' }}>Dashboard</span>
                </Link>
              </li>

              <li className="slide__category">
                <span className="category-name" style={{ color: 'white' }}>Management</span>
              </li>

              {/* Sales Orders */}
              <li className={`slide ${isActive('/order') ? 'bg-red-700' : ''}`}>
                <Link to="/order" className="side-menu__item">
                  <i className="w-6 h-4 side-menu__icon bi bi-cart-check" style={{ color: 'white' }}></i>
                  <span className="side-menu__label" style={{ color: 'white' }}>Order Management</span>
                </Link>
              </li>
              <li className={`slide ${isActive('/orders') ? 'bg-red-700' : ''}`}> 
                <Link to="/orders" className="side-menu__item"> 
                  <i className="w-6 h-4 side-menu__icon bi bi-cart-check" style={{ color: 'white' }}></i>
                  <span className="side-menu__label" style={{ color: 'white' }}>Order Management</span>
                </Link>
              </li>

              {/* Products */}
              <li className={`slide ${isActive('/products') ? 'bg-red-700' : ''}`}>
                <Link to="/products" className="side-menu__item">
                  <i className="w-6 h-4 side-menu__icon bi bi-bag" style={{ color: 'white' }}></i>
                  <span className="side-menu__label" style={{ color: 'white' }}>Products</span>
                </Link>
              </li>

              {/* Inventory Dropdown */}
              <li ref={dropdownRef} className={`slide ${isDropdownOpen ? 'open' : ''}`}>
                <div
                  onClick={toggleDropdown}
                  className="side-menu__item cursor-pointer flex items-center justify-between"
                  style={{ color: 'white' }}
                >
                  <div className="flex items-center">
                    <i className="w-6 h-4 side-menu__icon bi bi-box-seam-fill" style={{ color: 'white' }}></i>
                    <span className="side-menu__label" style={{ color: 'white' }}>Inventory</span>
                  </div>
                  <i className={`bi ${isDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ml-auto`}></i>
                </div>

                {/* Dropdown Submenu */}
                {isDropdownOpen && (
                  <ul className="submenu pl-8 mt-2">
                    <li className={`slide ${isActive('/inventory') ? 'bg-red-700' : ''}`}>
                      <Link to="/inventory" className="side-menu__item">
                        <i className="w-6 h-4 side-menu__icon bi bi-building-fill" style={{ color: 'white' }}></i>
                        <span className="side-menu__label" style={{ color: 'white' }}>Warehouse A</span>
                      </Link>
                    </li>
                    <li className={`slide ${isActive('/inventory/list2') ? 'bg-red-700' : ''}`}>
                      <Link to="/inventory/list2" className="side-menu__item">
                        <i className="w-6 h-4 side-menu__icon bi bi-building-fill" style={{ color: 'white' }}></i>
                        <span className="side-menu__label" style={{ color: 'white' }}>Warehouse B</span>
                      </Link>
                    </li>
                    <li className={`slide ${isActive('/inventory/list3') ? 'bg-red-700' : ''}`}>
                      <Link to="/inventory/list3" className="side-menu__item">
                        <i className="w-6 h-4 side-menu__icon bi bi-building-fill" style={{ color: 'white' }}></i>
                        <span className="side-menu__label" style={{ color: 'white' }}>Warehouse C</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Damaged Products */}
              <li className={`slide ${isActive('/damages/damage_list') ? 'bg-red-700' : ''}`}>
                <Link to="/damages/damage_list" className="side-menu__item">
                  <i className="w-6 h-4 side-menu__icon bi bi-exclamation-triangle" style={{ color: 'white' }}></i>
                  <span className="side-menu__label" style={{ color: 'white' }}>Damaged Products</span>
                </Link>
              </li>

              {/* Order History */}
              <li className={`slide ${isActive('/history') ? 'bg-red-700' : ''}`}>
                <Link to="/history" className="side-menu__item">
                  <i className="w-6 h-4 side-menu__icon bi bi-file-earmark-text" style={{ color: 'white' }}></i>
                  <span className="side-menu__label" style={{ color: 'white' }}>Order History</span>
                </Link>
              </li>

              {/* Reports */}
              <li className={`slide ${isActive('/reports') ? 'bg-red-700' : ''}`}>
                <Link to="/reports" className="side-menu__item">
                  <i className="w-6 h-4 side-menu__icon bi bi-clipboard-data" style={{ color: 'white' }}></i>
                  <span className="side-menu__label" style={{ color: 'white' }}>Reports</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidemenu;
