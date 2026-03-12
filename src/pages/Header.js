import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import PageServices from "../services/PageServices";
import useAsync from "../hooks/useAsync";
import { constant } from "../constant/index.constant";

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const { pathname } = useLocation();
  const {
    data: course,
  } = useAsync(PageServices.getCourse);
  const [CourseData, setCourseData] = useState([]);
  const [mobileNev, setMobileNev] = useState(false);
  const headerRef = useRef(null);
  useEffect(() => {
    if (course?.data?.page) {
      setCourseData(course.data.page);
    }
    window.scrollTo(0, 0);
  }, [pathname, course]);

  // for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleOutsideClick = (e) => {
    if (headerRef.current && !headerRef.current.contains(e.target)) {
      setMobileNev(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <header ref={headerRef} className={isSticky ? "sticky" : ""}>
        <div className="container-fluid">
          <div className="header-inner">
            <div className="row align-items-center">
              <div className="col-6 col-md-3">
                <div className="logo-sec">
                  <Link to="/">
                    <img src="assets/img/ga-logo.svg" alt="Gateway Abroad Logo" />
                  </Link>
                </div>
              </div>
              <div className="col-6 col-md-9">
                <div className="header-menus">
                  <ul className="d-flex align-items-center list-unstyled justify-content-end">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="/spoken-english">Spoken English</Link>
                    </li>
                    <li className="test-pre-dropdown-outer">
                      <Link to="#" className="test-pre-drpbtn">
                        {" "}
                        <span>
                          Test Preparation
                          <i className="fa fa-chevron-down" />
                        </span>
                      </Link>
                      <div className="test-pre-dropdown-content">
                        <ul className="d-flex list-unstyled justify-content-center">
                          {CourseData.map((course) => (
                            <li key={course._id}>
                              <Link to={`/course/${course.pageName}`}>
                                <div>
                                  <img
                                    alt="course logo"
                                    src={`${constant.REACT_APP_URL}/uploads/${course.image}`}
                                  />
                                </div>
                                <span>{course.pageName}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <Link to="/blog">Blogs</Link>
                    </li>
                    <li>
                      <Link to="/career">Career</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact us</Link>
                    </li>
                  </ul>
                </div>
                <div
                  className="mobile-toggle-btn-outer "

                >
                  <button
                    onClick={() => setMobileNev(!mobileNev)}
                    className={`mobile-toggle-btn ${mobileNev ? "active" : " "
                      }`}
                  >
                    <span />
                  </button>
                  <div
                    className="mobile-nav-element "
                    id="mySidenav"
                    style={{
                      transform: `${mobileNev ? "translateX(0%)" : "translateX(110%)"
                        }`,
                    }}
                  >
                    <nav className="mobile-nav-element-inner">
                      <ul className="list-unstyled">
                        <li>
                          <Link to="/" onClick={() => setMobileNev(false)}>Home</Link>
                        </li>
                        <li>
                          <Link to="/about" onClick={() => setMobileNev(false)} >About Us</Link>
                        </li>
                        <li>
                          <Link to="/spoken-english">Spoken English</Link>
                        </li>
                        <li>
                          <Link
                            data-bs-toggle="collapse"
                            to="#testpre-drp"
                            role="button"
                            aria-expanded="false"
                            aria-controls="testpre-drp"
                          >
                            Test Preparation{" "}
                            <span>
                              <i className="fa fa-chevron-down"></i>
                            </span>
                          </Link>
                          <div
                            className="collapse testpre-content"
                            id="testpre-drp"
                          >
                            <ul className="list-unstyled">
                              {CourseData.map((course) => (
                                <li key={course._id}>
                                  <Link to={`/course/${course.pageName}`} onClick={() => setMobileNev(false)}>

                                    <span>{course.pageName}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                        <li>
                          <Link to="/blog" onClick={() => setMobileNev(false)}>Blogs</Link>
                        </li>
                        <li>
                          <Link to="/career" onClick={() => setMobileNev(false)} >Career</Link>
                        </li>
                        <li>
                          <Link to="/contact" onClick={() => setMobileNev(false)}>Contact Us</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default memo(Header);
