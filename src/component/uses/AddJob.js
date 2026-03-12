import { React, useState, useEffect } from 'react';
import PageServices from '../../services/PageServices';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

function AddJob() {
  const navigate = useNavigate();
  let { jobId } = useParams();
  const [id,setId] = useState(jobId);
  const [isEditing, setIsEditing] = useState(false);
  const [jobTitle, setJobtitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [vacancy, setvacancy] = useState('');
  const [location, setlocation] = useState('');
  const [jobType, setjobType] = useState('');
  const [jobExp, setjobExp] = useState('');
  const [jobLevel, setjobLevel] = useState('');
  const [status, setstatus] = useState(true);
  



  useEffect(() => {
    // Check if id exists, if yes, it means we are editing an existing job
    if (id) {

      const fetchData = async () => {
        try {
          const response = await PageServices.getJobDataById(jobId);
          if (response.status === 'success') {
            setJobtitle(response.data.job.jobTitle || '');
            setShortDescription(response.data.job.jobShortDescription || '');
            setDescription(response.data.job.jobDescription || '');
            setvacancy(response.data.job.vacancy || '');
            setlocation(response.data.job.location || '');
            setjobType(response.data.job.jobType || '');
            setjobExp(response.data.job.jobExp || '');
            setjobLevel(response.data.job.jobLevel || '');
            setstatus(response.data.job.Status || false);

          } else {
            console.log('something went wrong');
          }
        } catch (error) {
          // Handle error if the request fails
          console.error('Error fetching data:', error);
        }
      };

      // Call the asynchronous function
      fetchData();
      setIsEditing(true);
    } else {
      // If no id, it means we are adding a new job
      setIsEditing(false);
    }
  }, [id]);

  const handleUpdate = async (e) => {
    
    e.preventDefault();

    console.log(jobTitle,description,vacancy,location,shortDescription,jobExp,jobType,jobLevel)

    if (!jobTitle || !description || !vacancy || !location || !shortDescription || !jobType || !jobExp || !jobLevel ) {

      console.log(jobTitle,description,shortDescription,vacancy,location,jobType,jobExp)
      alert('All fields are required');
      return;
    }
    if(isEditing){
      try {
        // Make an API call to update the data
        const updatedData = await PageServices.updateJobForm(id,{
          jobTitle: jobTitle,
          jobShortDescription:shortDescription,
          jobDescription:description,
          vacancy:vacancy,
          location:location,
          jobType:jobType,
          jobExp:jobExp,
          jobLevel:jobLevel,
          Status:status
        });
  
        if(updatedData.status === 'success'){
          alert('Job Updated');
                  
        }else{
          alert('Something went wrong');
        }
  
      } catch (error) {
        console.error('Error updating data:', error);
        // Handle the error, e.g., show a message to the user
      }
    }else{
      try {
        // Make an API call to update the data
        const createJob = await PageServices.createJobe({
          jobTitle: jobTitle,
          jobShortDescription:shortDescription,
          jobDescription:description,
          vacancy:vacancy,
          location:location,
          jobType:jobType,
          jobExp:jobExp,
          jobLevel:jobLevel,
          Status:status
        });
  
        if(createJob.status === 'success'){
          setIsEditing(true);
          alert('Job Created');
          navigate(`/admin/all-job`);
                  
        }else{
          alert('Something went wrong');
        }
  
      } catch (error) {
        console.error('Error updating data:', error);
        // Handle the error, e.g., show a message to the user
      }
    }
  };


  return (
    
    <div className="content-wrapper">

      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>{isEditing ? "Update" : "Add"} Job</h1>
            </div>

          </div>
        </div>
      </section>


      <section className="content">


        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{isEditing ? "Update" : "Add"} Job</h3>

            <div className="card-tools">
             
            </div>
          </div>
          <div className="card-body">

            <div className="card-body">
              <form role="form">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Job Title</label>
                      <input type="text" className="form-control" value={jobTitle} onChange={(e) => setJobtitle(e.target.value)} placeholder="Title" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Address</label>
                      <input type="text" value={location} onChange={(e) => setlocation(e.target.value)} className="form-control" placeholder="Address" />
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-sm-6">
                    {/* textarea */}
                    <div className="form-group">
                      <label>Short Description</label>
                      <ReactQuill theme="snow" value={shortDescription} onChange={setShortDescription} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    {/* textarea */}
                    <div className="form-group">
                      <label>Description</label>
                     
                      <ReactQuill theme="snow" value={description} onChange={setDescription} />
                    </div>
                  </div>


                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>Vacancy</label>
                      <input type="number" value={vacancy} onChange={(e) => setvacancy(e.target.value)} className="form-control" placeholder="Vacancy" />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>Experience</label>
                      <input type="number" value={jobExp} onChange={(e) => setjobExp(e.target.value)} className="form-control" placeholder="Expirience" />
                    </div>
                  </div>

                  <div className="col-sm-3">

                    <div className="form-group">
                      <label>Job Type</label>
                      <select
                        className="form-control"
                        value={jobType} // Set the selected value
                        onChange={(e) => setjobType(e.target.value)}
                      >
                        <option>Select Job Type</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-sm-3">

                    <div className="form-group">
                      <label>Job Level</label>
                      <select
                        className="form-control"
                        value={jobLevel} // Set the selected value
                        onChange={(e) => setjobLevel(e.target.value)}
                      ><option>Select Job Level</option>
                        <option value="Junior">Junior</option>
                        <option value="Mid">Mid</option>
                        <option value="Mid-Senior">Mid-Senior</option>
                        <option value="Senior">Senior</option>
                      </select>
                    </div>
                  </div>


                </div>
                {/* <div className="row">
                  <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitch3"
                      checked={status} // Set the checked attribute
                      onChange={() => setstatus(!status)} // Toggle the status when the checkbox is clicked
                    />
                    <label className="custom-control-label" htmlFor="customSwitch3">Status</label>
                  </div>
                </div> */}


              </form>
            </div>



          </div>

          <div className="card-footer">
          <button type="submit" onClick={(e)=>{handleUpdate(e)}} className="btn btn-primary">Submit</button>
          </div>

        </div>


      </section>

    </div>
     
  )
}

export default AddJob