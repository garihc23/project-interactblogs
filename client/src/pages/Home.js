import React from 'react'
import NavigationBar from '../components/NavigationBar.js';
import HeaderBanner from '../components/home/HeaderBanner.js';
import Features from '../components/home/Features.js';
import Community from '../components/home/Community.js';
import Insights from '../components/home/Insights.js';
import SupportSection from '../components/home/SupportSection.js';
import Footer from '../components/Footer.js';

const Home =() =>{
  return (
    <div>
        <NavigationBar></NavigationBar>
        <HeaderBanner></HeaderBanner>
        <Features></Features>
        <Community></Community>
        <Insights></Insights>
        <SupportSection></SupportSection>
        <Footer></Footer>
    </div>
  )
}

export default Home;