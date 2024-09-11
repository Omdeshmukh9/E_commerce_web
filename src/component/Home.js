import React from 'react'
import Layout from '../include/Layout'
import Section from './sections/Section'
import GetProduct from '../Products/DataProduct'
import AddProductForm from '../Products/Productadd'
import './home.css'
// import ShowProduct from '../Products/ShowProduct'
// import SwiperComp from '../Products/SwiperComp'
import MyTeam from '../Myteams/Myteam'
import Catagories from '../Catagories/Catagories'
export default function Home() {
  return (
    <>
    <div className='Data'>
    <Layout>
     <Catagories/>
      <Section/>
      <GetProduct />
      {/* <ShowProduct/> */}
      {/* <SwiperComp /> */}
      <MyTeam/>
      {/* <AddProductForm/> */}
            {/* <h1>This is Home</h1> */}

    </Layout>
    </div>
    </>
  )
}
