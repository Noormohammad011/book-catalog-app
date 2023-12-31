import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { string, TypeOf, z, ZodType } from 'zod';
import logo from '../assets/lgoo.png';
import { IUser } from '../redux/features/api/type';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

const registerSchema: ZodType<IUser> = z
  .object({
    name: string()
      .min(1, {
        message: 'Name is required',
      })
      .max(100),
    email: string()
      .min(1, {
        message: 'Email Address is required',
      })
      .email({
        message: 'Please enter a valid email',
      }),
    password: string()
      .min(1, {
        message: 'Password is required',
      })
      .min(5, {
        message: 'Password must be at least 5 characters',
      })
      .max(32, {
        message: 'Password must be less than 32 characters',
      }),
    confirmPassword: string().min(1, {
      message: 'Confirm Password is required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type RegisterInput = TypeOf<typeof registerSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(registerSchema),
  });

  const [registerUser, { data, isLoading, isSuccess, isError }] =
    useRegisterUserMutation();

  const onSubmit = (data: RegisterInput) => {
    registerUser(data);
  };
  if (isSuccess) {
    toast.success(data?.message, {
      autoClose: 2000,
      toastId: Math.random(),
    });
    navigate('/login');
  }
  if (isError) {
    toast.error('invalid credentials', {
      autoClose: 2000,
      toastId: Math.random(),
    });
  }

  return (
    <>
      {isLoading ? (
        <div> Loading </div>
      ) : (
        <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
          <div className="container mx-auto">
            <div className="w-full px-4">
              <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]">
                <div className="mb-10 text-center md:mb-16">
                  <a href="/#" className="mx-auto inline-block max-w-[160px]">
                    <img src={logo} alt="logo" />
                  </a>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Enter name"
                      {...register('name')}
                      className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-indigo-600 focus-visible:shadow-none"
                    />
                    {errors.name?.message && (
                      <p>{errors.name?.message as string}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-indigo-600 focus-visible:shadow-none"
                      {...register('email')}
                    />
                    {errors.email?.message && (
                      <p>{errors.email?.message as string}</p>
                    )}
                  </div>
                  <div className="mb-6">
                    <input
                      type="password"
                      placeholder="Enter Password"
                      {...register('password')}
                      className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-indigo-600 focus-visible:shadow-none"
                    />
                    {errors.password?.message && (
                      <p>{errors.password?.message as string}</p>
                    )}
                  </div>
                  <div className="mb-6">
                    <input
                      type="password"
                      placeholder="Enter Confirm Password"
                      {...register('confirmPassword')}
                      className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-indigo-600 focus-visible:shadow-none"
                    />

                    {errors.confirmPassword?.message && (
                      <p>{errors.confirmPassword?.message as string}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className="mt-6 w-full inline-block text-base font-semibold rounded-md bg-indigo-600 text-white py-3 px-5 hover:bg-indigo-700 transition duration-200"
                  >
                    Submit Now
                  </button>
                </form>

                <Link
                  to="/terms"
                  className="mb-2 inline-block text-base text-[#adadad] hover:text-indigo-600 hover:underline"
                >
                  Terms & Condition
                </Link>

                <p className="text-base text-[#adadad]">
                  Already have an account?
                  <Link to="/login" className="text-indigo-600 hover:underline">
                    Sign In
                  </Link>
                </p>

                <div>
                  <span className="absolute top-1 right-1">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="1.39737"
                        cy="38.6026"
                        r="1.39737"
                        transform="rotate(-90 1.39737 38.6026)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="1.39737"
                        cy="1.99122"
                        r="1.39737"
                        transform="rotate(-90 1.39737 1.99122)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="13.6943"
                        cy="38.6026"
                        r="1.39737"
                        transform="rotate(-90 13.6943 38.6026)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="13.6943"
                        cy="1.99122"
                        r="1.39737"
                        transform="rotate(-90 13.6943 1.99122)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="25.9911"
                        cy="38.6026"
                        r="1.39737"
                        transform="rotate(-90 25.9911 38.6026)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="25.9911"
                        cy="1.99122"
                        r="1.39737"
                        transform="rotate(-90 25.9911 1.99122)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="38.288"
                        cy="38.6026"
                        r="1.39737"
                        transform="rotate(-90 38.288 38.6026)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="38.288"
                        cy="1.99122"
                        r="1.39737"
                        transform="rotate(-90 38.288 1.99122)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="1.39737"
                        cy="26.3057"
                        r="1.39737"
                        transform="rotate(-90 1.39737 26.3057)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="13.6943"
                        cy="26.3057"
                        r="1.39737"
                        transform="rotate(-90 13.6943 26.3057)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="25.9911"
                        cy="26.3057"
                        r="1.39737"
                        transform="rotate(-90 25.9911 26.3057)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="38.288"
                        cy="26.3057"
                        r="1.39737"
                        transform="rotate(-90 38.288 26.3057)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="1.39737"
                        cy="14.0086"
                        r="1.39737"
                        transform="rotate(-90 1.39737 14.0086)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="13.6943"
                        cy="14.0086"
                        r="1.39737"
                        transform="rotate(-90 13.6943 14.0086)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="25.9911"
                        cy="14.0086"
                        r="1.39737"
                        transform="rotate(-90 25.9911 14.0086)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="38.288"
                        cy="14.0086"
                        r="1.39737"
                        transform="rotate(-90 38.288 14.0086)"
                        fill="#3056D3"
                      />
                    </svg>
                  </span>
                  <span className="absolute left-1 bottom-1">
                    <svg
                      width="29"
                      height="40"
                      viewBox="0 0 29 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="2.288"
                        cy="25.9912"
                        r="1.39737"
                        transform="rotate(-90 2.288 25.9912)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="14.5849"
                        cy="25.9911"
                        r="1.39737"
                        transform="rotate(-90 14.5849 25.9911)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="26.7216"
                        cy="25.9911"
                        r="1.39737"
                        transform="rotate(-90 26.7216 25.9911)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="2.288"
                        cy="13.6944"
                        r="1.39737"
                        transform="rotate(-90 2.288 13.6944)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="14.5849"
                        cy="13.6943"
                        r="1.39737"
                        transform="rotate(-90 14.5849 13.6943)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="26.7216"
                        cy="13.6943"
                        r="1.39737"
                        transform="rotate(-90 26.7216 13.6943)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="2.288"
                        cy="38.0087"
                        r="1.39737"
                        transform="rotate(-90 2.288 38.0087)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="2.288"
                        cy="1.39739"
                        r="1.39737"
                        transform="rotate(-90 2.288 1.39739)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="14.5849"
                        cy="38.0089"
                        r="1.39737"
                        transform="rotate(-90 14.5849 38.0089)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="26.7216"
                        cy="38.0089"
                        r="1.39737"
                        transform="rotate(-90 26.7216 38.0089)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="14.5849"
                        cy="1.39761"
                        r="1.39737"
                        transform="rotate(-90 14.5849 1.39761)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="26.7216"
                        cy="1.39761"
                        r="1.39737"
                        transform="rotate(-90 26.7216 1.39761)"
                        fill="#3056D3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Signup;

