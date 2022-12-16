import ThemeSwitch from './ThemeSwitch'
import { NewVideoMenu, UserMenu } from './Menu'
import { Search } from './Search'
import { useContext } from 'react'
import { GlobalContext } from '@context/app'


const Header = () => {
  const { isLoggedIn } = useContext(GlobalContext)
  return (
    <>
      <div className='relative items-center flex justify-start md:justify-between flex-row z-30 h-16'>
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