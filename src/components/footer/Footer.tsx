import RSSchool from 'assets/svg/rs_school_js.svg';

const developersClass = `uppercase no-underline text-lg
   transition-colors duration-300 hover:text-slate-500 cursor-pointer`;
const Footer = () => (
  <footer className='flex justify-between gap-[10px] py-3 px-3 bg-blue-400'>
    <div className='flex gap-[10px] items-center'>
      <span className='uppercase text-lg'>
        <span className='border-r-2 border-black pr-1 mr-1'>© 2022 APPName</span>
        Разработчики:
      </span>
      <a href='https://github.com/Slanx' target='blank' className={developersClass}>
        Slanx
      </a>
      <a href='https://github.com/KakurinNikita' target='blank' className={developersClass}>
        KakurinNikita
      </a>
      <a href='https://github.com/thelastandrew' target='blank' className={developersClass}>
        Thelastandrew
      </a>
    </div>
    <a href='http://' target='_blank' className='w-[100px]' rel='noreferrer'>
      <img src={RSSchool} alt='RSSchool-logo' className='object-contain cursor-pointer' />
    </a>
  </footer>
);

export default Footer;
