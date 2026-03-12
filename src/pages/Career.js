import React, { useRef, useEffect, useState } from 'react';
import Header from './Header'
import { Footer } from './Footer'
import PageServices from '../services/PageServices'
import useAsync from '../hooks/useAsync';

import DocumentMeta from 'react-document-meta';
import { useNavigate } from 'react-router-dom';
import SEO from '../custom/seoData';

function Career() {
  const navigate = useNavigate();
  const { data, loading, error, run } = useAsync(PageServices.getCareerPageById);
  const { data: jobFormData, loading: jobFormLoading, error: jobFormError, run: runJobForm } = useAsync(PageServices.getJobData);


  const [jobData, setJobData] = useState([])
  const [pageTitle, setPageTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pageName, setPageName] = useState('');
  const [htmldata, setHtmlData] = useState('');


  const [name, setName] = useState()
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState(null)
  const [branch, setBranch] = useState('');
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // You can store the file in state or perform further actions
  };


  const section1Ref = useRef(null);
  // useEffect to update form fields when data changes
  useEffect(() => {
    // Check if data is available and update form fields
    if (data?.data?.page) {
      setPageTitle(data.data.page.pageTitle || ''); // Replace 'pageTitle' with the actual key from your API response
      setPageName(data.data.page.pageName || '');
      setHtmlData(data.data.page.htmldes || ''); // Replace 'pageTitle' with the actual key from your API response
      setDescription(data.data.page.description || ''); // Replace 'description' with the actual key from your API response
    }
    if (jobFormData?.data?.jobs) {
      setJobData(jobFormData.data.jobs || [])
    }
  }, [data, jobFormData, name, email]);

  const handleUpdate = async (e) => {

    e.preventDefault();
    if (!name || !email || !phone || !file) {
      alert('All fields are required');
      return;
    }


    try {

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('mobileNo', phone);
      formData.append('type', "resume");
      formData.append('eduInterest', branch);
      formData.append('file', file);

      const createJob = await PageServices.createForme(formData);

      if (createJob.status === 'success') {
        setName('');
        setEmail('');
        setPhone('');
        setBranch();
        setFile()
        navigate('/thank-you');
      } else {
        alert('Something went wrong');
      }

    } catch (error) {
      console.error("something is wrong");
      // Handle the error, e.g., show a message to the user
    }
  };

  return (
    <div>
     <SEO page="Career" />
      <section>
        <div className="banner-sec new-banner-sec career-banner-sec">
          <div className="container">
            <div className="banner-content text-center">
              <h1 className="banner-heading ">{pageName}</h1>
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
                <div className="about-us-left-new career-img-box">
                  <img src="assets/img/career-img-new-1.jpeg" />
                </div>
              </div>
              <div className="col-md-7">
                <div className="about-us-right-new ps-3 career-content-box">
                  <h2 className="heading">Culture of Success at <br />Gateway Abroad</h2>
                  <p className="descp">{pageTitle ? pageTitle : "We support the empowerment of everyone in our community. Join us if you enjoy exploring and want to learn more about schooling outside of India. We are seeking people who are ready to make a move to promote high-quality education. We are a group of driven and career-oriented people that are eager to develop by cooperating in a welcoming and goal- oriented environment. Gateway Abroad is spread across eight branches in India. Join us right away if you're seeking for a vibrant and welcoming environment that supports your growth."}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="about-us-inner">
            <div className="row align-items-center">
              <div className="col-md-7">
                <div className="about-us-right-new career-content-box pe-3">
                  <h2 className="heading">Working with Gateway Abroad</h2>
                  <p className="descp mb-3">{description ? description : "In a relatively short period of time, Gateway Abroad has assembled such a strong team. Staff members that are committed and diligent have made this possible. We make an effort to encourage and reward personnel on a regular basis. After all, what good is labour without praise? We seek people who can contribute to our team with innovative ideas and effectively interact with clients."}</p>
                  <p className="descp">Join us immediately if you're looking for opportunities to improve your talents and have excellent communication skills.</p>
                </div>
              </div>
              <div className="col-md-5">
                <div className="about-us-left-new career-img-box">
                  <img src="assets/img/career-img-new-2.jpeg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======== about us section end ===== */}
      {/* ======== Vacancy Section start ===== */}
      <section className="vacancy-section py-60 linear-bg">
        <div className="container">
          <h2 className="heading text-center d-block">Vacancies</h2>
          <div className="vacancy-section-inner pt-4">
            <div className="row gy-4 justify-content-center">
              {jobData.map((job) => (
                <div className="col-lg-4 col-md-6" key={job._id}>
                  <div className="vacancy-card">
                    <div className="vacancy-card-body">
                      <h4 className="job-title">{job.jobTitle}</h4>
                      <h6 className="vacancy-num">No. of Vacancy: {job.vacancy}</h6>
                      <h6 className="vacancy-location">Location: {job.location}</h6>
                      <div className="scroll-container">

                        <div className="descp" dangerouslySetInnerHTML={{ __html: job.jobShortDescription }} />
                        <div className="descp" dangerouslySetInnerHTML={{ __html: job.jobDescription }} />
                        {/* <p className="descp"><strong>Roles &amp; Responsibilities</strong></p>
                    <p className="descp">{job.jobDescription?job.jobDescription:`End to End overseas education counseling, providing professional and quality counseling service that exceeds students and Parents expectations.<br />
                      Active participation and contribution during education fairs, universities visits, and in-house seminars organized by the company.
                      Build strong client support through 100% compliance of application processes.
                      Always being aware of the global current affairs
                      Be a productive and effective member of the office team and support Office Managers through exhibiting a collaborative operating style thereby building team spirit.
                      Essential Requirements`}</p> */}
                      </div>
                      <div>
                        <ul className="list-unstyled d-flex job-duration mt-3">
                          <li>{job.jobType}</li>
                          <li>{job.jobExp}. Year</li>
                          <li>{job.jobLevel} Level</li>
                        </ul>
                        <div className='text-center'>
                          <button className="apply-btn" onClick={() => section1Ref.current.scrollIntoView({ behavior: 'smooth' })}>Apply Now <span><i className="fa fa-paper-plane ms-2" /></span></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ======== Vacancy section end ===== */}
      <div className="career-form-section py-60" ref={section1Ref}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="career-form-section-left">
                <h2 className="heading">Boost Your Career! Find the Perfect <br />Role with Gateway Abroad</h2>
                <div className="career-form-section-img">
                  <img src="assets/img/career-form-img.svg" />
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="career-form-section-right">
                <div className="career-form-inner students-info-right">
                  <form>
                    <div className="input-field">
                      <input type="text" name="name" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name" />
                    </div>
                    <div className="input-field">
                      <input type="email" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <div className="input-field">
                      <input type="text" name="phone" className="form-control" onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
                    </div>
                    <div className="input-field">
                      <select className="form-select"
                        value={branch} // Set the selected value
                        onChange={(e) => setBranch(e.target.value)}
                        aria-label="Default select example">
                        <option selected>Select Vacancies</option>
                        {jobData.map((job) => (
                          <option value={job.jobTitle}>{job.jobTitle}</option>
                        ))}
                      </select>
                    </div>
                    <div className="input-field type-file-field">
                      <label className="filelabel"><img src="assets/img/upload-img.svg" className="file_img" />
                        <span className="title">
                          {file ? file.name : "Upload your CV here"}
                        </span>
                        <input className="FileUpload1 form-control py-3" onChange={(e) => { handleFileChange(e) }} id="FileInput" name="booking_attachment" type="file" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps" />
                      </label>
                    </div>
                    <button type="submit" onClick={(e) => { handleUpdate(e) }} >SUBMIT</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ======== become partner section start ===== */}
      <section className="app-banner-section counselling-session-sec">
        <div className="container">
          <div className="app-banner-section-inner counselling-session-sec-inner">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="app-banner-content-left">
                  <h2 className="mb-3">Avail A Complementary Counselling Session</h2>
                  <p className="mb-4">Join thousand of instructors and earn money hassle free!</p>
                  <a className="site-btn" href="/contact">Contact us</a>
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
  )
}

export default Career