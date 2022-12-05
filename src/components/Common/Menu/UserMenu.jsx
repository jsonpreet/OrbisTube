import usePersistStore from '@store/persist';
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { Button } from '../../UI/Button';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import DropMenu, { NextLink } from '../../UI/DropMenu';
import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineCog } from 'react-icons/hi';
import { MdExitToApp } from 'react-icons/md';
import { SETTINGS } from '@utils/paths';
import IsVerified from '../IsVerified';
import ThemeSwitch from '../ThemeSwitch';
import { useRouter } from 'next/router';
import { Orbis } from "@orbisclub/orbis-sdk";



// let wallet_connect_provider = new WalletConnectProvider({
//     infuraId: "a40e604c19777d3c49eb8f2e7171cb7e",
// });
function UserMenu() {
    const router = useRouter()
    const { setLoggedIn, isLoggedIn, user, setUser } = usePersistStore()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        checkLogin()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function checkLogin() {
        const orbis = new Orbis();
        let res = await orbis.isConnected();
        if (res && res.details !== null) {
            setUser(res.details)
            setLoggedIn(true)
        } else {
            setUser({})
            setLoading(false)
        }
    }
    
    async function connect() {
        const orbis = new Orbis();
        let res = await orbis.connect();
		if(res.status == 200) {
            setUser(res.did);
            setLoggedIn(true);
		} else {
			console.log("Error connecting to Ceramic: ", res);
			toast.error("Error connecting to Ceramic.");
		}
    }
    
    async function logout() {
        const orbis = new Orbis();
        let res = await orbis.logout();
        if (res.result === 'Logged out from Orbis and Ceramic.') {
            console.log(res)
            setLoggedIn(false)
            setUser({})
        }
    }

    return (
        <>
            {isLoggedIn ? (
                <>
                    <Button onClick = { () => logout() } loading = { loading }>
                        Logout
                    </Button>
                </>
                // <DropMenu
                //     trigger={
                //         <Button
                //         className="!p-0 ml-1.5 flex-none"
                //         >
                //         <img
                //             src={getProfilePicture(user.profile)}
                //             alt={getProfileName(user.profile)}
                //             className='object-cover rounded-full bg-dropdown w-8 h-8 md:w-9 md:h-9'
                //         />
                //         </Button>
                //     }
                //     >
                //     <div className="py-2 my-1 overflow-hidden rounded-lg dropdown-shadow bg-dropdown outline-none ring-0 focus:outline-none focus:ring-0 divide-y dropdown-shadow max-h-96 bg-dropdown theme-divider border theme-border w-56">
                //         <>
                //             <div className="flex flex-col space-y-1 text-sm transition duration-150 ease-in-out rounded-lg">
                //                 <div className="inline-flex items-center p-2 py-3 space-x-2 rounded-lg">
                //                     <img
                //                         src={getProfilePicture(user.profile)}
                //                         alt={getProfileName(user.profile)}
                //                         className='object-cover bg-dropdown rounded-full w-9 md:h-9'
                //                     />
                //                     <div className='flex items-center space-x-1'>
                //                         <h3
                //                             title={getProfileName(user.profile)}
                //                             className="text-base truncate leading-4"
                //                         >
                //                             {getProfileName(user.profile)}
                //                         </h3>
                //                         {user.profile.IsVerified ? <IsVerified size="xs" /> : null}
                //                     </div>
                //                 </div>
                //             </div>
                //             <div className="pt-2 text-sm">
                //                 <Menu.Item
                //                     as={NextLink}
                //                     href={`/@${user.profile.Username}`}
                //                     className="inline-flex w-full items-center px-3 py-2 space-x-3 hover-primary"
                //                 >
                //                     <FaRegUserCircle size="20" />
                //                     <span className="truncate whitespace-nowrap">
                //                     Your Channel
                //                     </span>
                //                 </Menu.Item>
                                
                //                 <Link
                //                     href={`/@${user.profile.Username}/${SETTINGS}`}
                //                     className="inline-flex w-full items-center px-3 py-2 space-x-3 hover-primary"
                //                 >
                //                     <HiOutlineCog size="20" />
                //                     <span className="truncate whitespace-nowrap">
                //                     Channel Settings
                //                     </span>
                //                 </Link>
                //                 <ThemeSwitch isMenu={true} />
                //                 <button
                //                     type="button"
                //                     className="inline-flex w-full items-center px-3 py-2 space-x-3 hover-primary"
                //                     onClick={() => logout()}
                //                 >
                //                     <MdExitToApp size="20" />
                //                     <span className="truncate whitespace-nowrap">Sign Out</span>
                //                 </button>
                //             </div>
                //         </>
                //     </div>
                // </DropMenu>
            ): (
                <Button onClick = { () => connect() } loading = { loading }>
                        Sign In{' '}
                        <span className="hidden md:inline-block">with DeSo</span>
                </Button>
            )
        }
        </>
    )
}

export default UserMenu