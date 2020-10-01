import React from 'react'
import { ChatWindowContact } from '../../../components/Chat/ChatWindowContact'

const ChatWindowData = [
  {
    src: 'nazeeh_profile.jpg',
    name: 'Arun',
    active: 'false',
    time: '5',
    text: 'See you soon',
  },
  {
    src: 'nazeeh_profile.jpg',
    name: 'Deepak Kumar',
    active: 'false',
    time: '5',
    text: 'See you soon',
    current: 'false',
  },
  {
    src: 'nazeeh_profile.jpg',
    name: 'John Doe',
    active: 'false',
    time: '5',
    text: 'See you soon',
  },
  {
    src: 'nazeeh_profile.jpg',
    name: 'Nisha Sharma',
    active: 'false',
    time: '5',
    text: 'See you soon',
  },
  {
    src: 'nazeeh_profile.jpg',
    name: 'Nisha Sharma',
    active: 'false',
    time: '5',
    text: 'See you soon',
  },
]

const Index = () => (
  <div style={{backgroundColor: '#E8ECFF'}} className='rounded-lg w-full mt-8'>
    <div className='mt-1 pt-2 pb-1 grid grid-rows-1 grid-cols-2'>
      <p className='text-xl font-medium pt-1 pb-2 pl-4'>Messages</p>
      <div className=''>
        <select className='mt-1 pb-1 pt-1 pl-2 pr-4 rounded-lg w-full mr-6'>
          <option value='all'>All</option>
        </select>
      </div>
    </div>
    {ChatWindowData.map((data) => (
      <div className='bg-white'>
        <ChatWindowContact
          src={data.src}
          name={data.name}
          text={data.text}
          active={data.active}
          time={data.time}
          current={data.current}
        />
      </div>
    ))}
    <div
      style={{ color: '#4968FF' }}
      className='bg-white text-center py-3 text-sm font-md rounded-b-lg'
    >
      View all messages
    </div>
  </div>
)

export default Index