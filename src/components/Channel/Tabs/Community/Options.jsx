import { GlobalContext } from '@context/app'
import DropMenu from '@components/UI/DropMenu'
import { useContext } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoTrashOutline } from 'react-icons/io5'
import clsx from 'clsx'

const Options = ({ post, showOnHover = true, setShowDeleteModal}) => {
    const { isLoggedIn, user } = useContext(GlobalContext)
    return (
        <>
        {isLoggedIn && post.creator === user.did ?
            <DropMenu
                trigger={
                    <div
                        className={clsx(
                            'flex items-center justify-center md:text-inherit outline-none ring-0 group-hover:visible transition duration-150 ease-in-out focus:outline-none focus:ring-0',
                            {
                            'lg:invisible': showOnHover
                            }
                        )}
                        role="button"
                    >
                        <BsThreeDotsVertical size={17} />
                    </div>
                }
            >
                <div className="py-2 my-1 overflow-hidden rounded-lg dropdown-shadow bg-dropdown outline-none ring-0 focus:outline-none focus:ring-0 w-56">
                    <div className="flex flex-col text-[14px] transition duration-150 ease-in-out rounded-lg">
                        
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(true)}
                                className="inline-flex items-center px-3 py-2 space-x-3 text-red-500 opacity-100 hover:bg-red-100 dark:hover:bg-red-900"
                            >
                                <IoTrashOutline size={18} className="ml-0.5" />
                                <span className="whitespace-nowrap">Delete</span>
                            </button>
                    </div>
                </div>
            </DropMenu>
            : null
        }
        </>
    )
}

export default Options