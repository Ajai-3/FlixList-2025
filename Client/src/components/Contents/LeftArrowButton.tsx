import React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const LeftArrowButton: React.FC = () => {
  return (
    <>
      <button className='p-1 bg-gray-500/40 rounded-md'>
        <KeyboardArrowLeftIcon  sx={{ fontSize: 34 }}  />
      </button>
    </>
  );
};

export default LeftArrowButton;
