import React from 'react';
import { AdAssets } from './AdAssets';
//import { toUpperCase, adType } from 'helpers';
import { toUpperCase } from 'helpers';

export function AdDetailInfo(props) {
  const ad = props.ad;

  return (
      <div className='ad'>
        <h2 className={`ad-type ${ad.category}`}> {ad.category}</h2>
        <div className="ad-owner">
        <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="owner"/>
          <span>{ad.user && ad.user.username}</span>
          
          
          
        </div>
        <h1 className='ad-title'>{ad.title}</h1>
        <h2 className='ad-city'>{toUpperCase(ad.city)}</h2>
      
        
        <div className='ad-room-info'>
        <p className='card-text'>PHP {ad.price} </p>
          <span><i className='fa fa-building'></i>{ad.bedrooms} bedrooms</span>
          <span><i className='fa fa-user'></i> {ad.bedrooms + 4} guests</span>
          <span><i className='fa fa-bed'></i> {ad.bedrooms + 2} beds</span>
        </div> 
        <p className='ad-description'>
          {ad.description}
        </p>
        <hr></hr>
        <AdAssets />
      
      </div>
    )
}

/*
  
  <h2 className={`ad-type ${ad.category}`}>{adType(ad.shared)} {ad.category}</h2>
 
 */