import React, { useEffect, useState ,useRef} from 'react';
import Header from './Header'
import { Footer } from './Footer'
import PageServices from '../services/PageServices'
import useAsync from '../hooks/useAsync';
import { Link, useNavigate } from 'react-router-dom'

import DocumentMeta from 'react-document-meta';
import SEO from '../custom/seoData';
function Contact() {
const navigate = useNavigate();
  const { data } = useAsync(PageServices.getContactPageById);
const { data: contactData } = useAsync(PageServices.getSettingData);
const { data: faq } = useAsync(PageServices.getOffice);
// console.log(faq)
const [contact,setContact] = useState([]);
// const [faqData,setFaqData] = useState([]);
const [pageTitle, setPageTitle] = useState('');
const [description, setDescription] = useState('');
const [, setPageName] = useState('');
const [, setHtmlData] = useState('');
const [officeData, setOfficeData] = useState([]);
const [name,setName] = useState([]);
const [email, setEmail] = useState('');
const [city, setCity] = useState('');
const [mobile, setMobile] = useState('');
const [message, setMessage] = useState('');

  const section1Ref = useRef(null);
// const getAllfaqData = async() => {
//     try{
//       const response = await PageServices.getAllFaqForFront("Contact");
//           if (response.status === 'success') {
//             setFaqData(response.data.faq||[])
//           } else {
//             console.log('something went wrong');
//           }
  
//     }catch(error){
//       console.error('Error fetching data:', error);
//     }
//   }
  
// useEffect to update form fields when data changes
useEffect(() => {
  // Check if data is available and update form fields
  if (data?.data?.page) {
    setPageTitle(data.data.page.pageTitle || ''); // Replace 'pageTitle' with the actual key from your API response
    setPageName(data.data.page.pageName || '');
    setHtmlData(data.data.page.htmldes || ''); // Replace 'pageTitle' with the actual key from your API response
    setDescription(data.data.page.description || ''); // Replace 'description' with the actual key from your API response
  }
  if(contactData?.data?.setting){
    setContact(contactData.data.setting||{})
  }
  if(faq?.data?.office){
    setOfficeData(faq.data.office||{})
  }
  // getAllfaqData();
}, [data,contactData,faq]);

const handleUpdate = async (e) => {

  e.preventDefault();
  if (!name || !email || !mobile || !city || !message) {
    alert('All fields are required');
    return;
  }
    try {
      // Make an API call to update the data
      const createJob = await PageServices.createForme({
        name:name,
        email:email,
        mobileNo:mobile,
        city:city,
        message:message,
        type:'contact'
      });

      if(createJob.status === 'success'){
        setName('');
        setEmail('');
        setMobile('');
        setCity('');
        setMessage('');
        navigate('/thank-you');
      }else{
        alert('Something went wrong');
      }

    } catch (error) {
      console.error("something is wrong");
      // Handle the error, e.g., show a message to the user
    }
  
};

  return (
    <div>
      <SEO page="contact" />
        <section className>
          <div className="banner-sec banner-new-bg">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="banner-content-sec">
                    <h1>We're Here, <span>Let's Talk</span></h1>
                    <p>{pageTitle?pageTitle:`No matter what's bothering you, Our experienced counsellors of the top study abroad destinations are here to solve your every doubt regarding studying abroad. Call us at any time or stop by one of our branches to see us.`}</p>                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-us-img text-center">
                    <img src="assets/img/contact-us-img-new.svg" alt='contact-us' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ======== hero section end ===== */}
        {/* ======== contact us section start ===== */}
        <div className="contact-us-section py-70" >
          <div className="container">
            <div className="get-in-touch-section">
              <h2 className="heading text-center d-block mb-3">Get in touch</h2>
              <p className="descp text-center px-5">{description?description:`We believe in being the best ally to our students. When we say, "quality education is a right and not a luxury," we mean it in every sense. No matter what's bothering you, Our experienced counsellors of the top study abroad destinations are here to solve your every doubt regarding studying abroad. Call us at any time or stop by one of our branches to see us.`}</p>
              <div className="get-in-touch-inner my-5">
                <div className="row gy-4">
                  <div className="col-lg-4 col-sm-6">
                    <div className="contact-us-box">
                      <div className="contact-us-icon-outer">
                        <div className="contact-us-icon-inner">
                          <img src="assets/img/call-icon.svg" />
                        </div>
                      </div>
                      <h4 className="text-center">Call Us:</h4>
                      <h5><Link to={`tel:${contact.contectOne}`}>{contact.contectOne}</Link></h5>
                      <h5><Link to={`tel:${contact.contectTwo}`}>{contact.contectTwo}</Link></h5>
                      <h5><Link to={`tel:${contact.contectThree}`}>{contact.contectThree}</Link></h5>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="contact-us-box">
                      <div className="contact-us-icon-outer">
                        <div className="contact-us-icon-inner">
                          <img src="assets/img/email-icon.svg" />
                        </div>
                      </div>
                      <h4 className="text-center">Email Us:</h4>
                      <h5><Link to={`mailto:${contact.email}`}>{contact.email}</Link></h5>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-12">
                    <div className="contact-us-box">
                      <div className="contact-us-icon-outer">
                        <div className="contact-us-icon-inner">
                          <img src="assets/img/building-icon.svg" />
                        </div>
                      </div>
                      <h4 className="text-center">Office Address:</h4>
                      <h5><Link to="https://maps.app.goo.gl/APvf2GEjLDNkWuCu9" target='_blank'>{contact.officeAdress}</Link></h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="our-branch-section">
                <h2 className="heading text-center d-block pb-3">Our Branches</h2>
                <div className="row gy-3">
                  {officeData.map(office =>( 
                  <div className="col-md-4">
                    <div className="contact-us-box our-branch-box">
                      <div className="contact-us-icon-outer">
                        <div className="contact-us-icon-inner">
                          <img src="assets/img/building-icon.svg" />
                        </div>
                      </div>
                      <div>
                        <h4>{office.officeCity}</h4>
                        <p className="descp text-start">{office.officeAdress}</p>
                      </div>
                    </div>
                  </div>
                 ))}
                </div>
              </div>
              <div className="gatewayabroad-map">
                <div className="gatewayabroad-map-inner pt-5">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3557.848799804021!2d75.7769567!3d26.9082933!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db40cd42722ff%3A0xcfc3ab392fa9adf7!2sGateway%20Abroad%20Jaipur%20(Study%20Abroad%20Consultants%20and%20Coaching%20for%20IELTS%2C%20PTE%2C%20TOEFL%2CSELT%2C%20GRE%2CGMAT%20and%20SAT)!5e0!3m2!1sen!2sin!4v1702272800694!5m2!1sen!2sin" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ======== contact us section end ===== */}
        {/* ======== contact us form section start ===== */}
        <section className="contact-form-section banner-new-bg py-60" ref={section1Ref}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="career-form-section-left contact-us-left-content">
                  <h2 className="heading mb-2">Get in touch</h2>
                  <p className="descp">Please fill the below form to schedule a one to one counselling session<br /> with our experts.</p>
                  <div className="career-form-section-img mt-3">
                    <img src="assets/img/get-in-touch-img.svg" />
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="career-form-section-right">
                  <div className="career-form-inner students-info-right">
                    <form>
                      <div className="input-field">
                        <input type="text" name="name" onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Name" required/>
                      </div>
                      <div className="input-field">
                        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" required/>
                      </div>
                      <div className="input-field">
                        <input type="text" name="phone" onChange={(e) => setMobile(e.target.value)} className="form-control" placeholder="Mobile No." required/>
                      </div>
                      <div className="input-field">
                        <input type="text" name="city" onChange={(e) => setCity(e.target.value)}  className="form-control" placeholder="City"required />
                      </div>
                      <div className="input-field type-file-field">
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} onChange={(e) => setMessage(e.target.value)} placeholder="Message"  />
                      </div>
                      <button type="submit" onClick={(e)=>{handleUpdate(e)}}>SUBMIT</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ======== contact us form section start ===== */}
        {/* ======== FAQs section start ===== */}
        {/* <section className="faq-section py-70">
          <div className="container">
            <div className="title text-center mb-5">
              <h2 className="heading mb-2">Frequently asked questions</h2>
              <p className="descp text-center">Can't find the answer you are looking for?</p>
            </div>
            <div className="faq-section-container">
              <div className="accordion" id="accordionExample">
               
                {faqData.map((f,index)=>(
                <div className="accordion-item"  key={index}>
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
        </section> */}
        {/* ======== FAQs section end ===== */}
        {/* ======== become partner section start ===== */}
        {/* <section className="app-banner-section counselling-session-sec">
          <div className="container">
            <div className="app-banner-section-inner counselling-session-sec-inner">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="app-banner-content-left">
                    <h2 className="mb-3">Avail A Complementary Counselling Session</h2>
                    <p className="mb-4">Join thousand of instructors and earn money hassle free!</p>
                    <Link className="site-btn"  onClick={()=>section1Ref.current.scrollIntoView({ behavior: 'smooth' })}>Contact us</Link>
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
        </section> */}
        {/* ======== become partner section end ===== */}
        {/* ======== footer section end ===== */}
    
      </div>
  )
}

export default Contact