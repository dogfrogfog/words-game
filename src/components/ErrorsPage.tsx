import { Routes } from 'constants/routes';
import { Link } from '@tanstack/react-location';

interface IErrorsPageProps {
  name: string;
  title: string;
  text: string;
}

const ErrorsPage = ({ name, title, text }: IErrorsPageProps) => (
  <div className='w-full min-h-[calc(100vh-122px)] gap-4 bg-white flex flex-col justify-center items-center font-semibold'>
    <h2 className='text-5xl'>{name}</h2>
    <p className='text-2xl '>{title}</p>
    <p className='text-lg uppercase'>{text}</p>
    <Link
      to={Routes.HOME}
      className='w-[150px] h-[50px] flex justify-center items-center rounded-full bg-sky-500 text-white uppercase hover:bg-sky-600 cursor-pointer'
    >
      Home page
    </Link>
  </div>
);

export default ErrorsPage;
