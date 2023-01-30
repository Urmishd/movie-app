import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <div className='sticky z-10 header text-3xl flex justify-between item-center text-red-500 font-bold p-3 border-b-2 border-gray-500'>
        <Link to={'/'}><span>Filmy<span className='text-white'>verse</span></span></Link>
        <Link to={'/addmovie'}>
          <h1 className='text-lg flex items-center cursor-pointer'>
            <Button><AddIcon className='mr-1' color='secondary' /><span className='text-white'>Add New</span></Button>
          </h1>
        </Link>
      </div>
    </div>
  )
}XZA  

export default Header