import { React, useState, useEffect } from 'react'

import PageServices from '../../services/PageServices';
import { Link, useParams ,useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
  import Footer from '../../Footer';
  import Menu from '../../Menu';

function AddUpdateTestimonial() {
  
  const navigate = useNavigate();
  let { tId } = useParams();
  const [id,setId] = useState(tId);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [univercity, setUnivercity] = useState('');
  const [status, setstatus] = useState(true);
  const [file, setFile] = useState(null);
  const [category,setCategory]= useState(' ');
  useEffect(() => {
    // Check if id exists, if yes, it means we are editing an existing job
    if (id) {

      const fetchData = async () => {
        try {
          const response = await PageServices.getTestimonialByid(id);
          if (response.status === 'success') {
            setName(response.data.testimonial.name || '');
            setContent(response.data.testimonial.content || '');
            setUnivercity(response.data.testimonial.univercity || '');
            setstatus(response.data.testimonial.status || '');
            setCategory(response.data.testimonial.type || '');


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
 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
  
    e.preventDefault();
    if (!name || !content || !univercity ) {
      alert("Please fill in all required fields");
      return;
    }
    console.log(file)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('content', content);
    formData.append('univercity', univercity);
    formData.append('status', status);
    formData.append('file', file);
    formData.append('type', category);
    console.log(formData)
    if(isEditing){
      try {
        // Make an API call to update the data
        const updatedData = await PageServices.updateTestimonialByid(id,formData);
  
        if(updatedData.status === 'success'){
          alert('Testimonial Updated');
                  
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
        const createJob = await PageServices.createTestimonial(formData);
       
  
        if(createJob.status === 'success'){
          setIsEditing(true);
          alert('Testimonial Created');
          navigate(`/admin/testimonial`);
                  
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
            <h1>{isEditing ? "Update" : "Add"} Testimonial</h1>
          </div>
         
        </div>
      </div>
    </section>

  
    <section className="content">

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{isEditing ? "Update" : "Add"} Testimonial</h3>

          <div className="card-tools">
            
          </div>
        </div>
        <div className="card-body">
         
        <div className="card-body">
        <form role="form">
          <div className="row">
          <div className="col-sm-6">
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder=" Name"/>
              </div>
            </div>
            <div className="col-sm-6">
              {/* text input */}
              <div className="form-group">
                <label>University</label>
                <input type="text" className="form-control" value={univercity} onChange={(e) => setUnivercity(e.target.value)} placeholder="Enter ..." />
              </div>
            </div>
            
          </div>
          <div className="row">
            <div className="col-sm-6">
              {/* textarea */}
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" rows={3} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter ..."  />
              </div>
            </div>

            <div className="col-sm-6">
            <label>Profile </label>
            <div className="custom-file">
                     
                      <input type="file" className="custom-file-input" id="customFile" onChange={handleFileChange}/>
                      <label className="custom-file-label" htmlFor="customFile">Choose Image </label>
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
     
                  <div className="row">
          <div className="col-sm-6">
          <div className="form-group">
                      <label>Select Course</label>
                      <select
                        className="form-control"
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                      ><option>Select Course</option>
                     
                        <option value="GMAT">GMAT</option>
                        <option value="IELTS">IELTS</option>
                        <option value="TOEFL">TOEFL</option>
                        <option value="GRE">GRE</option>
                        <option value="PTE">PTE</option>
                        <option value="SAT">SAT</option>
                        <option value="SELT">SELT</option>
                        <option value="spokenEnglish">Spoken English</option>
                      </select>
                    </div>
            </div>
            </div>
        </form>
      </div>



        </div>
        
        <div className="card-footer">
        <button type="submit" className="btn btn-primary" onClick={(e)=>{handleUpdate(e)}} >{isEditing ? "Update" : "Add"} Course</button>
        </div>
       
      </div>
      

    </section>
    
  </div>
  
  )
}

export default AddUpdateTestimonial