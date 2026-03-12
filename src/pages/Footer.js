import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageServices from '../services/PageServices';
import useAsync from '../hooks/useAsync';
import { useForm } from 'react-hook-form'; // Import useForm

export const Footer = () => {
  const { data } = useAsync(PageServices.getSettingData);
  const { data: course } = useAsync(PageServices.getCourse);
  const [CourseData, setCourseData] = useState([]);
  const navigate = useNavigate();
  const [contactData, setContactData] = useState([]);

  // --- States for form data are no longer needed ---
  // const [name, setName] = useState([]);
  // const [email, setEmail] = useState('');
  // const [city, setCity] = useState('');
  // const [mobile, setMobile] = useState('');
  // const [message, setMessage] = useState('');
  // const [newsEmail, setNewsEmail] = useState('');

  // --- Initialize react-hook-form for the Contact Us modal form ---
  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    formState: { errors: contactErrors },
    reset: resetContactForm
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      city: '',
      message: ''
    }
  });
  // --- End react-hook-form initialization for Contact Us ---

  // --- Initialize react-hook-form for the Newsletter form ---
  const {
    register: registerNewsletter,
    handleSubmit: handleSubmitNewsletter,
    formState: { errors: newsletterErrors },
    reset: resetNewsletterForm
  } = useForm({
    defaultValues: {
      newsEmail: ''
    }
  });
  // --- End react-hook-form initialization for Newsletter ---

  useEffect(() => {
    if (course?.data?.page) {
      setCourseData(course.data.page);
    }
    if (data?.data?.setting) {
      setContactData(data.data.setting);
    }
  }, [data, course]);

  // --- Updated Contact Us form submission handler ---
  const handleUpdate = async (data) => { // 'data' contains validated form values
    const { name, email, mobile, city, message } = data;

    try {
      // Make an API call to update the data
      const createJob = await PageServices.createForme({
        name,
        email,
        mobileNo: mobile,
        city,
        message,
        type: 'contact'
      });

      if (createJob.status === 'success') {
        resetContactForm(); // Reset the contact form fields
        const modalEl = document.getElementById("getintouchModel");
        modalEl.classList.remove("show");
        modalEl.style.display = "none";
        modalEl.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) backdrop.remove();

        navigate('/thank-you', { replace: true });
      } else {
        // Handle API error, maybe show a message in the UI instead of alert
        console.error('Contact form submission failed:', createJob);
        // Example: setError('contactSubmit', { message: 'Submission failed. Please try again.' });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      // Handle network or unexpected errors, maybe show a message in the UI
      // Example: setError('contactSubmit', { message: 'An error occurred. Please try again.' });
    }
  };
  // --- End updated Contact Us handler ---

  // --- Updated Newsletter form submission handler ---
  const handleUpdate2 = async (data) => { // 'data' contains validated form values
    const { newsEmail } = data;

    try {
      // Make an API call to subscribe
      const createJob = await PageServices.addEmail({
        email: newsEmail,
        Subscribed: 'Yes'
      });

      if (createJob.status === 'success') {
        resetNewsletterForm(); // Reset the newsletter form field

        console.log('Newsletter subscription successful');
      } else {
        // Handle API error, maybe show a message in the UI instead of alert
        console.error('Newsletter subscription failed:', createJob);
        // Example: setError('newsletterSubmit', { message: 'Subscription failed. Please try again.' });
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      // Handle network or unexpected errors, maybe show a message in the UI
      // Example: setError('newsletterSubmit', { message: 'An error occurred. Please try again.' });
    }
  };
  // --- End updated Newsletter handler ---

  return (
    <>
      <footer>
        <div className="footer-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-sm-6">
                <div className="footer-left">
                  <div className="logo-sec">
                    <Link to="/">
                      <img src="assets/img/ga-logo.svg" alt="logo" />
                    </Link>
                  </div>
                  <div className="footer-desc">
                    <p>Gateway Abroad (an educational consultant) has been counselling and assisting students to study in the UK, IRELAND, AUSTRALIA, the USA, CANADA, NEW ZEALAND, SINGAPORE, and other countries for 15+ years.</p>
                  </div>
                  <div className="social-media-sec">
                    <h4 className="footer-title">Follow us</h4>
                    <ul className="d-flex list-unstyled">
                      <li><Link to={contactData.facebook || "#"} target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook" /></Link></li>
                      <li><Link to={contactData.tweeter || "#"} target="_blank" rel="noopener noreferrer"><i className="fa fa-quora" /></Link></li>
                      <li><Link to={contactData.googlePlus || "#"} target="_blank" rel="noopener noreferrer"><i className="fa fa-google-plus" /></Link></li>
                      <li><Link to={contactData.pintrest || "#"} target="_blank" rel="noopener noreferrer"><i className="fa fa-pinterest" /></Link></li>
                      <li><Link to={contactData.instagram || "#"} target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram" /></Link></li>
                      <li><Link to={contactData.linkdin || "#"} target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin" /></Link></li>
                      <li><Link to={contactData.youtube || "#"} target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube" /></Link></li>
                      <li><Link to={`https://api.whatsapp.com/send?phone=${contactData.contectOne || ""}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-whatsapp" /></Link></li>
                      {/* Duplicate Instagram link removed or kept if intentional */}
                      {/* <li><Link to={`https://www.instagram.com/testprep_with_gatewayjaipur/`} target="_blank"><i className="fa fa-instagram" /></Link></li> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="footer-middle ps-5">
                  <div className="footer-menu">
                    <h4 className="footer-title">Quick Links</h4>
                    <ul className="list-unstyled">
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/about">About Us</Link></li>
                      <li><Link to="/spoken-english">Spoken English</Link></li>
                      <li><Link to="/blog">Blog</Link></li>
                      <li><Link to="/career">Career</Link></li>
                      <li><Link to="/contact">Contact us</Link></li>
                      <li><Link to="/gallary">Gallery</Link></li> {/* Note: Typo 'gallary' */}
                    </ul>
                  </div>
                  <div className="footer-menu mt-4 test-pre-footer">
                    <h4 className="footer-title">Test Preparation</h4>
                    <ul className="list-unstyled">
                      {CourseData?.map((course) => (
                        <li key={course.pageName}><Link to={`/course/${course.pageName}`}>{course.pageName}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-8">
                <div className="footer-right">
                  <div className="footer-contact">
                    <h4 className="footer-title">Contact us</h4>
                    <ul className="list-unstyled">
                      <li><Link target='_blank' rel="noopener noreferrer" to={`https://maps.app.goo.gl/${contactData.officeAdress || ""}`}>{contactData.officeAdress || "Address not available"}</Link></li>
                      <li>
                        <span>
                          <i className="fa fa-whatsapp" />
                        </span>
                        {contactData.contectOne && (
                          <Link to={`https://api.whatsapp.com/send?phone=${contactData.contectOne}`}> {contactData.contectOne}</Link>
                        )}
                        {contactData.contectTwo && (
                          <Link to={`tel:${contactData.contectTwo}`}> {contactData.contectTwo}</Link>
                        )}
                        {contactData.contectThree && (
                          <Link to={`tel:${contactData.contectThree}`}> {contactData.contectThree}</Link>
                        )}
                      </li>
                      <li>
                        <span><i className="fa fa-envelope-o" /></span>
                        {contactData.email && <Link to={`mailto:${contactData.email}`}>{contactData.email}</Link>}
                      </li>
                    </ul>
                  </div>
                  <div className="footer-newsletter mt-4">
                    <h4 className="footer-title">Newsletter</h4>
                    {/* Use handleSubmitNewsletter and registerNewsletter */}
                    <form onSubmit={handleSubmitNewsletter(handleUpdate2)}>
                      <input
                        type="email"
                        {...registerNewsletter("newsEmail", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address"
                          }
                        })}
                        className={`form-control ${newsletterErrors.newsEmail ? 'is-invalid' : ''}`}
                        placeholder="Enter your email"
                      />
                      {newsletterErrors.newsEmail && <div className="invalid-feedback d-block">{newsletterErrors.newsEmail.message}</div>}
                      <button type="submit">Subscribe</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom text-center py-4">
          <p>Copyrights © {new Date().getFullYear()} All Rights Reserved by Gateway Abroad.</p>
        </div>
      </footer>
      <div className="scroll_top">
        <Link to="#" id="scroll-button" style={{ display: 'block' }} onClick={() => { window.scrollTo(0, 0) }}><i className="fa fa-angle-up" /></Link>
      </div>
      <div className="get-in-touch-sidebar">
        <button data-bs-toggle="modal" data-bs-target="#getintouchModel"><span className="content-red"><i className="fa fa-envelope-o me-2" /> Get in touch</span><span className="content-dark"><i className="fa fa-long-arrow-down" /></span></button>
      </div>
      {/* --- Updated Contact Us Modal Form using react-hook-form --- */}
      <div className="modal right fade" id="getintouchModel" tabIndex={-1} aria-labelledby="getintouchModelLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="getintouchModelLabel">Get in touch</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="get-in-touch-form">
                {/* Use handleSubmitContact and registerContact */}
                <form onSubmit={handleSubmitContact(handleUpdate)}>
                  <div className="input-field">
                    <input
                      type="text"
                      {...registerContact("name", { required: "Name is required" })}
                      className={`form-control ${contactErrors.name ? 'is-invalid' : ''}`}
                      placeholder="Name"
                    />
                    {contactErrors.name && <div className="invalid-feedback">{contactErrors.name.message}</div>}
                  </div>
                  <div className="input-field">
                    <input
                      type="email"
                      {...registerContact("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address"
                        }
                      })}
                      className={`form-control ${contactErrors.email ? 'is-invalid' : ''}`}
                      placeholder="Email"
                    />
                    {contactErrors.email && <div className="invalid-feedback">{contactErrors.email.message}</div>}
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      {...registerContact("mobile", {
                        required: "Mobile No. is required",
                        pattern: {
                          value: /^\d{10,15}$/, // Adjust pattern as needed
                          message: "Invalid phone number"
                        }
                      })}
                      className={`form-control ${contactErrors.mobile ? 'is-invalid' : ''}`}
                      placeholder="Mobile No."
                    />
                    {contactErrors.mobile && <div className="invalid-feedback">{contactErrors.mobile.message}</div>}
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      {...registerContact("city", { required: "City is required" })}
                      className={`form-control ${contactErrors.city ? 'is-invalid' : ''}`}
                      placeholder="City"
                    />
                    {contactErrors.city && <div className="invalid-feedback">{contactErrors.city.message}</div>}
                  </div>
                  <div className="input-field type-file-field">
                    <textarea
                      {...registerContact("message")}
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows={2}
                      placeholder="Message"
                    ></textarea>
                  </div>
                  <button type="submit">SUBMIT</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- End Updated Contact Us Modal Form --- */}
    </>
  );
};

export default Footer;