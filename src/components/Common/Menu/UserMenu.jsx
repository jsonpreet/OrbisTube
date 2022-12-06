import usePersistStore from '@store/persist';
import toast from 'react-hot-toast'
import { useContext, useEffect, useState } from 'react'
import { Button } from '../../UI/Button';
import { useRouter } from 'next/router';
import { GlobalContext } from '@context/app';

function UserMenu() {
    const router = useRouter()
    const { setLoggedIn, isLoggedIn, user, setUser } = usePersistStore()
    const { orbis } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        checkLogin()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function checkLogin() {
        let res = await orbis.isConnected();
        if (res && res.details !== null) {
            setUser(res.details)
            setLoggedIn(true)
			console.log("Connected to Ceramic: ", res.result);
        } else {
            setUser({})
            setLoading(false)
			toast.error("Error connecting to Ceramic.");
        }
    }
    
    async function connect() {
        let res = await orbis.connect();
		if(res.status == 200) {
            setUser(res.did);
            setLoggedIn(true);
			console.log("Connected to Ceramic: ", res);
		} else {
			console.log("Error connecting to Ceramic: ", res);
			toast.error("Error connecting to Ceramic.");
		}
    }
    
    async function logout() {
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