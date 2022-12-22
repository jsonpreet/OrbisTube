import ThemeSwitch from './ThemeSwitch'
import { NewVideoMenu, NotificationMenu, UserMenu } from './Menu'
import { Search } from './Search'
import { useContext } from 'react'
import { GlobalContext } from '@context/app'
import Link from 'next/link'
import { HOME } from '@utils/paths';
import { APP } from '@utils/constants';
import Image from 'next/image'
import { isMobile } from 'react-device-detect'


const Header = () => {
  const { isLoggedIn, user } = useContext(GlobalContext)
  return (
    <>
      <div className='relative items-center flex justify-start md:justify-between px-4 md:px-0 flex-row z-30 h-16'>
       {isMobile ? <div className="md:w-56 flex md:flex-none flex-1 md:justify-center py-4">
          <Link
            href={HOME}
            className="flex items-center justify-start pb-1 focus:outline-none"
          >
            <Image src='/logo.png' alt={APP.Name} height={40} width={40} />
            <span className='font-semibold uppercase font-oswald text-gray-700 dark:text-white text-2xl md:text-3xl ml-2'>Tube</span>
          </Link>
        </div> : null 
        }
        <Search />
        <div className="flex mr-[0px] flex-row items-center justify-end md:w-56">
          {isLoggedIn ? (
            <>
              <NotificationMenu />
              <NewVideoMenu user={user} />
            </>
          ) : <div className='mr-1'><ThemeSwitch/></div>} 
          <UserMenu/>
        </div>
      </div>
    </>
  )
}

export default Header