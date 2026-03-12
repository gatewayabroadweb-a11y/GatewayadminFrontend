import React, { useState, useEffect } from 'react';
import PageServices from '../../services/PageServices';

import useAsync from '../../hooks/useAsync';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Footer from '../../Footer';
import Menu from '../../Menu';

const ContactDetail = () => {

  const { data, loading, error, run } = useAsync(PageServices.getSettingData);

  // State variables for form fields
  const [contactOne, setcontactOne] = useState('');
  const [contactTwo, setcontactTwo] = useState('');
  const [contactThree, setcontactThree] = useState('');
  const [email, setemail] = useState('');
  const [facebook, setfacebook] = useState('');
  const [instagram, setinstagram] = useState('');
  const [linkdin, setlinkdin] = useState('');
  const [tweeter, settweeter] = useState('');
  const [googlePlus, setgooglePlus] = useState('');
  const [pintrest, setpintrest] = useState('');
  const [youtube, setyoutube] = useState('');
  const [adressOne, setadressOne] = useState('');
  const [adressTwo, setadressTwo] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  
  const [logo, setLogo] = useState(null);

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  console.log(data);

  // useEffect to update form fields when data changes
  useEffect(() => {
    // Check if data is available and update form fields
    if (data?.data?.setting) {
      setLogo(data.data.setting.logo || '');
      setcontactOne(data.data.setting.contectOne || '')
      setcontactTwo(data.data.setting.contectTwo || '')
      setcontactThree(data.data.setting.contectThree || '')
      setemail(data.data.setting.email || '')
      setfacebook(data.data.setting.facebook || '')
      setinstagram(data.data.setting.instagram || '')
      setlinkdin(data.data.setting.linkdin || '')
      settweeter(data.data.setting.tweeter || '')
      setgooglePlus(data.data.setting.googlePlus || '')
      setpintrest(data.data.setting.pintrest || '')
      setyoutube(data.data.setting.youtube || '')
      setadressOne(data.data.setting.adressOne || '')
      setadressTwo(data.data.setting.adressTwo || '')
      
      setOfficeAddress(data.data.setting.officeAdress || '')
    }
  }, [data]);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('facebook', facebook);
      formData.append('instagram', instagram);
      formData.append('linkdin', linkdin);
      formData.append('tweeter', tweeter);
      formData.append('pintrest', pintrest);
      formData.append('youtube', youtube);
      formData.append('googlePlus', googlePlus);
      formData.append('contectOne', contactOne);
      formData.append('contectTwo', contactTwo);
      formData.append('contectThree', contactThree);
      formData.append('email', email);
      formData.append('adressOne', adressOne);
      formData.append('adressTwo', adressTwo);
      formData.append('officeAdress', officeAddress);
      
      formData.append('file', logo);
      // Make an API call to update the data
      const updatedData = await PageServices.updateSettingData(formData);

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
    {/* Content Header (Page header) */}
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Contact Info</h1>
          </div>
          
        </div>
      </div>{/* /.container-fluid */}
     
    </section>
    {/* Main content */}
    <section className="content">
      {/* Default box */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Contact Info</h3>
          <div className="card-tools">
           
          </div>
        </div>
        <div className="card-body p-0">
        <div className="card-body">
         
         <div className="card-body">
         <form role="form">
           <div className="row">
           <div className="col-sm-6">
               <div className="form-group">
                 <label>Facebook Profile Link</label>
                 <input type="text" className="form-control" value={facebook}  onChange={(e) => setfacebook(e.target.value)} placeholder="http://facebook.com"  />
               </div>
             </div>
             <div className="col-sm-6">
               {/* text input */}
               <div className="form-group">
                 <label>Instagram Profile Link</label>
                 <input type="text" className="form-control" value={instagram} onChange={(e) => setinstagram(e.target.value)} placeholder="http://instagram.com" />
               </div>
             </div>
             <div className="col-sm-6">
               <div className="form-group">
                 <label>LinkedIn Profile Link</label>
                 <input type="text" className="form-control" value={linkdin} onChange={(e) => setlinkdin(e.target.value)} placeholder="http://facebook.com"  />
               </div>
             </div>
             <div className="col-sm-6">
               {/* text input */}
               <div className="form-group">
                 <label>Quora Profile Link</label>
                 <input type="text" className="form-control" value={tweeter} onChange={(e) => settweeter(e.target.value)} placeholder="http://instagram.com" />
               </div>
             </div>
             <div className="col-sm-6">
               <div className="form-group">
                 <label>Pinterest Profile Link</label>
                 <input type="text" className="form-control" value={pintrest} onChange={(e) => setpintrest(e.target.value)} placeholder="http://facebook.com"  />
               </div>
             </div>
             <div className="col-sm-6">
               {/* text input */}
               <div className="form-group">
                 <label>Youtube Channel Link</label>
                 <input type="text" className="form-control" value={youtube} onChange={(e) => setyoutube(e.target.value)} placeholder="http://instagram.com" />
               </div>
             </div>
             <div className="col-sm-6">
               {/* text input */}
               <div className="form-group">
                 <label>GooglePlus Profile Link</label>
                 <input type="text" className="form-control" value={googlePlus} onChange={(e) => setgooglePlus(e.target.value)} placeholder="http://instagram.com" />
               </div>
             </div>
             <div className="col-sm-6">
               {/* text input */}
               <div className="form-group">
                 <label>Contact No 1</label>
                 <input type="text" className="form-control" value={contactOne} onChange={(e) => setcontactOne(e.target.value)} placeholder="9876543210" />
               </div>
             </div>
             <div className="col-sm-6">
               {/* text input */}
               <div className="form-group">
                 <label>Contact No 2</label>
                 <input type="text" className="form-control" value={contactTwo} onChange={(e) => setcontactTwo(e.target.value)} placeholder="9876543210" />
               </div>
             </div>
             <div className="col-sm-6">
               {/* text input */}
               <div className="form-group">
                 <label>Contact No 3</label>
                 <input type="text" className="form-control" value={contactThree} onChange={(e) => setcontactThree(e.target.value)} placeholder="9876543210" />
               </div>
             </div>
             <div className="col-sm-6">
               {/* text input */}
               <div className="form-group">
                 <label>Email</label>
                 <input type="text" className="form-control" value={email} onChange={(e) => setemail(e.target.value)} placeholder="testuser@gmail.com" />
               </div>
             </div>
             <div className="col-sm-6">
              {/* textarea */}
              <div className="form-group">
                <label>Office Address</label>
                <textarea className="form-control" rows={3} value={officeAddress} onChange={(e) => setOfficeAddress(e.target.value)} placeholder="Enter ..." defaultValue={""} />
              </div>
            </div>

             <div className="col-sm-6">
              {/* textarea */}
              <div className="form-group">
                <label>Address 1</label>
                <textarea className="form-control" rows={3} value={adressOne} onChange={(e) => setadressOne(e.target.value)} placeholder="Enter ..." defaultValue={""} />
              </div>
            </div>
            <div className="col-sm-6">
              {/* textarea */}
              <div className="form-group">
                <label>Address 2</label>
                <textarea className="form-control" rows={3} value={adressTwo} onChange={(e) => setadressTwo(e.target.value)} placeholder="Enter ..." defaultValue={""} />
              </div>
            </div>
            
            
           </div>
           
         
           <button type="submit" onClick={(e)=>{handleUpdate(e)}} className="btn btn-primary">Update</button>
 
         </form>
       </div>
 
 
 
         </div>
        </div>
        
        {/* /.card-body */}
      </div>
      {/* /.card */}
    </section>
    {/* /.content */}
  </div>
  
  )
}
export default ContactDetail;