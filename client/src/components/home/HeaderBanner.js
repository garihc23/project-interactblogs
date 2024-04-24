import React from 'react';
import {Carousel } from 'react-bootstrap';
import '../../assets/css/pages/home/HeaderBanner.css';

import bannerImg from '../../assets/images/header-banner.png';
const HeaderBanner = () => {
  return (
    <div>
      <Carousel className='header-banner-container'>
        <Carousel.Item>
          <img
            className="d-block w-100 header-banner-img"
            src={bannerImg}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 header-banner-img"
            src={bannerImg}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 header-banner-img"
            src={bannerImg}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 header-banner-img"
            src={bannerImg}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 header-banner-img"
            src={bannerImg}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 header-banner-img"
            src={bannerImg}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 header-banner-img"
            src={bannerImg}
            alt="Second slide"
          />
        </Carousel.Item>
        {/* Add more Carousel.Items for additional banners */}
      </Carousel>
    </div>
  );
};

export default HeaderBanner;
