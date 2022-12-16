import { useContext } from 'react'
import { Button } from '../../UI/Button';
import { GlobalContext } from '@context/app';
import ConnectButton from '../ConnectButton';
import DropMenu, { NextLink } from '@components/UI/DropMenu';
import { ProfilePicture } from '@utils/functions/getProfilePicture'
import { Menu } from '@headlessui/react';
import { FaRegUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { HiOutlineCog } from 'react-icons/hi2';
import ThemeSwitch from '../ThemeSwitch';
import { MdExitToApp } from 'react-icons/md';
import { getUsername } from '@utils/functions/getProfileName'
import { SETTINGS } from '@utils/paths';

function UserMenu() {
    const { orbis, setLoggedIn, isLoggedIn, user, setUser } = useContext(GlobalContext)
    async function logout() {
        setLoading(true)
        let res = await orbis.logout();
        if (res.result === 'Logged out from Orbis and Ceramic.') {
            setLoggedIn(false)
            setUser({})
        }
    }

    return (
        <>
            {isLoggedIn && user ? (
                <DropMenu
                    trigger={
                        <Button
                            variant='none'
                            className="!p-0 ml-1.5 flex-none"
                        >
                            <ProfilePicture details={user} imgClass='object-cover rounded-full bg-dropdown w-8 h-8 md:w-9 md:h-9'/>
                        </Button>
                    }
                    >
                    <div className="py-2 my-1 overflow-hidden rounded-lg dropdown-shadow bg-dropdown outline-none ring-0 focus:outline-none focus:ring-0 divide-y dropdown-shadow max-h-96 bg-dropdown theme-divider border theme-border w-56">
                        <>
                            <div className="pt-2 text-sm">
                                <Menu.Item
                                    as={NextLink}
                                    href={`/${getUsername(user, user.did)}`}
                                    className="inline-flex w-full items-center px-3 py-2 space-x-3 hover-primary"
                                >
                                    <FaRegUserCircle size="20" />
                                    <span className="truncate whitespace-nowrap">
                                    Your Channel
                                    </span>
                                </Menu.Item>
                                
                                <Link
                                    href={`/${getUsername(user, user.did)}/${SETTINGS}`}
                                    className="inline-flex w-full items-center px-3 py-2 space-x-3 hover-primary"
                                >
                                    <HiOutlineCog size="20" />
                                    <span className="truncate whitespace-nowrap">
                                    Channel Settings
                                    </span>
                                </Link>
                                <ThemeSwitch isMenu={true} />
                                <button
                                    type="button"
                                    className="inline-flex w-full items-center px-3 py-2 space-x-3 hover-primary"
                                    onClick={() => logout()}
                                >
                                    <MdExitToApp size="20" />
                                    <span className="truncate whitespace-nowrap">Sign Out</span>
                                </button>
                            </div>
                        </>
                    </div>
                </DropMenu>
                ) : (
                    <ConnectButton/>
                )
            }
        </>
    )
}

export default UserMenu