import React, { useState, useEffect, lazy, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout Components
const Header = lazy(() => import('./Header'));
const Menu = lazy(() => import('./Menu'));
const Dashboard = lazy(() => import('./Dashboard'));
const Footer = lazy(() => import('./Footer'));

// Component Pages
const About = lazy(() => import('./component/About'));
const Career = lazy(() => import('./component/Career'));
const Contact = lazy(() => import('./component/Contact'));
const Blog = lazy(() => import('./component/Blog'));
const ContactForm = lazy(() => import('./component/Forme/ContactForm'));
const ContactDetail = lazy(() => import('./component/Forme/ContactDetail'));
const Resume = lazy(() => import('./component/Forme/Resume'));
const Course = lazy(() => import('./component/Course'));
const AddCourse = lazy(() => import('./component/AddCourse'));
const Job = lazy(() => import('./component/uses/Job'));
const AddJob = lazy(() => import('./component/uses/AddJob'));
const ViewContactForm = lazy(() => import('./component/Forme/ViewContactForm'));
const Testimonial = lazy(() => import('./component/Testimonial'));
const AddUpdateTestimonial = lazy(() => import('./component/uses/AddUpdateTestimonial'));
const Faq = lazy(() => import('./component/Faq'));
const AddFaq = lazy(() => import('./component/uses/AddFaq'));
const StudentVideo = lazy(() => import('./component/StudentVideo'));
const AddStudentVideo = lazy(() => import('./component/uses/AddStudentVideo'));
const Login = lazy(() => import('./component/login'));
const FeAbout = lazy(() => import('./pages/About'));
const FeHeader = lazy(() => import('./pages/Header'));
const FeFooter = lazy(() => import('./pages/Footer'));
const FeBlog = lazy(() => import('./pages/Blog'));
const RegisterUser = lazy(() => import('./pages/RegisterUser'));
const FeCareer = lazy(() => import('./pages/Career'));
const TermsAndConditions = lazy(() => import('./pages/terms-conditions'));
const FeContact = lazy(() => import('./pages/Contact'));
const FeCourse = lazy(() => import('./pages/Course'));
const GalleryF = lazy(() => import('./pages/GellaryF'));
const FeIndex = lazy(() => import('./pages/Index'));
const FeSingleBlogPage = lazy(() => import('./pages/SingleBlogPage'));
const AddBlog = lazy(() => import('./component/uses/addBlog'));
const PreferenceView = lazy(() => import('./component/Preference'));
const RegisterUserAdminView = lazy(() => import('./component/UserList'));
const EditHomePage = lazy(() => import('./component/uses/EditHome'));
const RegisterForm = lazy(() => import('./component/Forme/RegisterForm'));
const Gellary = lazy(() => import('./component/Forme/Gellary'));
const AddGellary = lazy(() => import('./component/Forme/AddGellary'));
const Student = lazy(() => import('./component/Student'));
const AddStudent = lazy(() => import('./component/uses/addStudent'));
const Member = lazy(() => import('./component/Member'));
const AddMember = lazy(() => import('./component/Forme/AddMember'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const Office = lazy(() => import('./component/Office'));
const AddOffice = lazy(() => import('./component/uses/AddOffice'));
const PartnerForm = lazy(() => import('./component/Forme/PartnerForm'));
const PartnerFormView = lazy(() => import('./component/Forme/PartnerFormView'));
const NewsLetter = lazy(() => import('./component/NewsLetter'));
const SpokenEnglish = lazy(() => import('./pages/SpokenEnglish'));
const EditSpokenEnglish = lazy(() => import('./component/uses/EditSpokenEnglish'));
const Thankyou = lazy(() => import('./pages/thankyou'));


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = parseJwt(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
      if (decodedToken.exp < currentTime) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="wrapper">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route path='thank-you' element={<Thankyou />} />
            <Route path='/*' element={<HomeLayout />}>
              <Route path='' element={<FeIndex />} />
              <Route path='sign-user' element={<RegisterUser />} />
              <Route path='about' element={<FeAbout />} />
              <Route path='terms-conditions' element={<TermsAndConditions />} />
              <Route path='contact' element={<FeContact />} />
              <Route path='career' element={<FeCareer />} />
              <Route path='spoken-english' element={<SpokenEnglish />} />
              <Route path='blog' element={<FeBlog />} />
              <Route path='gallary' element={<GalleryF />} />
              <Route path='videos' element={<GalleryF />} />
              <Route path='blog-description/:slug' element={<FeSingleBlogPage />} />
              <Route path='Course/:courseId' element={<FeCourse />} />
              <Route path='*' element={<NotFoundPage />} />
            </Route>
            <Route path='login' element={<Login handleLogin={handleLogin} />} />
            {isLoggedIn ? (
              <Route path='/admin/*' element={<AdminLayout />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='main-page' element={<EditHomePage />} />
                <Route path='spoken-english' element={<EditSpokenEnglish />} />
                <Route path='about' element={<About />} />
                {/* <Route path='home' element={<Home />} /> */}
                <Route path='career' element={<Career />} />
                <Route path='contact' element={<Contact />} />
                <Route path='blog' element={<Blog />} />
                <Route path='contact-form' element={<ContactForm />} />
                <Route path='partner' element={<PartnerForm />} />
                <Route path='contact-detail' element={<ContactDetail />} />
                <Route path='resume' element={<Resume />} />
                <Route path='courses' element={<Course />} />
                <Route path='addcourse' element={<AddCourse />} />
                <Route path='editcourse/:courseId' element={<AddCourse />} />
                <Route path='all-job' element={<Job />} />
                <Route path="add-job" element={<AddJob />} />
                <Route path="edit-job/:jobId" element={<AddJob />} />
                <Route path='view-contact-form/:contactId' element={<ViewContactForm />} />
                <Route path='view-partner-form/:partnerId' element={<PartnerFormView />} />
                <Route path='testimonial' element={<Testimonial />} />
                <Route path="add-testimonial" element={<AddUpdateTestimonial />} />
                <Route path="edit-testimonial/:tId" element={<AddUpdateTestimonial />} />
                <Route path='office' element={<Office />} />
                <Route path="add-office" element={<AddOffice />} />
                <Route path="edit-office/:oId" element={<AddOffice />} />
                <Route path="faq" element={<Faq />} />
                <Route path="add-faq" element={<AddFaq />} />
                <Route path="studentvideo" element={<StudentVideo />} />
                <Route path="gellary" element={<Gellary />} />
                <Route path="add-gellary" element={<AddGellary />} />
                <Route path="add-Media" element={<AddStudentVideo />} />
                <Route path="add-blog" element={<AddBlog />} />
                <Route path="landing-page-data" element={<PreferenceView />} />
                <Route path="register-user-list" element={<RegisterUserAdminView />} />
                <Route path="edit-blog/:bId" element={<AddBlog />} />
                <Route path="register-form" element={<RegisterForm />} />
                <Route path="students" element={<Student />} />
                <Route path="member" element={<Member />} />
                <Route path="newsletter" element={<NewsLetter />} />
                <Route path="add-students" element={<AddStudent />} />
                <Route path="edit-students/:sId" element={<AddStudent />} />
                <Route path="add-member" element={<AddMember />} />
                <Route path="edit-member/:memberId" element={<AddMember />} />
              </Route>
            ) : (
              <Route path='/admin/*' element={<Login handleLogin={handleLogin} />} /> // Redirect all routes to login page if not logged in
            )}
          </Routes>
        </Router>
      </Suspense>
    </div>
  );

  function HomeLayout() {
    return (
      <HelmetProvider>
      <div className="wrapper">
        <FeHeader />
        <Outlet />
        <FeFooter />
      </div>
      </HelmetProvider>
    );
  }

  function AdminLayout() {
    return (
      <div className="wrapper">
        <Header />
        <Menu />
        <Outlet />
        <Footer />
      </div>
    );
  }

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
}

export default App;
