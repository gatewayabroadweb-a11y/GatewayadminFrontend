import React, { useState, useEffect,useRef } from 'react';
import PageServices from '../services/PageServices';

import useAsync from '../hooks/useAsync';

function NewsLetter() {

  const { data, loading, error, run } = useAsync(PageServices.getAllEmail);

  
  const [emailData, setEmailData] = useState('');
  
 


  // useEffect to update form fields when data changes
  useEffect(() => {
    // Check if data is available and update form fields
    if (data?.data?.news) {
        const emailString = data.data.news.map(email => email.email).join(',');
        
      setEmailData(emailString)  
    }
  }, [data]);

  
  
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
            <div className="col-sm-12 ">
              {/* textarea */}
              <div className="form-group">
                <label>Emails</label>
                <textarea className="form-control" value={emailData} name='pageDescription'  rows={5} placeholder="Enter ..."  disabled />
              </div>
            </div>

              
          </div>
          
        
     

        </form>
      </div>



        </div>
        
        <div className="card-footer">
        
        </div>
       
      </div>
      

    </section>
    
  </div>
  
  )
}

export default NewsLetter