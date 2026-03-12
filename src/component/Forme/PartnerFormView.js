import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageServices from '../../services/PageServices';
import Header from '../../Header';
import Footer from '../../Footer';
import Menu from '../../Menu';

function PartnerFormView() {
  const { partnerId } = useParams();
  
  const [data, setform] = useState([]);
  

  // PageServices.getFormDataById(contactId).then(response => {
  //   // Access the data from the resolved Promise
  //   setform(response)
  
  // });

  console.log(data ,partnerId)
  
  useEffect(() => {
    // Define an asynchronous function within useEffect
    const fetchData = async () => {
      try {
        const response = await PageServices.getFormDataById(partnerId);
        if(response.status === 'success'){
          setform(response.data);
                
			}else{
        setform([]);
      }
      } catch (error) {
        // Handle error if the request fails
        console.error('Error fetching data:', error);
      }
    };

    // Call the asynchronous function
    fetchData();
  }, [partnerId]);
  return (
   
    <div className="content-wrapper">
   
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>View Detail</h1>
          </div>
        </div>
      </div>
      <Link className="btn btn-primary" to={"/admin/partner" }>
                        Back
                      </Link>
    </section>

  
    <section className="content">

    
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">View Form</h3>

          <div className="card-tools">
            
          </div>
        </div>
        <div className="card-body">
         
        <div className="card-body">
        <form role="form">
          <div className="row">
          <div className="col-sm-3">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" value={data.forme?data.forme.name: ''}  placeholder="" disabled />
              </div>
            </div>

            <div className="col-sm-3">
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control"value={data.forme?data.forme.lastName : ''}  placeholder="" disabled />
              </div>
            </div>
            
            
          
        
          <div className="col-sm-3">
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control"value={data.forme?data.forme.email : ''} placeholder="" disabled />
              </div>
            </div>

            <div className="col-sm-3">
              <div className="form-group">
                <label>City</label>
                <input type="text" className="form-control"  value={data.forme?data.forme.city : ''} placeholder="" disabled />
              </div>
            </div>
            </div>
            
            <div className="row">
          <div className="col-sm-3">
              <div className="form-group">
                <label>Number</label>
                <input type="text" className="form-control"value={data.forme?data.forme.mobileNo : ''} placeholder="" disabled />
              </div>
            </div>

            <div className="col-sm-3">
              <div className="form-group">
                <label>WhatsApp No.</label>
                <input type="text" className="form-control"  value={data.forme?data.forme.whatsappNo : ''} placeholder="" disabled />
              </div>
            </div>
            
          

          
          <div className="col-sm-3">
              <div className="form-group">
                <label>Age</label>
                <input type="text" className="form-control"value={data.forme?data.forme.age : ''} placeholder="" disabled />
              </div>
            </div>

            <div className="col-sm-3">
              <div className="form-group">
                <label>Ocupation</label>
                <input type="text" className="form-control"  value={data.forme?data.forme.occupation : ''} placeholder="" disabled />
              </div>
            </div>
            
          </div>
          <div className='row'>
          <div className="col-sm-6">
            
            <div className="form-group">
              <label>Address</label>
              <textarea className="form-control" rows={2} placeholder="lorem32" value={data.forme?data.forme.adress : ''}  disabled/>
            </div>
          </div>
          <div className="col-sm-6">
            
            <div className="form-group">
              <label>Qualification</label>
              <textarea className="form-control" rows={2} placeholder="lorem32" value={data.forme?data.forme.qualification : ''}  disabled/>
            </div>
          </div>
          </div>
          
          <div className='row'>
          <div className="col-sm-6">
            
            <div className="form-group">
              <label>How Did you know about us ?</label>
              <textarea className="form-control" rows={2} placeholder="lorem32" value={data.forme?data.forme.howDidyouKnow : ''}  disabled/>
            </div>
          </div>
          <div className="col-sm-6">
            
            <div className="form-group">
              <label>Introduction</label>
              <textarea className="form-control" rows={2} placeholder="lorem32" value={data.forme?data.forme.message : ''}  disabled/>
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

export default PartnerFormView