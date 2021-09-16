import React from 'react';
import './styles.css';

interface DotCustomPropsType {
  image: string;
  name?: string;
  active?: boolean;
}

function DotCustom({ image, name, active }: DotCustomPropsType) {
  return (
    <div className={`dot ${active && 'dot--active'}`}>
      <div className='dot__image-container'>
        <img src={image} alt='dot-image' />
      </div>

      <div className='dot__name'>{name}</div>
    </div>
  );
}

export default DotCustom;
