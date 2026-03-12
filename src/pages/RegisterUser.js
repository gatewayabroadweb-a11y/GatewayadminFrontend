import { FormProvider, RHFPhoneNumberInput, RHFSelectbox, RHFTextField } from '../hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PageServices from '../services/PageServices';
import { useNavigate } from 'react-router-dom';

const GENDER_OPTIONS = [
    { value: 'Male', name: 'Male' },
    { value: 'Female', name: 'Female' },
    { value: 'Other', name: 'Other' },
];
const REFERRAL_OPTIONS = [
    { value: 'Google', name: 'Google' },
    { value: 'Facebook', name: 'Facebook' },
    { value: 'Instagram', name: 'Instagram' },
    { value: 'Friend', name: 'Friend' },
    { value: 'Other', name: 'Other' },
];

const RegisterUser = () => {
    const navigate = useNavigate();
    const RegisterSchema = Yup.object().shape({
        name: Yup.string().required('Full Name is required'),
        phone: Yup.string()
            .required('Phone number is required')
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
        email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required')
            .test(
                'not-fake-email',
                'Temporary or fake email addresses are not allowed',
                (value) =>
                    value &&
                    !/@(yopmail\.com|mailinator\.com|tempmail\.com|10minutemail\.com)$/i.test(value)
            ),
        gender: Yup.string().required('Gender is required'),
        interestedCourse: Yup.string().required('Course of interest is required'),
        referralSource: Yup.string().required('Please let us know how you heard about us'),
    });

    const defaultValues = {
        name: '',
        phone: '',
        email: '',
        gender: '',
        interestedCourse: '',
        referralSource: '',
    };

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
        mode: 'all',
    });

    const {
        handleSubmit,
        formState: { isSubmitting, isDirty, isValid },
    } = methods;

    const onSubmit = async (data) => {
        try {
            const response = await PageServices.userRegistration(data);
            if (!response.message) throw new Error(response.error || 'Something went wrong');
            navigate('/thank-you', { replace: true });
        } catch (err) {
            navigate('/thank-you', { replace: true });
        }
    };

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Registration</h2>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <RHFTextField name="name" label="Full Name" required />
                    </div>
                    <div className="col-md-6">
                        <RHFPhoneNumberInput name="phone" label="Phone Number" required />
                    </div>
                    <div className="col-md-6">
                        <RHFTextField name="email" type="email" label="Email" required />
                    </div>
                    <div className="col-md-6">
                        <RHFSelectbox name="gender" label="Gender" menus={GENDER_OPTIONS} required />
                    </div>
                    <div className="col-md-6">
                        <RHFTextField name="interestedCourse" label="Interested Course" required />
                    </div>
                    <div className="col-md-6">
                        <RHFSelectbox name="referralSource" label="Where did you hear about us?" menus={REFERRAL_OPTIONS} required />
                    </div>
                    <div className="col-12">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isSubmitting || !isDirty || !isValid}
                        >
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </div>
            </FormProvider>
        </div>
    );
};

export default RegisterUser;