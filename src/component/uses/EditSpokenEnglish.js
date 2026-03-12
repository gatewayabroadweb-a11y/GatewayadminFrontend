import React, { memo } from 'react'
import PageServices from '../../services/PageServices';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { RHFTextField, FormProvider, RHFUpdateImage } from '../../hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toasterService } from '../../custom/toasterService';

function EditSpokenEnglish() {

  React.useEffect(() => {
    getSpokenEnglish();
  }, []);

  const HomePageEditSchema = Yup.object().shape({
    Title: Yup.string().required('required'),
    Description: Yup.string().required('required'),
    MetaTitle: Yup.string().required('required'),
    SubTitle: Yup.string(),
    file: Yup.mixed().required('File is Required'),
    descriptions: Yup.string().required('required'),
    keyword: Yup.string().required('required'),
    WhyChoose: Yup.array().of(
      Yup.object().shape({
        title: Yup.string()
          .required('Title is required')
          .min(3, 'Title must be at least 3 characters long'),
        iconImage: Yup.mixed().required('File is Required'),
        content: Yup.string()
          .required('Content is required')
          .min(10, 'Content must be at least 10 characters long')
      })
    ).min(1, 'At least one item is required in the WhyChoose array'),
    ComponentsLanguage: Yup.array().of(
      Yup.object().shape({
        section: Yup.string()
          .required('Section is required')
          .min(3, 'Section must be at least 3 characters long'),
        content: Yup.string()
          .required('Content is required')
          .min(10, 'Content must be at least 10 characters long'),
        components: Yup.array().of(
          Yup.object().shape({
            name: Yup.string()
              .required('Component name is required')
              .min(3, 'Component name must be at least 3 characters long'),
            description: Yup.string()
              .required('Component description is required')
              .min(10, 'Component description must be at least 10 characters long')
          })
        )
      })
    ).min(1, 'At least one section is required in ComponentsLanguage')
  });

  const defaultValues = {
    Title: "",
    SubTitle: "",
    Description: "",
    MetaTitle: "",
    file: null,
    descriptions: "",
    keyword: "",
  };

  const methods = useForm({
    resolver: yupResolver(HomePageEditSchema),
    defaultValues: {
      ...defaultValues,
      WhyChoose: [{ title: '', iconImage: '', content: '' }],
      ComponentsLanguage: [{
        section: '',
        content: '',
        components: [
          {
            name: '',
            description: ''
          }
        ]
      }]
    },
    mode: "onChange"
  });

  const {
    handleSubmit,
    setValue,
    reset,
    control,
    watch,
    formState: { isDirty, isValid },
  } = methods;

  const { fields: fieldsWhyChoose, append: appendWhyChoose, remove: removeWhyChoose } = useFieldArray({
    control,
    name: 'WhyChoose'
  });

  const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control,
    name: 'ComponentsLanguage'
  });

  const onSubmit = (_data) => {
    const formData = new FormData();
    if (_data && !!watch('Description')?.length) {
      formData.append('Title', _data['Title']);
      formData.append('Description', _data['Description']);
      formData.append('SubTitle', _data['SubTitle']);
      formData.append('keyword', _data['keyword']);
      formData.append('descriptions', _data['descriptions']);
      formData.append('MetaTitle', _data['MetaTitle']);
      formData.append('ComponentsLanguage', JSON.stringify(_data['ComponentsLanguage']));
      if (_data.file && typeof _data.file === 'object') { formData.append('file', _data.file) };
      _data.WhyChoose.forEach(element => {
        if (element.iconImage && typeof element.iconImage === 'object') {
          formData.append('iconImage', element.iconImage);
          element.iconImage = "";
        }
      });
      formData.append('WhyChoose', JSON.stringify(_data.WhyChoose));
      handleUpdate(formData);
    };
  }

  const handleUpdate = async (formData) => {
    const updatedData = await PageServices.updateSpokenEnglishDetails(formData);
    if (updatedData) {
      getSpokenEnglish();
      toasterService(updatedData.message, 2, 43535354)
    }
  };

  const getSpokenEnglish = async () => {
    try {
      const response = await PageServices.getSpokenEnglishDetails();
      if (response.status === 'success') {
        reset(response.data);
        setValue('file', response.data.image);
        response.data?.WhyChoose.forEach((element, index) => {
          setValue(`WhyChoose[${index}].iconImage`, element.iconImage);
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (

    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Edit Spoken English</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} role="form">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Edit Spoken English Details</h3>
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
                <div className="row align-items-center">
                  <div className="row align-items-center justify-content-between">
                    <div className="col d-flex justify-content-start align-items-center">
                      <h6 className='mb-2'>
                        Why Choose Gateway Abroad
                      </h6>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => appendWhyChoose({ title: '', iconImage: '', content: '' })}
                      >
                        Add Field
                      </button>
                    </div>
                  </div>
                  {fieldsWhyChoose.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <div className="col-sm-6 form-group">
                        <RHFTextField name={`WhyChoose.${index}.title`} label="Title" />
                      </div>
                      <div className="col-sm-6 form-group">
                        <RHFUpdateImage name={`WhyChoose.${index}.iconImage`} label="Icon Image" />
                      </div>
                      <div className="col-10 form-group">
                        <RHFTextField name={`WhyChoose.${index}.content`} label="Content" />
                      </div>
                      <div className="col-2">
                        {fieldsWhyChoose.length > 1 && <button
                          type="button"
                          className="mt-4 btn btn-danger"
                          onClick={() => removeWhyChoose(index)}
                        >
                          Remove
                        </button>}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <div className="row align-items-center">
                  <div className="row align-items-center justify-content-between mb-2">
                    <div className="col d-flex justify-content-start align-items-center">
                      <h6 className='mb-2'>
                        Components of the English Language
                      </h6>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                          appendLanguage({
                            section: '',
                            content: '',
                            components: [{ name: '', description: '' }]
                          })
                        }
                      >
                        Add Section
                      </button>
                    </div>
                  </div>
                  {languageFields.map((languageItem, languageIndex) => (
                    <div key={languageItem.id} className="card mb-3">
                      <div className="card-body row">
                        {/* Section */}
                        <div className="col-sm-6 form-group">
                          <RHFTextField name={`ComponentsLanguage.${languageIndex}.section`} label="Section Name" />
                        </div>

                        <div className="col-sm-6 form-group">
                          <RHFTextField name={`ComponentsLanguage.${languageIndex}.content`} label="Content" />
                        </div>
                        {/* Nested FieldArray for Components */}
                        <div className="nested-array">
                          <h6>Components</h6>
                          <ComponentsFieldArray
                            control={control}
                            languageIndex={languageIndex}
                          />
                        </div>

                        {/* Remove Section Button */}
                        {languageFields.length > 1 && <div className="col-2">
                          <button
                            type="button"
                            className="btn btn-danger mt-3"
                            onClick={() => removeLanguage(languageIndex)}
                          >
                            Remove Section
                          </button>
                        </div>}
                      </div>
                    </div>
                  ))}
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
};
// ComponentsFieldArray component for nested array handling
const ComponentsFieldArray = ({ control, languageIndex }) => {
  const { fields: componentFields, append: appendComponent, remove: removeComponent } = useFieldArray({
    control,
    name: `ComponentsLanguage.${languageIndex}.components`
  });

  return (
    <>
      {componentFields.map((componentItem, componentIndex) => (
        <div key={componentItem.id} className="row">
          <div className="col-sm-6 form-group">
            <RHFTextField name={`ComponentsLanguage.${languageIndex}.components.${componentIndex}.name`} label="Name" />
          </div>
          <div className="col-sm-6 form-group">
            <RHFTextField name={`ComponentsLanguage.${languageIndex}.components.${componentIndex}.description`} label="Description" />
          </div>

          
            <div className="col-2">
              <button
                type="button"
                className="btn btn-warning mt-2"
                onClick={() => removeComponent(componentIndex)}
              >
                Remove Component
              </button>
            </div>
          
        </div>
      ))}
      <button
        type="button"
        className="btn btn-info mt-2"
        onClick={() =>
          appendComponent({ name: '', description: '' })
        }
      >
        Add Component
      </button>
    </>
  );
};

export default memo(EditSpokenEnglish)