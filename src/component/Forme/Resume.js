import React, { useState, useEffect } from 'react';
import PageServices from '../../services/PageServices';

import useAsync from '../../hooks/useAsync';
import { Link } from 'react-router-dom';
import { constant } from '../../constant/index.constant';

function Resume() {

  const { data, run } = useAsync(PageServices.getResumeData);

  // State variables for form fields
  const [form, setform] = useState([]);

  // useEffect to trigger the async function on mount
  console.log(data)

  // useEffect to update form fields when data changes
  useEffect(() => {
    if (data?.data?.form) {
      setform(data.data.form || []); // Assuming data.data.form is an array of contact objects
    }
  }, [data]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const response = await PageServices.deleteFormeData(id);

      if (response.status === 'success') {
        alert("data deleted successfully")
        run();

      } else {
        alert('something went wrong')
      }
    } catch (error) {
      // Handle error if the request fails
      console.error('Error fetching data:', error);
    }
  };

  return (

    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Resume</h1>
            </div>

          </div>
        </div>{/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        {/* Default box */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Resume</h3>
            <div className="card-tools">

            </div>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: '1%' }}>
                    #
                  </th>
                  <th style={{ width: '20%' }}>
                    Name
                  </th>
                  <th style={{ width: '30%' }}>
                    Email
                  </th>
                  <th>
                    Phone
                  </th>

                  <th style={{ width: '8%' }} className="text-center">
                    Test Preparation
                  </th>
                  <th style={{ width: '20%' }}>
                  </th>
                </tr>
              </thead>
              <tbody>
                {form.map((contact, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td className="project_progress">{contact.mobileNo}</td>
                    <td className="project-state">{contact.eduInterest}</td>
                    <td className="project-actions text-right">
                      <button
                        className="btn btn-primary btn-sm mr-2"
                        onClick={() => window.open(`${"https://www.gatewayabroadeducations.com"}/uploads/${contact.file}`, '_blank')}
                      >
                        <i className="fa fa-folder"></i> View
                      </button>
                      <Link className="btn btn-danger btn-sm" onClick={(e) => handleDelete(e, contact._id)}>
                        <i className="fa fa-trash"></i>
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </section>
      {/* /.content */}
    </div>

  )
}

export default Resume