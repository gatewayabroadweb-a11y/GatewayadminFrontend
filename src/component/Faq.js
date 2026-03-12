import React, { useState, useEffect } from 'react';
import PageServices from '../services/PageServices';
import useAsync from '../hooks/useAsync';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Menu from '../Menu';
function Faq() {

  const { data, loading, error, run } = useAsync(PageServices.getAllFaq);
  const [activeIndex, setActiveIndex] = useState(null);
  const [form, setform] = useState([]);
  const [form2, setform2] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  console.log(data)
  useEffect(() => {
    if (data?.data?.faq) {
      setform(data.data.faq || []);
      setform2(data.data.faq || []); // Assuming data.data.form is an array of contact objects
    }
  }, [data]);

  const handleCategoryChange = (e,category) => {
    e.preventDefault()
    setform(form2)
    setSelectedCategory(category)
    filterData(category,form2)
  };

  const filterData=(category,obj)=>{
    console.log("some",form)
    const filteredBlogCatogoryData = obj.filter(blog => {
      if (category === 'All') {
        return true; // Show all blogs if 'All' category is selected
      }
        return blog.category === category;
    });

    setform(filteredBlogCatogoryData)
  }

  const handleDelete = async (e,id) => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure you want to delete this Faq?');

  if (!confirmed) {
    return; // If not confirmed, do nothing
  }
    try {
      const response = await PageServices.deleteFaq(id);

      if(response.status === 'success'){
        alert("Faq Delete Successfully")
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
            <h1>Faq Page</h1>
          </div>
          <div className="col-sm-6">
          <div className="text-right">
                  
                  <Link to="/admin/add-faq" className="btn btn-sm btn-primary">
                  <i className="fa fa-Page" />
                  ADD FAQ
                </Link>
                </div>
                
                </div>
        </div>
      </div>
    </section>

  
    <section className="content">
    <div className='d-flex justify-content-between w-50 mb-4'>
                <Link to="" className="btn btn-sm btn-primary" onClick={(e)=>{handleCategoryChange(e,'All')}}>
                  <i className="fa fa-Page" />
                  ALL
                </Link>
                <Link to="" className="btn btn-sm btn-primary" onClick={(e)=>{handleCategoryChange(e,'GMAT')}}>
                  <i className="fa fa-Page" />
                  GMAT
                </Link>
                <Link to="" className="btn btn-sm btn-primary" onClick={(e)=>{handleCategoryChange(e,'IELTS')}}>
                  <i className="fa fa-Page" />
                  IELTS
                </Link>
                <Link to="" className="btn btn-sm btn-primary" onClick={(e)=>{handleCategoryChange(e,'TOEFL')}}>
                  <i className="fa fa-Page" />
                  TOEFL
                </Link>
                <Link to="" className="btn btn-sm btn-primary" onClick={(e)=>{handleCategoryChange(e,'GRE')}}>
                  <i className="fa fa-Page" />
                  GRE
                </Link>
                <Link to="" className="btn btn-sm btn-primary" onClick={(e)=>{handleCategoryChange(e,'PTE')}}>
                  <i className="fa fa-Page" />
                  PTE
                </Link>
                <Link to="" className="btn btn-sm btn-primary" onClick={(e)=>{handleCategoryChange(e,'SAT')}}>
                  <i className="fa fa-Page" />
                  SAT
                </Link>
                <Link to="" className="btn btn-sm btn-primary" onClick={(e)=>{handleCategoryChange(e,'spokenEnglish')}}>
                  <i className="fa fa-Page" />
                  Spoken English
                </Link>
                </div>
        {form.map((faq,index)=>(
    <div className={activeIndex == index?'card':'card collapsed-card'}>
        <div className="card-header" onClick={() => toggleAccordion(index)}>
          <h3 className="card-title">{faq.title}</h3>

          <div className="card-tools">
            <button type="button" className="btn btn-tool" >
              <i className={activeIndex==index?"fa fa-plus":"fa fa-minus"}></i></button>
            <button type="button" className="btn btn-tool"  onClick={(e)=>{handleDelete(e,faq._id)}} data-toggle="tooltip" title="Remove">
              <i className="fa fa-times"></i></button>
          </div>
        </div>
        <div className="card-body" style={activeIndex==index?{display:'block'}:{display:'none'}}>
         
        <div className="card-body">
        <p>{faq.content}</p>
      </div>



        </div>
        
        
       
      </div>
    
    ))}
    </section>
    
  </div>
  
  )
}

export default Faq