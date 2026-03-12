import React, { useState, useEffect,useRef } from 'react';
import PageServices from '../services/PageServices';

import useAsync from '../hooks/useAsync';
import Header from '../Header';
import Footer from '../Footer';
import Menu from '../Menu';

function Contact() {

  const { data, loading, error, run } = useAsync(PageServices.getContactPageById);

  // State variables for form fields
  const [pageTitle, setPageTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pageName, setPageName] = useState('');
  const [htmldata, setHtmlData] = useState('');
 

  
  // useEffect to trigger the async function on mount
 console.log(data)

  // useEffect to update form fields when data changes
  useEffect(() => {
    // Check if data is available and update form fields
    if (data?.data?.page) {
      setPageTitle(data.data.page.pageTitle || ''); // Replace 'pageTitle' with the actual key from your API response
      setPageName(data.data.page.pageName || '');
      setHtmlData(data.data.page.htmldes || ''); // Replace 'pageTitle' with the actual key from your API response
      setDescription(data.data.page.description || ''); // Replace 'description' with the actual key from your API response
    }
  }, [data]);

  

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!pageName || !pageTitle || !description) {
      alert('All fields are required');
      return;
    }

    
    try {
      
      const updatedData = await PageServices.updateContactPageById({
        // Assuming your API expects the _id for updating
        pageTitle:pageTitle,
        pageName:pageName, // Assuming your API expects 'htmldes'
        description:description,
      });

      if(updatedData.status === 'success'){
				alert('Page info is updated');
                
			}else{
        alert('Something went wrong');
      }

    } catch (error) {
      console.error('Error updating data:', error);
      // Handle the error, e.g., show a message to the user
    }
  };


  
  return (
    

    <div className="content-wrapper">
   
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Contact Page</h1>
          </div>
         
        </div>
      </div>
    </section>

  
    <section className="content">

    
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Contact</h3>

          <div className="card-tools">
           
          </div>
        </div>
        <div className="card-body">
         
        <div className="card-body">
        <form role="form" >
          <div className="row">
          <div className="col-sm-6">
              <div className="form-group">
                <label>Page Name</label>
                <input name='pageName' type="text" value={pageName} className="form-control"  placeholder="About us" disabled  />
              </div>
            </div>
            <div className="col-sm-6">
              {/* text input */}
              <div className="form-group">
                <label>We're Here, Let's Talk</label>
                <input type="text" value={pageTitle} name='pageTitle' className="form-control" onChange={(e) => setPageTitle(e.target.value)} placeholder="Enter ..." />
              </div>
            </div>
            
          </div>
          <div className="row">
            <div className="col-sm-6">
              {/* textarea */}
              <div className="form-group">
                <label>Get in touch</label>
                <textarea className="form-control" value={description} name='pageDescription' onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Enter ..." defaultValue={""} />
              </div>
            </div>

            <div className="col-sm-6">
                  
              </div> 
              
          </div>
          
        
     

        </form>
      </div>



        </div>
        
        <div className="card-footer">
        <button type="submit" onClick={(e)=>{handleUpdate(e)}} className="btn btn-primary">Update</button>
        </div>
       
      </div>
      

    </section>
    
  </div>
  
  )
}

export default Contact