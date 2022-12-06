import usePersistStore from '@app/store/persist'
import { DESO_CONFIG } from '@app/utils/constants'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Button } from './Button'

export const NoDataFound = ({imageSize = 'md:w-20 w-10', image = `/videso.png`, text = 'No data found', heading = 'No data found', withImage = false, isCenter = false, isHeading = false, button, isLoginButton = false, isButton = false }) => {
  
  const { setLoggedIn, isLoggedIn, user, setUser } = usePersistStore()
  const [loading, setLoading] = useState(false)

  return (
    <div
      className={clsx('flex flex-col p-1', {
        'items-center justify-center': isCenter
      })}
    >
      {withImage && (
        <img
          src={image}
          className={`mt-20 mb-6 ${imageSize}`}
          alt="Videso Logo"
          draggable={false}
        />
      )}
      {isHeading && (
        <div
          className={clsx('text-2xl mb-4 font-medium', {
            'text-center': isCenter
          })}
        >
          {heading}
        </div>
      )}
      <div
        className={clsx('text-sm mb-2 font-normal', {
          'text-center': isCenter
        })}
      >
        {text}
      </div>
      {isButton && <div className='my-4'>{button}</div>}
    </div>
  )
}