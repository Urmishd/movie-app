// Header.js
import React, { useContext, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, InputBase } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';

const Header = ({ onSearch }) => { // 1. Receive search function as a prop
  const useAppstate = useContext(Appstate);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // 2. Call the search function passed as a prop with the search query
    onSearch(e.target.value);
  };

  return (
    <div className='sticky z-10 header top-0 text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500'>
      <Link to={'/'}>
        <span>
          Filmy<span className='text-white'>Verse</span>
        </span>
      </Link>

      {/* Search Bar */}
      <div className='flex items-center'>
        <InputBase
          placeholder='Search...'
          value={searchQuery}
          onChange={handleSearch}
          className='bg-white border border-gray-300 rounded px-3 py-1 mr-4'
          inputProps={{ 'aria-label': 'search' }}
        />
        <Button>
          <span className='text-white font-medium capitalize'>Search</span>
        </Button>
      </div>

      {useAppstate.login ? (
        <Link to={'/addmovie'}>
          <h1 className='text-lg cursor-pointer flex items-center'>
            <Button>
              <AddIcon className='mr-1' color='secondary' />{' '}
              <span className='text-white'>Add New</span>
            </Button>
          </h1>
        </Link>
      ) : (
        <Link to={'/login'}>
          <h1 className='text-lg bg-green-500 cursor-pointer flex items-center'>
            <Button>
              <span className='text-white font-medium capitalize'>Login</span>
            </Button>
          </h1>
        </Link>
      )}
    </div>
  );
};

export default Header;
