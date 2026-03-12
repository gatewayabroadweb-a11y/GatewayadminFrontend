import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { testimonialSlider } from '../custom/custom'
import PageServices from '../services/PageServices';
import DOMPurify from "dompurify";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import DocumentMeta from 'react-document-meta';
import { constant } from '../constant/index.constant';
import SEO from '../custom/seoData';

function SpokenEnglish() {
  const [spokenEnglishDetails, setspokenEnglishDetails] = useState({});
  
  React.useEffect(() => {
    getSpokenEnglish();
  }, [])

  const getSpokenEnglish = async () => {
    try {
      const response = await PageServices.getSpokenEnglishDetails();
      if (response.status === 'success') {
        setspokenEnglishDetails(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [testimonials, setTestimonial] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const getAllfaqData = async (value) => {
    try {
      const response = await PageServices.getAllFaqForFront(value);
      if (response.status === 'success') {
        setFaqData(response.data.faq || [])
      } else {
        console.log('something went wrong');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const getAllTestimonial = async (value) => {
    try {
      const response = await PageServices.getTestimonialByCat(value);
      if (response.status === 'success') {
        setTestimonial(response.data.testimonial || [])
      } else {
        console.log('something went wrong');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getAllfaqData("spokenEnglish");
    getAllTestimonial("spokenEnglish");
  }, []);

  const meta = {
    title: "Spoken English",
    description: 'Learn about our company.',
    // Add more meta tags as needed
  };

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(spokenEnglishDetails?.Description),
  });

  return (
    <div>
<SEO page="spoken-english" />
      <section>
        <div className="banner-sec banner-new-bg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="banner-content-sec">
                  <h1>{spokenEnglishDetails?.Title?.split(';')[0]} <span>{spokenEnglishDetails?.Title?.split(';')?.slice(1, spokenEnglishDetails?.Title?.split(';')?.length)?.join(" ")}</span></h1>
                  <h2 className='vetting-subtittle mb-1'>{spokenEnglishDetails?.SubTitle ? spokenEnglishDetails.SubTitle : ''}</h2>
                  <div dangerouslySetInnerHTML={sanitizedData()}></div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="contact-us-img text-center">
                  <img loading='lazy' src={`${constant.REACT_APP_URL}/uploads/${spokenEnglishDetails.image}`} alt='hero banner' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="contact-us-section py-70">
        <div className="container">
          <div className="get-in-touch-section">
            <h2 className="heading text-center d-block mb-3">Why Choose Gateway Abroad for Spoken English Classes ?</h2>
            <div className="spoken-english-feature-section pt-4">
              <div className="row gy-3 justify-content-center">
                {spokenEnglishDetails.WhyChoose?.map((data) => {
                  return <React.Fragment key={data.iconImage}>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="features-guide-box">
                        <div className="features-guide-left">
                          <img decoding="async" src={`${constant.REACT_APP_URL}/uploads/${data.iconImage}`} alt="" />
                        </div>
                        <div className="features-guide-right">
                          <strong>{data.title}</strong>
                          {data?.content}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======== Our Testimonials section start ===== */}
      <section className="our-testimonials py-70 gmat-testimonials">
        <div className="container">
          <h2 className="heading text-center d-block">What Our Spoken English Prep Achievers Say</h2>
          {testimonials.length === 1 ?
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
              </div>
            </div> :
            <Slider {...testimonialSlider} className="our-testimonials-slider">
              {testimonials.map((test) => (
                <div className="our-testimonials-slider-inner" key={test.id}>
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
                      {/* <div className="student-img">
                    <img src={`${constant.REACT_APP_URL}/uploads/${test.image}`} />
                  </div> */}
                    </div>
                    <div className="test-univ-sec">
                      {/* <h5>{test.univercity.substring(0, 30)}</h5> */}
                    </div>
                  </div>
                </div>
              ))}

            </Slider>
          }
        </div>
      </section>
      {/* ======== Our Testimonials section start ===== */}
      <section className="english-components-section py-70">
        <div className="container">
          <div className="title text-center mb-5">
            <h2 className="heading mb-2">Components of the English Language</h2>
            <p className="descp text-center">The English language can be broken down into several key components that work together to create meaning</p>
          </div>
          <div className="english-components-section-inner">
            <div className="row">
              <div className="col-lg-5">
                <div className="english-components-inner-left text-center">
                  <img src="assets/img/english-components-img.svg" alt='english-components' />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="english-components-inner-right">
                  <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    {spokenEnglishDetails?.ComponentsLanguage?.map((data, index) => {
                      return (
                        <li className="nav-item" key={index} role="presentation">
                          <button
                            className={`nav-link ${index === 0 ? 'active' : ""}`}
                            id={data.id}
                            data-bs-toggle="pill"
                            data-bs-target={`#${data.section}`}
                            type="button"
                            role="tab"
                            aria-controls={`${data.section}`}
                            aria-selected="true"
                          >
                            {data.section}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    {spokenEnglishDetails?.ComponentsLanguage?.map((data, index) => {
                      return (
                        <div
                          key={data.section}
                          className={`tab-pane fade ${index === 0 ? " show active" : ""}`}
                          id={`${data.section}`}
                          role="tabpanel"
                          aria-labelledby={`${data.section}`}
                        >
                          <p className="descp mb-2">
                            {data.content}
                          </p>
                          {data.components.map((innerData, index) => {
                            return (
                              <p key={`${innerData.name}_${index}`} className="descp mb-2"><strong>{innerData.name}</strong>
                                &nbsp;{innerData.description}
                              </p>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== FAQs section start ===== */}
      <section className="faq-section py-70 mb-0">
        <div className="container">
          <div className="title text-center mb-5">
            <h2 className="heading mb-2">Frequently asked questions</h2>
            <p className="descp text-center">Can't find the answer you are looking for?</p>
          </div>
          <div className="faq-section-container">
            <div className="accordion" id="accordionExample">
              {faqData.map((f, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className={`accordion-button ${activeIndex === index ? '' : 'collapsed'}`}
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={activeIndex === index ? 'true' : 'false'}
                      aria-controls={`collapse${index}`}
                    >
                      {f.title}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {f.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ======== FAQs section end ===== */}


      <section className="pricing-plan-section py-70 linear-bg spoken-english">
        <div className="container">
          <div className="price-title">
            <h2 className="heading mb-2">Plans &amp; Pricing</h2>
            <p className="descp">We are accepting PayPal, Paytm, PhonePe and Debit &amp; Credit Card</p>
          </div>
          <div className="pricing-plan-section-inner">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6">
                <div className="pricing-card">
                  {/* <h4 className="price">$19 <span>/month</span></h4> */}
                  <h5 className="plan-name">Classroom training</h5>
                  <div className="plan-offer-list">
                    <ul className="list-unstyled">
                      <li>Tired of feeling tongue-tied? Gateway Abroad's interactive English test preparation classes are designed to transform you from shy to shine!  Our engaging classroom environment provides a supportive space where you'll gain the confidence and fluency you need to ace your English language exam</li>
                      <li>Don’t just learn English, live it. Our interactive spoken English classes get you talking from day one.</li>
                    </ul>
                  </div>
                  <div className='text-center'>
                    <Link to="#" className="choose-plan-btn site-btn" data-bs-toggle="modal" data-bs-target="#getintouchModel">Choose Plan</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="pricing-card">
                  {/* <h4 className="price">$54 <span>/month</span></h4> */}
                  <h5 className="plan-name">Live online training</h5>
                  <div className="plan-offer-list">
                    <ul className="list-unstyled">
                      <li>Can't make it to a physical classroom? No problem! Gateway Abroad's comprehensive online English test preparation classes offer the same exceptional instruction and proven results  - all from the comfort of your own home.</li>
                      <li>Fit fluency into your busy schedule. Gateway Abroad’s online spoken English courses offer flexibility and results.</li>
                    </ul>
                  </div>
                  <div className='text-center'>
                    <Link to="#" className="choose-plan-btn site-btn" data-bs-toggle="modal" data-bs-target="#getintouchModel">Choose Plan</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="pricing-card most-popular-card">
                  <div className="most-p-btn-outer">
                    <button className="most-p-btn">Most Popular</button>
                  </div>
                  {/* <h4 className="price">$89 <span>/month</span></h4> */}
                  <h5 className="plan-name">Hybrid</h5>
                  <div className="plan-offer-list">
                    <ul className="list-unstyled">
                      <li>Get   the   best   of   both worlds  with  our  hybrid courses - the flexibility of   online   learning combined   with   the personalized support of in-person instruction!</li>
                      <li>Do you crave the structure and focus of a classroom environment, but also enjoy the flexibility of online learning? Gateway Abroad's hybrid English test preparation classes offer the perfect solution!</li>
                    </ul>
                  </div>
                  <div className='text-center'>
                    <Link to="#" className="choose-plan-btn site-btn" data-bs-toggle="modal" data-bs-target="#getintouchModel">Choose Plan</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======== become partner section start ===== */}
      <section className="app-banner-section counselling-session-sec">
        <div className="container">
          <div className="app-banner-section-inner counselling-session-sec-inner">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="app-banner-content-left">
                  <h2 className="mb-3">Avail A Complementary Counselling Session</h2>
                  <p className="mb-4">Join thousand of instructors and earn money hassle free!</p>
                  <Link className="site-btn" to="/contact">Contact us</Link>
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
      {/* ======== footer section end ===== */}
    </div>
  );
}
export default SpokenEnglish