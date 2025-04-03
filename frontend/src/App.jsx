import { useState } from 'react';
import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BookList from './pages/BookList';
import BorrowingList from './pages/BorrowingList';
import BookDetail from './pages/BookDetail';
import Favorite from './pages/Favorite';
import MyProfile from './pages/MyProfile';
import Registration from './Account/Registration';
import Login from './Account/Login';
import Logout from './Account/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Protector } from "./helpers";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  window.addEventListener('scroll', function () {
    var header = document.querySelector('nav');
    var main = document.querySelector('main');
    header.classList.toggle('fixed-top', window.scrollY > 80);
    header.classList.toggle('sticky', window.scrollY > 80);
    main.classList.toggle('main', window.scrollY > 80);
    }
    );
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Protector Component={Home} />} />
          <Route path='/books' element={<Protector Component={BookList} />} />
          <Route path='/borrowing-list' element={<Protector Component={BorrowingList} />} />
          <Route path='/books/:id' element={<Protector Component={BookDetail} />} />
          <Route path='/favorite' element={<Protector Component={Favorite} />} />
          <Route path='/my-profile' element={<Protector Component={MyProfile} />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
function Layout() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  function toggleNavbar() {
    setIsNavbarOpen(!isNavbarOpen);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header>
        <div className='header-title'><b className='main-title'>~ L I B R A R Y ~</b></div>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" onClick={toggleNavbar} aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <a className="text-white mx-2 nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="text-white mx-2 nav-link active" aria-current="page" href="/books">Buku</a>
                </li>
                <li className="nav-item">
                  <a className="text-white mx-2 nav-link active" aria-current="page" href="/borrowing-list">Pinjaman</a>
                </li>
                <li className="nav-item">
                  <a className="text-white mx-2 nav-link active" aria-current="page" href="/favorite">Favorite</a>
                </li>
                <li className="nav-item">
                  <a className="text-white mx-2 nav-link active" aria-current="page" href="/logout">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer className="footer footer">
        <div className="footer-text d-flex justify-content-center gap-2 fs-5 mt-2">
          <a className="text-light" href="https://www.instagram.com/herlindwi.06?igsh=MWJzbXFjNmV3eDVwYw=="><i className="footer_icon bi bi-instagram"></i></a>
          <a className="text-light" href="https://github.com/Herlin6"><i className="footer_icon bi bi-github"></i></a>
          <a className="text-light" href="https://www.facebook.com/"><i className="footer_icon bi bi-facebook"></i></a>
        </div>
        <div className='footer-text text-center mb-2'>
          <a className="mx-2 nav-link active" aria-current="page" href="/my-profile">About Me</a>
        </div>
        <div className="footer-text d-flex justify-content-center footer2">@2024, Designed by Herlin</div>
      </footer>
    </div>
  );
}