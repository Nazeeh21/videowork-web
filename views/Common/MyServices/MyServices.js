import React from 'react'
import Pills from '../../../components/Misc/3Pills/3Pills'
import CompactServiceCard from '../../Chat/CompactServiceCard/CompactServiceCard'
import Notifications from '../../../components/Notifications'
import { useRouter } from 'next/router'

const MyServices = () => {
  const router = useRouter()

  const handleRedirect = () => router.push('/view-service')

  return (
    <div>
      <div className='grid grid-cols-2 grid-rows-1'>
        <p className='text-2xl font-medium'>Active Services</p>
        <button className='w-5 justify-self-end'>
          <img src='search.png' alt='search-img' />
        </button>
      </div>
      <Pills
        width='5/12'
        color='white'
        label1='All'
        label2='Live video'
        label3='Rich media'
      />
      <CompactServiceCard
        buttonClickHandler={handleRedirect}
        butttonText='View'
        media={{ text: 'Rich Media', color: 'green' }}
      />
      <CompactServiceCard
        buttonClickHandler={handleRedirect}
        butttonText='View'
        media={{ text: 'Rich Media', color: 'green' }}
      />
    </div>
  )
}

export default MyServices