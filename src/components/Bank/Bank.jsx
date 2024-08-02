// import React from 'react'
import './bank.css'
import UserHistory from './UserHistory';
import UserInfo from "./UserInfo";
import UserStats from './UserStats';




//getUSerInfo Request(In utils)
export default function Bank() {

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
