import { React, useState, useEffect } from 'react'
import PageServices from '../services/PageServices';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AddCourse() {
  const navigate = useNavigate();
  let { courseId } = useParams();
  const [id,] = useState(courseId);
  const [isEditing, setIsEditing] = useState(false);
  const [courseTitle, setCoursetitle] = useState('');
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerDescription, setBannerDescription] = useState('');
  const [htmlData, setHtmlData] = useState('');
  const [one, setOne] = useState('');
  const [Two, setTwo] = useState('');
  const [three, setThree] = useState('');
  const [four, setFour] = useState('');
  const [wone, setwOne] = useState('');
  const [wTwo, setwTwo] = useState('');
  const [wthree, setwThree] = useState('');
  const [wfour, setwFour] = useState('');
  const [wfive, setwfive] = useState('');
  const [wsix, setwSix] = useState('');
  const [acceptedCountrie, setAcceptedCountrie] = useState('');

  const [file, setFile] = useState(null)
  const [file2, setFile2] = useState(null)
  const [file3, setFile3] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // You can store the file in state or perform further actions
  };
  const handleFileChange2 = (e) => {
    setFile2(e.target.files[0]);
    // You can store the file in state or perform further actions
  };
  const handleFileChange3 = (e) => {
    setFile3(e.target.files[0]);
    // You can store the file in state or perform further actions
  };
  useEffect(() => {
    // Check if id exists, if yes, it means we are editing an existing job
    if (id) {

      const fetchData = async () => {
        try {
          const response = await PageServices.getCourseById(id);
          if (response.status === 'success') {
            setCoursetitle(response.data.page.pageTitle || '');
            setCourseName(response.data.page.pageName || '');
            setDescription(response.data.page.description || '');
            setOne(response.data.page.whatIsOn.one || '');
            setTwo(response.data.page.whatIsOn.two || '');
            setThree(response.data.page.whatIsOn.three || '');
            setFour(response.data.page.whatIsOn.four || '');
            setwOne(response.data.page.whyChoose.one || '');
            setwTwo(response.data.page.whyChoose.two || '');
            setwThree(response.data.page.whyChoose.three || '');
            setwFour(response.data.page.whyChoose.four || '');
            setwfive(response.data.page.whyChoose.five || '');
            setwSix(response.data.page.whyChoose.six || '');
            setBannerTitle(response.data.page.textFild || '');
            setAcceptedCountrie(response.data.page.acceptedCountrie || '');
            setBannerDescription(response.data.page.textFild2 || '');

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

  const handleUpdate = async (e) => {
    console.log(file)
    e.preventDefault();
    if (isEditing) {
      try {
        const formData = new FormData();
        formData.append('pageName', courseName);
        formData.append('pageTitle', courseTitle);
        formData.append('description', description);
        formData.append('whatIsOn[one]', one);
        formData.append('whatIsOn[two]', Two); // Assuming 'two', 'three', 'four' are state variables
        formData.append('whatIsOn[three]', three);
        formData.append('whatIsOn[four]', four);
        formData.append('whyChoose[one]', wone);
        formData.append('whyChoose[two]', wTwo); // Assuming 'two', 'three', 'four' are state variables
        formData.append('whyChoose[three]', wthree);
        formData.append('whyChoose[four]', wfour);
        formData.append('whyChoose[five]', wfive);
        formData.append('whyChoose[six]', wsix);
        formData.append('textFild', bannerTitle);
        formData.append('textFild2', bannerDescription);
        formData.append('acceptedCountrie', acceptedCountrie);
        if (file) {
          formData.append('file', file);
        };
        if (file2) {
          formData.append('file2', file2);
        };
        if (file3) {
          formData.append('file3', file3);
        };
        const updatedData = await PageServices.updateCourse(id, formData);

        if (updatedData.status === 'success') {
          alert('Course Updated');

        } else {
          alert('Something went wrong');
        }

      } catch (error) {
        console.error('Error updating data:', error);
        // Handle the error, e.g., show a message to the user
      }
    } else {
      try {
        // Make an API call to update the data
        const createJob = await PageServices.createJobe({
          pageName: courseName,
          pageTitle: courseTitle,
          description: description,
          htmlSnipit: htmlData
        });

        if (createJob.status === 'success') {
          setIsEditing(true);
          alert('Course Created');
          navigate(`/courses`);

        } else {
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
              <h1>{isEditing ? "Update" : "Add"} Course</h1>
            </div>

          </div>
        </div>
      </section>


      <section className="content">


        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{isEditing ? "Update" : "Add"} Course</h3>

            <div className="card-tools">

            </div>
          </div>
          <div className="card-body">

            <div className="card-body">
              <form role="form">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Course Name</label>
                      <input type="text" className="form-control" value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="Course Name" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    {/* text input */}
                    <div className="form-group">
                      <label>Course Title</label>
                      <input type="text" className="form-control" value={courseTitle} onChange={(e) => setCoursetitle(e.target.value)} placeholder="Enter ..." />
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Banner Title</label>
                      <input type="text" className="form-control" value={bannerTitle} onChange={(e) => setBannerTitle(e.target.value)} placeholder="Banner Title" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    {/* text input */}
                    <div className="form-group">
                      <label>Banner Description</label>
                      <input type="text" className="form-control" value={bannerDescription} onChange={(e) => setBannerDescription(e.target.value)} placeholder="Enter ..." />
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-sm-6">
                    {/* textarea */}
                    <div className="form-group">
                      <label>What is {courseName}?</label>
                      <textarea className="form-control" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter ..." defaultValue={""} />
                    </div>
                  </div>
                  <div className="row">
                    <label>Why Is On {courseName}</label>

                    <div className="col-sm-6">
                      {/* text input */}
                      <div className="form-group">
                        <label>One</label>
                        <input type="text" className="form-control" value={one} onChange={(e) => setOne(e.target.value)} placeholder="Enter ..." />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      {/* text input */}
                      <div className="form-group">
                        <label>Two</label>
                        <input type="text" className="form-control" value={Two} onChange={(e) => setTwo(e.target.value)} placeholder="Enter ..." />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      {/* text input */}
                      <div className="form-group">
                        <label>Three</label>
                        <input type="text" className="form-control" value={three} onChange={(e) => setThree(e.target.value)} placeholder="Enter ..." />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      {/* text input */}
                      <div className="form-group">
                        <label>Four</label>
                        <input type="text" className="form-control" value={four} onChange={(e) => setFour(e.target.value)} placeholder="Enter ..." />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <label>Why Choose {courseName}</label>

                    <div className="col-sm-6">
                      {/* text input */}
                      <div className="form-group">
                        <label>One</label>
                        <input type="text" className="form-control" value={wone} onChange={(e) => setwOne(e.target.value)} placeholder="Enter ..." />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      {/* text input */}
                      <div className="form-group">
                        <label>Two</label>
                        <input type="text" className="form-control" value={wTwo} onChange={(e) => setwTwo(e.target.value)} placeholder="Enter ..." />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      {/* text input */}
                      <div className="form-group">
                        <label>Three</label>
                        <input type="text" className="form-control" value={wthree} onChange={(e) => setwThree(e.target.value)} placeholder="Enter ..." />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      {/* text input */}
                      <div className="form-group">
                        <label>Four</label>
                        <input type="text" className="form-control" value={wfour} onChange={(e) => setwFour(e.target.value)} placeholder="Enter ..." />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Five</label>
                        <input type="text" className="form-control" value={wfive} onChange={(e) => setwfive(e.target.value)} placeholder="Enter ..." />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Six</label>
                        <input type="text" className="form-control" value={wsix} onChange={(e) => setwSix(e.target.value)} placeholder="Enter ..." />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label>Header Image</label>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="customFile" onChange={handleFileChange} />
                      <label className="custom-file-label" htmlFor="customFile">{file?.name ? file?.name : "choose File"}</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label>Banner Image</label>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="customFile" onChange={handleFileChange2} />
                      <label className="custom-file-label" htmlFor="customFile">{file2?.name ? file2?.name : "choose File"}</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label>Course Image</label>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="customFile" onChange={handleFileChange3} />
                      <label className="custom-file-label" htmlFor="customFile">{file3?.name ? file3?.name : "choose File"}</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>countries </label>
                      <input type="number" className="form-control" value={acceptedCountrie} onChange={(e) => setAcceptedCountrie(e.target.value)} placeholder="Enter ..." />
                    </div>
                  </div>
                </div>



              </form>
            </div>



          </div>

          <div className="card-footer">
            <button type="submit" className="btn btn-primary" onClick={(e) => { handleUpdate(e) }} >{isEditing ? "Update" : "Add"} Course</button>
          </div>

        </div>


      </section>

    </div>

  )
}

export default AddCourse