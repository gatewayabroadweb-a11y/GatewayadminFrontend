import React, { useEffect, useState } from 'react';
import PageServices from '../services/PageServices'
import useAsync from '../hooks/useAsync';

import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import SEO from '../custom/seoData';



function About() {

  const { data } = useAsync(PageServices.getAboutPageById);
  // const { data: faq, loading: faqL, error: faqE, run: faqRun } = useAsync(PageServices.getAllFaq);
  const { data: member } = useAsync(PageServices.getMember);

  const [pageTitle, setPageTitle] = useState('');
  const [description, setDescription] = useState('');
  const [, setPageName] = useState('');
  const [, setHtmlData] = useState('');
  const [form, setform] = useState([]);
  const [nationalOfc, setNationalofc] = useState(11);
  const [interNationalOfc, setInterNationalOfc] = useState(11);
  const [students, setStudents] = useState(1000000);
  const [experience, setExperience] = useState(15);
  // useEffect to trigger the async function on mount
  // const getAllfaqData = async() => {
  //   try{
  //     const response = await PageServices.getAllFaqForFront("About");
  //         if (response.status === 'success') {
  //           setFaqData(response.data.faq||[])
  //         } else {
  //           console.log('something went wrong');
  //         }

  //   }catch(error){
  //     console.error('Error fetching data:', error);
  //   }
  // }

  // useEffect to update form fields when data changes
  useEffect(() => {
    // Check if data is available and update form fields
    if (data?.data?.page) {
      setPageTitle(data.data.page.pageTitle || ''); // Replace 'pageTitle' with the actual key from your API response
      setPageName(data.data.page.pageName || '');
      setHtmlData(data.data.page.htmldes || ''); // Replace 'pageTitle' with the actual key from your API response
      setDescription(data.data.page.description || ''); // Replace 'description' with the actual key from your API response
      setExperience(data.data.page.experience || 0)
      setInterNationalOfc(data.data.page.interNationalOfc || 0)
      setNationalofc(data.data.page.nationalOfc || 0)
      setStudents(data.data.page.students || 0)
    }

    if (member?.data?.member) {
      setform(member.data.member || []); // Assuming data.data.form is an array of contact objects
    }
    // getAllfaqData()
  }, [data, member]);

  const [counted, setCounted] = useState(0);

  const handleScroll = () => {
    if (counted === 0 && window.scrollY > 200) {
      document.querySelectorAll('.count').forEach(element => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 3000; // Set the desired duration for the animation

        let start;
        const updateCounter = timestamp => {
          if (!start) start = timestamp;

          const progress = timestamp - start;
          const increment = (target / duration) * progress;

          element.innerText = Math.ceil(increment);

          if (progress < duration) {
            requestAnimationFrame(updateCounter);
          } else {
            element.innerText = target;
          }
        };

        requestAnimationFrame(updateCounter);
      });

      setCounted(1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [counted]);
  const meta = {
    title: 'About Us',
    description: 'Learn about our company.',
    // Add more meta tags as needed
  };
  return (
    <>
    <SEO page="about" />
      <div>

        <section className='hero-sec'>

          <div className="banner-sec">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="banner-content-sec">
                    <h1>About <span>Us</span></h1>
                    <p>Gateway Abroad: Your Launchpad to Global Education
                      We empower students to achieve their dreams of studying abroad with expert coaching for: IELTS, TOEFL, PTE, GRE, GMAT, SAT
                      Our experienced faculty, personalized guidance, and proven track record helps navigate admissions, secure scholarships, hence ensure success.
                      <br /><br /> Join us and unlock your limitless potential!</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="banner-img-sec text-center">
                    <img src="assets/img/about-us-banner-img.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ======== hero section end ===== */}
        {/* ======== about us section start ===== */}
        <section className="about-us-sec py-70">
          <div className="container">
            <div className="about-us-inner">
              <div className="row align-items-center">
                <div className="col-md-5">
                  <div className="about-us-left-new">
                    <img src="assets/img/about-us-img-1.svg" />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="about-us-right-new ps-3">
                    <h2 className="heading">Who Are We?</h2>
                    <p className="descp">{pageTitle ? pageTitle : 'Gateway Abroad is run by a team of British education consultants who have themselves been students in various UK universities for a number of years. We are connected to a large network of overseas students and staff currently studying or working in universities throughout the UK. Through this network and through our in-house experience, we are able to find the best solution for each student, depending on specific requirements.'}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="about-us-inner">
              <div className="row align-items-center">
                <div className="col-md-7">
                  <div className="about-us-right-new ps-3">
                    <h2 className="heading">What Will We Do for You?</h2>
                    <p className="descp">{description ? description : 'Gateway Abroad will be your direct window to British further education. Selecting a university for postgraduate studies in an unfamiliar country can be a daunting task. Gateway Abroad will help you to find the right university, based on your individual requirements. Once a pre-selection is made, we can contact the institutions and make all enquiries and admissions arrangements on your behalf.'}</p>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="about-us-left-new">
                    <img src="assets/img/about-us-img-2.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ======== about us section end ===== */}
        {/* ======== number counter section start ===== */}
        <section className="number-counter-section">
          <div className="container">
            <div className="number-counter-inner">
              <div className="counter-box">
                <h4 className="count" data-target={nationalOfc}>{nationalOfc}</h4>
                <p>National Office</p>
              </div>
              <div className="counter-box">
                <h4 className="count" data-target={interNationalOfc}>{interNationalOfc}+</h4>
                <p>International Office</p>
              </div>
              <div className="counter-box">
                <h4 className="count" data-target={students}>{students}+</h4>
                <p>Students</p>
              </div>
              <div className="counter-box">
                <h4 className="count" data-target={experience}>{experience}+</h4>
                <p>Experience</p>
              </div>
            </div>
          </div>
        </section>
        {/* ======== number counter section end ===== */}
        {/* ======== people behind us section start ===== */}
        <section className="people-behind-us-section py-70">
          <div className="container">
            <h2 className="heading text-center d-block">People behind Gateway Abroad</h2>
            <div className="behind-us-inner pt-4">
              <div className="row gy-4 justify-content-center">
                {form.map((m) => (

                  <div className="col-lg-6 col-md-6" key={m._id}>
                    <div className="profile-card">
                      <div className="top-red-header">
                        {/* <div className="profile-card-img">
                      <img src={`${constant.REACT_APP_URL}/uploads/${m.image}`} alt="profile-img" />
                    </div> */}
                        <h4>{m.name}</h4>
                      </div>
                      <div className="profile-card-body">
                        <div className="scroll-container">
                          <p className="descp">{m.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="app-banner-section counselling-session-sec">
          <div className="container">
            <div className="app-banner-section-inner counselling-session-sec-inner">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="app-banner-content-left">
                    <h2 className="mb-3">Avail A Complementary Counselling Session</h2>
                    <p className="mb-4">Join thousand of instructors and earn money hassle free!</p>
                    <Link to='/contact' className='site-btn'>Contact us</Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="app-banner-content-right text-center">
                    <img src="assets/img/counselling-session.svg" alt="partner" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ======== become partner section end ===== */}

      </div>
    </>
  )
}

export default About