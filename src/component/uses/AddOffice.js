import { React, useState, useEffect } from 'react'

import PageServices from '../../services/PageServices';
import { Link, useParams ,useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
  import Footer from '../../Footer';
  import Menu from '../../Menu';

function AddOffice() {
  
  const navigate = useNavigate();
  let { oId } = useParams();
  const [id,setId] = useState(oId);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mapLink, setMapLink] = useState('');
  const [content, setContent] = useState('');
  const [univercity, setUnivercity] = useState('');
  const [rank, setRank] = useState('');
  const [type, setType] = useState('');
  const [file, setFile] = useState(null);
  
  useEffect(() => {
    // Check if id exists, if yes, it means we are editing an existing job
    if (id) {

      const fetchData = async () => {
        try {
          const response = await PageServices.getOfficeByid(id);
          if (response.status === 'success') {
            setName(response.data.office.officeName || '');
            setContent(response.data.office.officeAdress || '');
            setUnivercity(response.data.office.officeCity || '');
            setRank(response.data.office.officeContact || '');
            setType(response.data.office.officeType || '');
            setEmail(response.data.office.officeEmail || '')
            setMapLink(response.data.office.officeMapLink || '')
            

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
    // if (!name || !univercity || !type || !content || !rank ) {
    //   alert("Please fill in all required fields");
    //   return;
    // }
    const formData = new FormData();
    formData.append('officeName', name);
    formData.append('officeAdress', content);
    formData.append('officeCity', univercity);
    formData.append('officeType', type);
    formData.append('officeContact', rank);
    formData.append('officeMapLink', mapLink);
    formData.append('officeEmail', email);
    if(file){
    formData.append('file', file);
  }
      
      if(isEditing){
        try {
          // Make an API call to update the data
          const updatedData = await PageServices.updateOfficeByid(id,formData);
    
          if(updatedData.status === 'success'){
            alert('Office Updated');
                    
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
          const updatedData = await PageServices.createOffice(formData);
    
          if(updatedData.status === 'success'){
            alert('Office created');
                    
          }else{
            alert('Something went wrong');
          }
    
        } 
        catch (error) {
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
            <h1>{isEditing ? "Update" : "Add"} Office</h1>
          </div>
         
        </div>
      </div>
    </section>

  
    <section className="content">

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{isEditing ? "Update" : "Add"} Office</h3>

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
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
              </div>
            </div>
            <div className="col-sm-6">
              {/* text input */}
              <div className="form-group">
                <label>City</label>
                <input type="text" className="form-control" value={univercity} onChange={(e) => setUnivercity(e.target.value)} placeholder="city ..." />
              </div>
            </div>
            
          </div>
          
          <div className="row">
            <div className="col-sm-6">
              {/* textarea */}
              <div className="form-group">
                <label>Adress</label>
                <textarea className="form-control" rows={2} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter ..."  />
              </div>
            </div>

            <div className="col-sm-6">
            <label>Logo </label>
            <div className="custom-file">
                     
                      <input type="file" className="custom-file-input" id="customFile" onChange={handleFileChange}/>
                      <label className="custom-file-label" htmlFor="customFile">Choose Image </label>
                    </div>
              </div>
          </div>
        
          <div className="row">
          <div className="col-sm-4">
          <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email..." />
              </div>
            </div>
            
            <div className="col-sm-4">
              {/* text input */}
              <div className="form-group">
                <label>Contact Number</label>
                <input type="number" className="form-control" value={rank} onChange={(e) => setRank(e.target.value)} placeholder="Enter ..." />
              </div>
            </div>
            <div className="col-sm-4">
            <div className="form-group">
                      <label>Select Type</label>
                      <select
                        className="form-control"
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                      ><option>Select Course</option>
                        <option value="National">National</option>
                        <option value="InterNational">International</option>
                        
                      </select>
                    </div>
            </div>
         </div>

         <div className='row'>
         <div className="col-sm-6">
          <div className="form-group">
                <label>Map Link</label>
                <input type="text" className="form-control" value={mapLink} onChange={(e) => setMapLink(e.target.value)} placeholder="Email..." />
              </div>
            </div>
            </div>
        </form>
      </div>



        </div>
        
        <div className="card-footer">
        <button type="submit" className="btn btn-primary" onClick={(e)=>{handleUpdate(e)}} >{isEditing ? "Update" : "Add"} Office</button>
        </div>
       
      </div>
      

    </section>
    
  </div>
  
  )
}

export default AddOffice