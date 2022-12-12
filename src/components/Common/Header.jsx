import { HOME } from '@utils/paths'
import Link from 'next/link'
import { APP } from '@utils/constants'
import Image from 'next/image'
import ThemeSwitch from './ThemeSwitch'
import usePersistStore from '@app/store/persist'
import { NewVideoMenu, UserMenu } from './Menu'
import { Search } from './Search'


const Header = () => {
  const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
  return (
    <>
      <div className='relative items-center flex justify-start md:justify-between flex-row z-30 left-0 right-0 top-0 flex-shrink-0 h-16 px-4'>
        <Search />
        <div className="flex mr-[2px] flex-row items-center justify-end md:w-56">
          {isLoggedIn ? (
            <>
              <NewVideoMenu />
            </>
          ) : <div className='mr-1'><ThemeSwitch/></div>} 
          <UserMenu/>
        </div>
      </div>
    </>
  )
}

export default Header