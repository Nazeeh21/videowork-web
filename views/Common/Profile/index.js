import React from 'react'
import Profile from '../../../components/Profile/Profile'
import loremIpsum from '../../../utility/loremIpsum'

const Image = ({ src }) => (
  <div className='w-full rounded-lg'>
    <img className='w-full' src={src} alt={src} />
  </div>
)

const VidThumbnail = ({ thumbSrc }) => (
  <React.Fragment>
    <img className='rounded-lg w-full' src={thumbSrc} alt={thumbSrc} />
  </React.Fragment>
)

const Index = () => {
  return (
    <div className='w-full bg-white border-2 border-highlight rounded-sm flex flex-col p-6'>
      <Profile
        country='India'
        languages={['English', 'Gujarati', 'Hindi']}
        name='Nazeeh Vahora'
        heading='Best guitar trainer in Asia'
        subHeading={loremIpsum}
        online
      />

      {/* Certifications */}
      <h3 className='text-darkGrey text-xl mt-6 font-semibold'>
        Certifications
      </h3>
      <div className='grid grid-flow-row gap-2 grid-cols-5 w-full mt-3 items-center'>
        <Image src='/certificates/1.png' />
        <Image src='/certificates/2.png' />
        <Image src='/certificates/3.png' />
      </div>

      {/* Demo videos */}
      <h3 className='text-darkGrey text-xl mt-6 font-semibold'>Demo Videos</h3>
      <div className='grid grid-flow-row gap-2 grid-cols-5 w-full mt-3 items-center'>
        <Image src='/certificates/1.png' />
        <Image src='/certificates/2.png' />
        <Image src='/certificates/3.png' />
      </div>
    </div>
  )
};

export default Index;