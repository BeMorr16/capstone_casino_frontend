// import React from 'react'
import './cashier.css'
import UserHistory from './UserHistory';
import UserInfo from "./UserInfo";
import UserStats from './UserStats';




//getUSerInfo Request(In utils)
export default function Cashier() {

  return (
    <>
      <div className='BankContainer'>
        <div className='bank-top-section'>
          
        <UserInfo />
        <UserStats/>
</div>
        <UserHistory />
        
      </div>
    </>
  )
}
