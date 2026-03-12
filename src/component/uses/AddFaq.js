import { React, useState, useEffect } from 'react'

import PageServices from '../../services/PageServices';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
import Footer from '../../Footer';
import Menu from '../../Menu';

function AddFaq() {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(' ');
  const [faqCategory, setfaqCategory] = useState([])



  const handleUpdate = async (e) => {

    e.preventDefault();
    if (!name || !content || !category) {
      alert('All fields are required');
      return;
    }
    try {
      // Make an API call to update the data
      const createJob = await PageServices.createFaq({
        title: name,
        content: content,
        category: category
      });

      if (createJob.status === 'success') {

        alert('Faq Created');
        navigate(`/admin/faq`);

      } else {
        alert('Something went wrong');
      }

    } catch (error) {
      console.error('Error updating data:', error);
      // Handle the error, e.g., show a message to the user
    }
  }

  const rescategory = async () => {
    try {
      const res = await PageServices.getAllCategoryfaq();



      const cos = setfaqCategory(res.data.category)



    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    rescategory()
  }, [])




  return (

    <div className="content-wrapper">

      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Add Faq</h1>
            </div>

          </div>
        </div>
      </section>


      <section className="content">


        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Add Faq</h3>

            <div className="card-tools">

            </div>
          </div>
          <div className="card-body">

            <div className="card-body">
              <form role="form">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Question ?</label>
                      <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Question" />
                    </div>
                  </div>


                </div>
                <div className="row">
                  <div className="col-sm-12">
                    {/* textarea */}
                    <div className="form-group">
                      <label>Answer</label>
                      <textarea className="form-control" rows={3} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Answer" />
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Select Course</label>
                      <div className="select-wrapper">
                        <select
                          className="form-control custom-select"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="">Select Course</option>

                          {faqCategory.map((cat, index) => (
                            <option key={index} value={cat}>
                              {cat}
                            </option>
                          ))}

                        </select>
                      </div>
                    </div>
                  </div>
                </div>



              </form>
            </div>



          </div>

          <div className="card-footer">
            <button type="submit" className="btn btn-primary" onClick={(e) => { handleUpdate(e) }} >Submit</button>
          </div>

        </div>


      </section>

    </div>

  )
}

export default AddFaq