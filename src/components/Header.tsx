import { actions } from 'actions/actions';
import { Context } from 'context/context';
import { useContext } from 'react';

interface IMenuButtonProps {
  menuState: boolean;
  toggleMenu: () => void;
}

interface IHeaderProps {
  menuState: boolean;
  toggleMenu: () => void;
  handleOpen: () => void;
}

const MenuButton = ({ menuState, toggleMenu }: IMenuButtonProps) => {
  const first = menuState ? ' -rotate-45 translate-y-[11px]' : '';
  const second = menuState ? ' opacity-0' : '';
  const third = menuState ? ' rotate-45 -translate-y-[11px]' : '';

  return (
    <div className='flex md:hidden'>
      <button
        type='button'
        className='space-y-2 group cursor-pointer relative'
        onClick={toggleMenu}
      >
        <div
          className={`w-8 h-[0.20rem] bg-gray-700 group-hover:bg-orange-500/95 duration-300 transition-all${first}`}
        />
        <div
          className={`w-8 h-[0.20rem] bg-gray-700 group-hover:bg-orange-500/95 duration-300 transition-all${second}`}
        />
        <div
          className={`w-8 h-[0.20rem] bg-gray-700 group-hover:bg-orange-500/95 duration-300 transition-all${third}`}
        />
      </button>
    </div>
  );
};

const Header = ({ menuState, toggleMenu, handleOpen }: IHeaderProps) => {
  const { state, dispatch } = useContext(Context);

  const logautUser = () => {
    dispatch(actions.logautUser());
    localStorage.removeItem('user');
  };

  return (
    <div className='flex gap-[40px] items-center justify-between w-full py-4 px-8 fixed top-0 left-0 z-20 bg-blue-400'>
      <MenuButton menuState={menuState} toggleMenu={toggleMenu} />
      <div className='mx-auto'>
        <h1 className='text-3xl'>RSLang</h1>
      </div>
      {state.user ? (
        <button
          type='button'
          className='text-xl bg-orange-400/90 rounded-full px-3 py-1 transition-colors hover:bg-orange-500'
          onClick={() => logautUser()}
        >
          Logaut
        </button>
      ) : (
        <button
          type='button'
          className='text-xl bg-orange-400/90 rounded-full px-3 py-1 transition-colors hover:bg-orange-500'
          onClick={handleOpen}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Header;
