import React from 'react'
import type { InfoCardProps } from '../interfaces/infolist'

const InfoCard: React.FC<InfoCardProps> = ({ candidate }) => {
  return (
    <div className='flex flex-col p-[1rem]'>
      <div className='w-[300px] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-auto'>
        <div className='flex flex-col items-center pb-10 pt-[1rem]'>
          <div className='w-[10rem] h-[10rem] mb-3'>
            <img
              className='w-full h-full object-cover rounded-full shadow-lg'
              src={candidate.pictureUrl}
              alt='prayuth'
            />
          </div>
          <h5
            className='mb-1 text-xl font-medium text-gray-900 dark:text-white'
            data-testid='name-field'
          >
            {candidate.name}
          </h5>
          <span
            className='text-xl text-gray-500 dark:text-gray-400'
            data-testid='id-field'
          >
            # {candidate.id}
          </span>
        </div>
      </div>
    </div>
  )
}

export default InfoCard
