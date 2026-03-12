import React, { useState, useEffect } from 'react';
import PageServices from '../services/PageServices';

import useAsync from '../hooks/useAsync';
import Header from '../Header';
import Footer from '../Footer';
import Menu from '../Menu';

function Home() {

  const { data, loading, error, run } = useAsync(PageServices.getHomePageById);
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


  const handleUpdate = async () => {
    try {
      // Make an API call to update the data
      const updatedData = await PageServices.updateHomePageById({
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
            <h1>Home Page</h1>
          </div>
         
        </div>
      </div>
    </section>

  
    <section className="content">

    
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Home</h3>

          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
              <i className="fa fa-minus"></i></button>
            <button type="button" className="btn btn-tool" data-card-widget="remove" data-toggle="tooltip" title="Remove">
              <i className="fa fa-times"></i></button>
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
                <label>Page Title</label>
                <input type="text" value={pageTitle} name='pageTitle' className="form-control" onChange={(e) => setPageTitle(e.target.value)} placeholder="Enter ..." />
              </div>
            </div>
            
          </div>
          <div className="row">
            <div className="col-sm-6">
              {/* textarea */}
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" value={description} name='pageDescription' onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Enter ..." defaultValue={""} />
              </div>
            </div>

            <div className="col-sm-6">
              {/* textarea */}
              <div className="form-group">
                <label>Description</label>
                <div className="card-body pad">
        <div className="mb-3">
          <textarea className="textarea" value={htmldata} name='htmlPageEditor'onChange={(e) => setHtmlData(e.target.value)} placeholder="Place some text here" style={{width: '100%', height: '200px', fontSize: '14px', lineHeight: '18px', border: '1px solid #dddddd', padding: '10px'}} />
        </div>
      </div>
              </div>
            </div>
          </div>
        
     

        </form>
      </div>



        </div>
        
        <div className="card-footer">
        <button type="submit" onClick={handleUpdate} className="btn btn-primary">Update</button>
        </div>
       
      </div>
      

    </section>
    
    
  </div>
  
  )
}

export default Home