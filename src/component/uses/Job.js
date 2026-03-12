import React, { useState, useEffect } from 'react';
import PageServices from '../../services/PageServices';
import useAsync from '../../hooks/useAsync';
import { Link } from 'react-router-dom';



const Job = () => {

  const { data, loading, error, run } = useAsync(PageServices.getJobData);

  // State variables for form fields
  const [form, setform] = useState([]);



  // useEffect to trigger the async function on mount
  

  // useEffect to update form fields when data changes
  useEffect(() => {
    if (data?.data?.jobs) {
      setform(data.data.jobs || []); // Assuming data.data.form is an array of contact objects
    }
  }, [data]);
 console.log(data)
  const handleDelete = async (e,id) => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure you want to delete this blog?');

  if (!confirmed) {
    return; // If not confirmed, do nothing
  }
    
    try {
      const response = await PageServices.deleteJobData(id);

      if(response.status === 'success'){
        alert("job deleted successfully")
        run();
                
      }else{
        alert('something went wrong')
      }
    } catch (error) {
      // Handle error if the request fails
      console.error('Error fetching data:', error);
    }
  };
  
  return (
   
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Jobs</h1>
            </div>
            <div className="col-sm-6">
              <div className="text-right">
                <Link to="/admin/add-job" className="btn btn-sm btn-primary">
                  <i className="fa fa-Page" />
                  Add job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
      <div className="card-body pb-0">
      <div className="row d-flex align-items-stretch">
      {form.map((job) => (
          <div className="col-sm-4" key={job.id}>
          
            <div className="card"  >
              
              <div className="card-body " >
                <h4 className="card-title">{job.jobTitle.substring(0, 50)}</h4>
                <p className="card-text" dangerouslySetInnerHTML={{ __html: job.jobShortDescription.substring(0,130) }}/><p>...</p>
               
                <div className='d-flex justify-content-between'>
                <Link to={`/admin/edit-job/${job.id}`} className="btn btn-primary ">
                  View
                </Link>
                <button
                  onClick={(e) => handleDelete(e,job.id)}
                  className="btn btn-danger " 
                >
                  Delete
                </button>
                </div>
              </div>
              
            </div>
            
          </div>
        ))}
      </div>
    </div>
        
      </section>
    </div>
    
  );
};
export default Job;