import React, { memo } from 'react'
import PageServices from '../../services/PageServices';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { RHFTextField, FormProvider, RHFUpdateImage } from '../../hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toasterService } from '../../custom/toasterService';

function EditHomePage() {

  React.useEffect(() => {
    getHomePageData();
  }, []);

  const HomePageEditSchema = Yup.object().shape({
    Title: Yup.string().required('required'),
    Description: Yup.string().required('required'),
    MetaTitle: Yup.string().required('required'),
    SubTitle: Yup.string(),
    createdBy: Yup.string(),
    file: Yup.mixed().required('File is Required'),
    descriptions: Yup.string().required('required'),
    keyword: Yup.string().required('required')
  });

  const defaultValues = {
    Title: "",
    SubTitle: "",
    Description: "",
    MetaTitle: "",
    createdBy: "",
    file: null,
    descriptions: "",
    keyword: "",
  };

  const methods = useForm({
    resolver: yupResolver(HomePageEditSchema),
    defaultValues,
    mode: "all"
  });

  const {
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty, isValid },
  } = methods;

  const getHomePageData = async () => {
    try {
      const response = await PageServices.getHomePageDetails();
      if (response.status === 'success') {
        reset(response.data);
        setValue('file', { name: response.data.image });
      } else {
        console.log('something went wrong');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdate = async (formData) => {
    const updatedData = await PageServices.updateHomePageDetails(formData);
    if (updatedData) {
      console.log(updatedData);
      getHomePageData();
      toasterService(updatedData.message, 2, 43535354)
    }
  };

  const onSubmit = async (_data) => {
    const formData = new FormData();
    if (_data && !!watch('Description')?.length) {
      formData.append('Title', _data['Title']);
      formData.append('Description', _data['Description']);
      formData.append('SubTitle', _data['SubTitle']);
      formData.append('keyword', _data['keyword']);
      formData.append('descriptions', _data['descriptions']);
      formData.append('MetaTitle', _data['MetaTitle']);
      if (_data.file && typeof _data.file === 'object') formData.append('file', _data.file);
      handleUpdate(formData);
    }
  }

  return (

    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Edit Home Page</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} role="form">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Edit Home Page Details</h3>
            </div>
            <div className="card-body">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <RHFTextField name="Title" label="Title" required />
                      <span className='small'>Use ; to brake value. <span className='text-muted'>Ex. Welcome to;Gateway Abroad</span> </span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <RHFTextField name="SubTitle" label="Sub Title" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Description</label>
                      <ReactQuill
                        theme="snow"
                        value={watch('Description')}
                        onChange={(value) => setValue('Description', value, { shouldDirty: true })}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 form-group">
                    <RHFUpdateImage name="file" label="Background Image" />
                  </div>

                  <div className="col-sm-6 form-group">
                    <RHFTextField name="MetaTitle" label="Meta Title" />
                  </div>
                </div>
                <div className="row">
                  <div className='col-6'>
                    <RHFTextField name="keyword" label="SEO Keyword" required />
                    <span className='small'>Use commoma saprate for multiple keywords. <span className='text-muted'>Ex. news,blog</span> </span>
                  </div>
                  <div className='col-6'>
                    <RHFTextField name="descriptions" label="SEO Descriptions" required />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer d-flex gap-2">
              <button disabled={!isDirty || !isValid} type="submit" className="btn btn-primary">Submit</button>
            </div>

          </div>
        </FormProvider>

      </section>

    </div>

  )
}

export default memo(EditHomePage)