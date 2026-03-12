import { useRef, useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form'; // Import useForm
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { slider2settings, settings, youtubeSlider, blogSlider, testimonialSlider } from '../custom/custom'
import { Link, useNavigate } from 'react-router-dom';
import PageServices from '../services/PageServices';
import useAsync from '../hooks/useAsync';
import { constant } from '../constant/index.constant';
import DOMPurify from "dompurify";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import SEO from '../custom/seoData';

function Index() {
  const { data } = useAsync(PageServices.getAboutPageById);
  const { data: homePageData } = useAsync(PageServices.getHomePageDetails);
  const { data: course } = useAsync(PageServices.getCourse);
  const { data: testimonialsData } = useAsync(PageServices.getTestimonial);
  const { data: videoStudednt } = useAsync(PageServices.getYoutubeVideo);
  const { data: slider } = useAsync(PageServices.getStudentSlider);
  const { data: slider2 } = useAsync(PageServices.getStudentHome);
  const navigate = useNavigate();
  const [aboutPageData, setAboutPageData] = useState({})
  const [CourseData, setCourseData] = useState([])
  const [blogData, setBlogData] = useState([])
  const [video, setVideo] = useState([])
  const [testimonials, setTestimonial] = useState([])
  const [sliderData, setSliderData] = useState([])
  const [studentData, setStudentData] = useState([])
  const [homePageDetails, setHomePageDetails] = useState({});


  const fetchBlogs = useCallback(async (page = 1, category = 'All', search = '') => {
    try {
      const res = await PageServices.getBlogData({ page, limit: 5, category, search });
      setBlogData(res.data.blog || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs])

  useEffect(() => {
    if (data?.data?.page) {
      setAboutPageData(data.data.page || '')
    }
    if (homePageData?.data) {
      setHomePageDetails(homePageData?.data || {})
    }
    if (course?.data?.page) {
      setCourseData(course.data.page)
    }
    if (videoStudednt?.data?.media) {
      setVideo(videoStudednt.data.media);
    }
    if (testimonialsData?.data?.testimonial) {
      setTestimonial(testimonialsData.data.testimonial)
    }
    if (slider?.data?.media) {
      setSliderData(slider.data.media)
    }
    if (slider2?.data?.media) {
      setStudentData(slider2.data.media)
    }
  }, [data, course, testimonialsData, video, slider, slider2, homePageData, videoStudednt]);

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(homePageDetails?.Description),
  });

  const marqueeRef = useRef(null);

  // --- Register Now Form Setup ---
  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: registerErrors },
    reset: resetRegisterForm
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      studyDestination: '', // Default to empty string or a specific option if needed
      query: ''
    }
  });

  const handleUpdate = async (data) => { // 'data' now contains validated form values
    // Destructure data if needed, or use data directly
    const { name, email, mobile, studyDestination, query } = data;

    try {
      const createJob = await PageServices.createForme({
        name,
        email,
        mobileNo: mobile,
        message: query,
        studyDestination,
        type: 'register'
      });

      if (createJob.status === 'success') {
        // Reset the form fields to their default values
        resetRegisterForm();
        navigate('/thank-you');
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error("Error submitting register form:", error);
      alert('An error occurred. Please try again.'); // Provide user feedback
    }
  };

  // --- Become a Partner Form Setup ---
  const {
    register: registerPartner,
    handleSubmit: handleSubmitPartner,
    formState: { errors: partnerErrors },
    reset: resetPartnerForm
  } = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      mobile: '',
      whatsappNo: '',
      age: '',
      city: '',
      occupation: '',
      adress: '', // Note: Typo in state name 'adress' kept for consistency with original logic
      howDidyouKnow: '',
      qualifications: '',
      query: ''
    }
  });

  const handleUpdate2 = async (data) => { // 'data' now contains validated form values
    // Destructure data if needed, or use data directly
    const {
      name, lastName, email, mobile, whatsappNo, age, city,
      occupation, adress, howDidyouKnow, qualifications, query
    } = data;

    try {
      // Make an API call to update the data
      const createJob = await PageServices.createForme({
        name,
        email,
        mobileNo: mobile,
        lastName,
        whatsappNo,
        city,
        age,
        occupation,
        adress, // Keep typo for consistency
        howDidyouKnow,
        qualification: qualifications,
        message: query,
        type: 'partner'
      });



      if (createJob.status === 'success') {
        // Reset the form fields to their default values
        resetPartnerForm();

        const modalEl = document.getElementById("partnerModal");

        // Manually hide the modal
        modalEl.classList.remove("show");
        modalEl.style.display = "none";
        modalEl.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        // Remove backdrop
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) backdrop.remove();// ✅ safer method
        navigate('/thank-you');
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error("Error submitting partner form:", error);
      alert('An error occurred. Please try again.'); // Provide user feedback
    }
  };


  return (
    <>
    <SEO page="default" />
      <section className="hero-sec">
        <div className="banner-sec">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="banner-content-sec">
                  <h1>{homePageDetails?.Title?.split(';')[0]} <br /><span>{homePageDetails?.Title?.split(';')?.slice(1, homePageDetails?.Title?.split(';')?.length)?.join(" ")}</span></h1>
                  <h2 className='vetting-subtittle mb-1'>{homePageDetails?.SubTitle ? homePageDetails.SubTitle : ''}</h2>
                  <div dangerouslySetInnerHTML={sanitizedData()}></div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="banner-img-sec text-center">
                  <img loading='lazy' src={`${constant.REACT_APP_URL}/uploads/${homePageDetails.image}`} alt='hero banner' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-us-sec py-70">
        <div className="container">
          <h2 className="heading bottom-divider">About us</h2>
          <div className="about-us-inner">
            <div className="row ">
              <div className="col-md-5">
                <div className="about-us-left">
                  <div className="about-us-img-box">
                    <img loading='lazy' src={`${constant.REACT_APP_URL}/uploads/${aboutPageData?.image}`} alt='Gateway Abroad' />
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="about-us-right ps-3">
                  <h3 className="sub-heading">Who Are We?</h3>
                  <p className="descp">{aboutPageData.pageTitle ? aboutPageData.pageTitle : `Gateway Abroad is run by a team of British education consultants who have themselves been students in various UK universities for a number of years. We are connected to a large network of overseas students and staff currently studying or working in universities throughout the UK. Through this network and through our in-house experience, we are able to find the best solution for each student, depending on specific requirements.`}</p>
                  <Link to="/about" className="site-btn">Know More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="coaching-service-sec py-60">
        <div className="container">
          <h2 className="heading text-center d-block">Best in the Industry Coaching Services</h2>
          <div className="row justify-content-center">
            {constant.TEST_PREPARATION.map((x) => {
              return (
                <div key={x.text1} className="col-lg-3 col-md-4 col-6">
                  <div className="coaching-service-box">
                    <img src={`assets/img/${x.imageName}`} alt={x.imageName} />
                    <p className="descp">
                      {x.text1}
                      {x.text2 && <br />}
                      {x.text2}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="student-info-sec py-60 linear-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="students-info-left">
                <h3 className="sub-heading text-center">Established in <span>2009</span>, this institute is a leader in preparing students for standardized tests like GMAT, GRE, SAT, TOEFL, IELTS, and PTE.</h3>
                {studentData.length == 1 ?
                  <div className="student-info-slider">
                    <div className="student-info-slider-inner">
                      <div className='st-img-field'>
                        <img src={`${constant.REACT_APP_URL}/uploads/${studentData?.[0].image}`} alt='icon' />
                        <div className='student-info-name-rank'>
                          <div className='st-name'><h5>{studentData[0].name}</h5></div>
                          <div className='st-rank'><p>{studentData[0].courseName} Score</p><h5>{studentData[0].rank}</h5></div>
                        </div>
                      </div>
                      <h6>{studentData[0].content}</h6>
                    </div>
                  </div> :
                  <Slider {...slider2settings} className="student-info-slider">
                    {studentData.map((s) => (
                      <div key={s.image} className="student-info-slider-inner">
                        <div className='st-img-field'>
                          <img src={`${constant.REACT_APP_URL}/uploads/${s.image}`} alt='Student Profile' />
                          <div className='student-info-name-rank'>
                            <div className='st-name'><h5>{s.name}</h5></div>
                            <div className='st-rank'><p>{s.courseName} Score</p><h5>{s.rank}</h5></div>
                          </div>
                        </div>
                        <h6>{s.content}</h6>
                      </div>
                    ))}
                  </Slider>}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="students-info-right">
                <div className="register-form">
                  <h3 className="sub-heading text-center text-uppercase">Register Now</h3>
                  {/* --- Updated Register Form --- */}
                  <form onSubmit={handleSubmitRegister(handleUpdate)}>
                    <div className="input-field">
                      <input
                        type="text"
                        {...registerRegister("name", { required: "Name is required" })}
                        className={`form-control ${registerErrors.name ? 'is-invalid' : ''}`}
                        placeholder="Name"
                      />
                      {registerErrors.name && <div className="invalid-feedback">{registerErrors.name.message}</div>}
                    </div>
                    <div className="input-field">
                      <input
                        type="email"
                        {...registerRegister("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address"
                          }
                        })}
                        className={`form-control ${registerErrors.email ? 'is-invalid' : ''}`}
                        placeholder="Email"
                      />
                      {registerErrors.email && <div className="invalid-feedback">{registerErrors.email.message}</div>}
                    </div>
                    <div className="input-field">
                      <input
                        type="text"
                        {...registerRegister("mobile", {
                          required: "Phone is required",
                          pattern: {
                            value: /^\d{10,15}$/, // Adjust pattern as needed
                            message: "Invalid phone number"
                          }
                        })}
                        className={`form-control ${registerErrors.mobile ? 'is-invalid' : ''}`}
                        placeholder="Phone"
                      />
                      {registerErrors.mobile && <div className="invalid-feedback">{registerErrors.mobile.message}</div>}
                    </div>
                    <div className="input-field">
                      <select
                        {...registerRegister("studyDestination", { required: "Test Preparation is required" })}
                        className={`form-select ${registerErrors.studyDestination ? 'is-invalid' : ''}`}
                        aria-label="Default select example"
                      >
                        <option value="">Test Preparation</option>
                        <option value='GMAT'>GMAT</option>
                        <option value='IELTS'>IELTS</option>
                        <option value="TOEFL">TOEFL</option>
                        <option value="GRE">GRE</option>
                        <option value="PTE">PTE</option>
                        <option value="SAT">SAT</option>
                      </select>
                      {registerErrors.studyDestination && <div className="invalid-feedback">{registerErrors.studyDestination.message}</div>}
                    </div>
                    <div className="input-field">
                      <textarea
                        {...registerRegister("query")}
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows={2}
                        placeholder="Message"
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">SUBMIT</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="student-info-rank-sec">
        <div className="established-sec">
          <p>Since 2009</p>
        </div>
        <Slider {...settings} className="student-info-rank-slider">
          {sliderData.map((s, index) => (
            <div key={index} className="student-info-rank-inner">
              <p className="st-name">{s.name}</p>
              <p className="st-uni-name">{s.courseName} {s.rank}</p>
            </div>
          ))}
        </Slider>
      </section>
      <marquee ref={marqueeRef} className="marquee-product" behavior="alternate" direction="right" scrollamount={5} onMouseEnter={() => marqueeRef.current.stop()}
        onMouseLeave={() => marqueeRef.current.start()}>
        {sliderData.map((s, index) => (
          <small key={index} id="studentname">{s.name} {s.courseName} <small id="studentscores">{s.rank}</small></small>
        ))}
      </marquee>
      <section className="test-preparation-sec py-70">
        <div className="container">
          <h2 className="heading bottom-divider">Test Preparation</h2>
          <div className="row gy-4 justify-content-center">
            {CourseData.map((course) => (
              <div className="col-lg-4 col-6" key={course._id}>
                <Link to={`course/${course.pageName}`} className="test-pre-box">
                  <div>
                    <h4 className="text-uppercase">{course.pageName}</h4>
                    <p>{course.pageTitle}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="our-working-process-sec py-60">
        <div className="container">
          <h2 className="heading text-center d-block mb-3">Our working Process</h2>
          <p className="descp text-center">A platform that takes care of everything beforehand. Gateway Abroad  sources,<br /> vets, matches and manages all the talents.</p>
          <div className="vetting-process-section-inner pt-5 mt-5">
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12 text-right vetting-process-section-left" style={{ position: 'relative' }}>
                <div className="vetting-content vp1 vetting-left-p1">
                  <div className="vetting-box">
                    <img src="assets/img//vetting2.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#00817d' }}>Teach</h3>
                    <p className="vetting-subtittle">Guiding individuals through a comprehensive process aimed at clearing the fundamentals of the students.
                    </p>
                  </div>
                </div>
                <div className="vetting-content vp2 vetting-left-p1">
                  <div className="vetting-box">
                    <img src="assets/img//vetting4.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#7e5c6a' }}>Feedback & Mock</h3>
                    <p className="vetting-subtittle">Regularly engage in mock exams and feedback sessions to familiarize yourself with the exam environment, improve time management, and identify areas that need further attention.</p>
                  </div>
                </div>
                <div className="vetting-content vp3 vetting-left-p1">
                  <div className="vetting-box">
                    <img src="assets/img//vetting6.svg" alt="ampityinfotech" />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 d-lg-block d-md-none d-none">
                <div className="vetting-number">
                  <img src="assets/img//vaetting-process-number.svg" alt="ampityinfotech" />
                </div>
              </div>
              <div className="col col-lg-4 col-md-12 col-sm-12 tex-left vetting-process-section-right" style={{ position: 'relative' }}>
                <div className="vetting-content vp4 vetting-left-p2">
                  <div className="vetting-box">
                    <img src="assets/img//vetting1.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#ffa515' }}>Counsell</h3>
                    <p className="vetting-subtittle">It involves providing personalized advice to aid students in selecting the most suitable exam for their desired countries.</p>
                  </div>
                </div>
                <div className="vetting-content vp5 vetting-left-p2">
                  <div className="vetting-box">
                    <img src="assets/img//vetting3.svg" alt="ampityinfotech" style={{ maxWidth: '100px' }} />
                    <h3 className="vetting-tittle" style={{ color: '#ff5e5b' }}>Practice</h3>
                    <p className="vetting-subtittle">Engaging in regular and focused practice not only enhances one's understanding of the material but also hones skills, refines problem-solving abilities, and builds confidence.</p>
                  </div>
                </div>
                <div className="vetting-content vp6 vetting-left-p2">
                  <div className="vetting-box">
                    <img src="assets/img//vetting5.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#ff824b' }}>Book Test Date</h3>
                    <p className="vetting-subtittle">Test date booking facility offered by Gateway Abroad.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mobile-vetting-process vetting-process-section py-60">
        <div className="container">
          <h2 className="heading text-center d-block mb-3">Our working Process</h2>
          <p className="descp text-center">A platform that takes care of everything beforehand. Gateway Abroad  sources,<br /> vets, matches and manages all the talents.</p>
          <div className="vetting-process-section-inner pt-3">
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12 text-left" style={{ position: 'relative' }}>
                <div className="vetting-content vp4 vetting-left-p2">
                  <div className="vetting-box">
                    <div className="vetting-num">1</div>
                    <img src="assets/img//vetting1.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#ffa515' }}>Counsell</h3>
                    <p className="vetting-subtittle">It involves providing personalized advice to aid students in selecting the most suitable exam for their desired countries.</p>
                  </div>
                </div>
                <div className="vetting-content vp1 vetting-left-p1">
                  <div className="vetting-box">
                    <div className="vetting-num">2</div>
                    <img src="assets/img//vetting2.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#00817d' }}>Teach</h3>
                    <p className="vetting-subtittle">Guiding individuals through a comprehensive process aimed at clearing the fundamentals of the students.</p>
                  </div>
                </div>
                <div className="vetting-content vp5 vetting-left-p2">
                  <div className="vetting-box">
                    <div className="vetting-num">3</div>
                    <img src="assets/img//vetting3.svg" alt="ampityinfotech" style={{ maxWidth: '100px' }} />
                    <h3 className="vetting-tittle" style={{ color: '#ff5e5b' }}>Practice</h3>
                    <p className="vetting-subtittle">Engaging in regular and focused practice not only enhances one's understanding of the material but also hones skills, refines problem-solving abilities, and builds confidence.</p>
                  </div>
                </div>
                <div className="vetting-content vp2 vetting-left-p1">
                  <div className="vetting-box">
                    <div className="vetting-num">4</div>
                    <img src="assets/img//vetting4.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#7e5c6a' }}>Feedback & Mock</h3>
                    <p className="vetting-subtittle">Regularly engage in mock exams and feedback sessions to familiarize yourself with the exam environment, improve time management, and identify areas that need further attention.</p>
                  </div>
                </div>
                <div className="vetting-content vp6 vetting-left-p2">
                  <div className="vetting-box">
                    <div className="vetting-num">5</div>
                    <img src="assets/img//vetting5.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#ff824b' }}>Book Test Date</h3>
                    <p className="vetting-subtittle">Test date booking facility offered by Gateway Abroad.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="student-yt-testimonials py-70">
        <div className="container">
          <h2 className="heading bottom-divider">What Our Students Say</h2>
          <Slider {...youtubeSlider} className="student-yt-slider">
            {video.map((video) => (
              <div className="student-yt-slider-inner" key={video._id}>
                <iframe width={530} height={310} src={`https://www.youtube.com/embed/${video.mediaLink}`} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <section className="our-testimonials py-70">
        <div className="container">
          <h2 className="heading bottom-divider mb-0">Our Testimonials</h2>
          {testimonials.length == 1 ?
            <div className="our-testimonials-slider-inner single-testmonial" >
              <div className="student-test-box">
                <div className="stundent-content">
                  <div className="d-flex align-items-center justify-content-between">
                    <h6>{testimonials[0].name}</h6>
                    <ul className="list-unstyled d-flex">
                      <li><span><i className="fa fa-star" /></span></li>
                      <li><span><i className="fa fa-star" /></span></li>
                      <li><span><i className="fa fa-star" /></span></li>
                      <li><span><i className="fa fa-star" /></span></li>
                      <li><span><i className="fa fa-star" /></span></li>
                    </ul>
                  </div>
                  <p className="descp">{testimonials[0].content.substring(0, 250)}</p>
                </div>
                <div className="test-univ-sec">
                  <h5></h5>
                </div>
              </div>
            </div> :
            <Slider {...testimonialSlider} className="our-testimonials-slider">
              {testimonials.map((test) => (
                <div className="our-testimonials-slider-inner" key={test._id}>
                  <div className="student-test-box">
                    <div className="stundent-content">
                      <div className="d-flex align-items-center justify-content-between">
                        <h6>{test.name}</h6>
                        <ul className="list-unstyled d-flex">
                          <li><span><i className="fa fa-star" /></span></li>
                          <li><span><i className="fa fa-star" /></span></li>
                          <li><span><i className="fa fa-star" /></span></li>
                          <li><span><i className="fa fa-star" /></span></li>
                          <li><span><i className="fa fa-star" /></span></li>
                        </ul>
                      </div>
                      <p className="descp">{test.content.substring(0, 250)}</p>
                    </div>
                    <div className="test-univ-sec">
                      <h5></h5>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          }
        </div>
      </section>
      <section className="blog-section py-70">
        <div className="container">
          <div className="title d-flex justify-content-between align-items-center mb-4">
            <h2 className="heading bottom-divider mb-0">Important Facts &amp; Information</h2>
            <Link to="/blog" className="ms-4 site-btn">Go to blog</Link>
          </div>
          <div className="blog-section-inner">
            <Slider {...blogSlider} className="blog-section-slider">
              {blogData.map((blog) => (
                <div onClick={() => navigate(`/blog-description/${blog.Slug}`)} className="blog-section-slider-inner cursor-pointer" key={blog.id}>
                  <div className="blog-card" >
                    <div className="card">
                      <div className="card-img-top" >
                        <img src={`${constant.REACT_APP_URL}/uploads/${blog.image}`} alt="blog-img" />
                      </div>
                      <div className="card-body ps-0 pb-0">
                        <h5 className="card-title">
                          <Link>{blog.blogTitle}</Link></h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
      <section className="app-banner-section">
        <div className="container">
          <div className="app-banner-section-inner">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="app-banner-content-left">
                  <h2 className="mb-3">Become a Partner</h2>
                  <p className="mb-4">Join thousand of instructors and earn money hassle free!</p>
                  <Link className="site-btn" to="" data-bs-toggle="modal" data-bs-target="#partnerModal">Apply Now</Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="app-banner-content-right text-center">
                  <img src="assets/img//partner-img.svg" alt="partner" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* become a partner popup form */}
      <div className="modal right fade" id="partnerModal" tabIndex={-1} aria-labelledby="partnerModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="partnerModalLabel">Become A Partner</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="get-in-touch-form">
                {/* --- Updated Partner Form --- */}
                <form onSubmit={handleSubmitPartner(handleUpdate2)}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-field">
                        <input
                          type="text"
                          {...registerPartner("name", { required: "First Name is required" })}
                          className={`form-control ${partnerErrors.name ? 'is-invalid' : ''}`}
                          placeholder="First Name"
                        />
                        {partnerErrors.name && <div className="invalid-feedback">{partnerErrors.name.message}</div>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-field">
                        <input
                          type="text"
                          {...registerPartner("lastName", { required: "Last Name is required" })}
                          className={`form-control ${partnerErrors.lastName ? 'is-invalid' : ''}`}
                          placeholder="Last Name"
                        />
                        {partnerErrors.lastName && <div className="invalid-feedback">{partnerErrors.lastName.message}</div>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-field">
                        <input
                          type="email"
                          {...registerPartner("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email address"
                            }
                          })}
                          className={`form-control ${partnerErrors.email ? 'is-invalid' : ''}`}
                          placeholder="Email"
                        />
                        {partnerErrors.email && <div className="invalid-feedback">{partnerErrors.email.message}</div>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-field">
                        <input
                          type="text"
                          {...registerPartner("mobile", {
                            required: "Mobile No. is required",
                            pattern: {
                              value: /^\d{10,15}$/, // Adjust pattern as needed
                              message: "Invalid phone number"
                            }
                          })}
                          className={`form-control ${partnerErrors.mobile ? 'is-invalid' : ''}`}
                          placeholder="Mobile No."
                        />
                        {partnerErrors.mobile && <div className="invalid-feedback">{partnerErrors.mobile.message}</div>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-field">
                        <input
                          type="text"
                          {...registerPartner("whatsappNo", {
                          })}
                          className={`form-control ${partnerErrors.whatsappNo ? 'is-invalid' : ''}`}
                          placeholder="WhatsApp No."
                        />
                        {partnerErrors.whatsappNo && <div className="invalid-feedback">{partnerErrors.whatsappNo.message}</div>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-field">
                        <input
                          type="number"
                          {...registerPartner("age", { min: 0, max: 120 })} // Optional: Add min/max
                          className="form-control"
                          placeholder="Age"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-field">
                        <input
                          type="text"
                          {...registerPartner("city", { required: "City is required" })}
                          className={`form-control ${partnerErrors.city ? 'is-invalid' : ''}`}
                          placeholder="City"
                        />
                        {partnerErrors.city && <div className="invalid-feedback">{partnerErrors.city.message}</div>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-field">
                        <input
                          type="text"
                          {...registerPartner("occupation", { required: "Occupation is required" })}
                          className={`form-control ${partnerErrors.occupation ? 'is-invalid' : ''}`}
                          placeholder="What is your current Occupation?"
                        />
                        {partnerErrors.occupation && <div className="invalid-feedback">{partnerErrors.occupation.message}</div>}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-field type-file-field">
                        <textarea
                          {...registerPartner("adress", { required: "Address is required" })}
                          className={`form-control ${partnerErrors.adress ? 'is-invalid' : ''}`} // Keep typo for consistency
                          id="yourAddress"
                          rows={2}
                          placeholder="Your Address"
                        ></textarea>
                        {partnerErrors.adress && <div className="invalid-feedback">{partnerErrors.adress.message}</div>} {/* Keep typo for consistency */}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-field">
                        <select
                          {...registerPartner("howDidyouKnow", { required: "Please select how you know about us" })}
                          className={`form-control ${partnerErrors.howDidyouKnow ? 'is-invalid' : ''}`}
                          aria-label="Default select example"
                        >
                          <option value="">How did you come to know about Gateway Abroad?</option>
                          <option value='google'>Google Ad</option>
                          <option value='facebook'>Facebook Ad</option>
                          <option value='email'>Email Campaign</option>
                          <option value='sms' >SMS Campaign</option>
                          <option value='whatsapp'>WhatsApp</option>
                          <option value='linkedin'>Linkedin</option>
                          <option value='reference'>Reference</option>
                          <option value='newspaper'>Newspaper</option>
                          <option value='website' >Website</option>
                          <option value='call'>Call</option>
                          <option value='instagram'>Instagram</option>
                          <option value='other'>Other</option>
                        </select>
                        {partnerErrors.howDidyouKnow && <div className="invalid-feedback">{partnerErrors.howDidyouKnow.message}</div>}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-field type-file-field">
                        <textarea
                          {...registerPartner("qualifications", { required: "Qualifications are required" })}
                          className={`form-control ${partnerErrors.qualifications ? 'is-invalid' : ''}`}
                          id="qualifications"
                          rows={2}
                          placeholder="What are your Educational Qualifications?"
                        ></textarea>
                        {partnerErrors.qualifications && <div className="invalid-feedback">{partnerErrors.qualifications.message}</div>}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-field type-file-field">
                        <textarea
                          {...registerPartner("query", { required: "Introduction is required" })}
                          className={`form-control ${partnerErrors.query ? 'is-invalid' : ''}`}
                          id="introduction"
                          rows={2}
                          placeholder="Please provide a Brief Introduction about yourself"
                        ></textarea>
                        {partnerErrors.query && <div className="invalid-feedback">{partnerErrors.query.message}</div>}
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">SUBMIT</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index;