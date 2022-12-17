import { GlobalContext } from '@context/app'
import DropMenu from '@components/UI/DropMenu'
import { useContext } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoTrashOutline } from 'react-icons/io5'
import { FiFlag } from 'react-icons/fi'
import clsx from 'clsx'

const Options = ({ comment, showOnHover = true, setShowDeleteModal, showDeleteModal, setShowReportModal, showReportModal }) => {
    const { isLoggedIn, user } = useContext(GlobalContext)
    return (
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
                    {isLoggedIn && comment.creator === user.did ?
                        <button
                            type="button"
                            onClick={() => setShowDeleteModal(true)}
                            className="inline-flex items-center px-3 py-2 space-x-3 text-red-500 opacity-100 hover:bg-red-100 dark:hover:bg-red-900"
                        >
                            <IoTrashOutline size={18} className="ml-0.5" />
                            <span className="whitespace-nowrap">Delete</span>
                        </button>
                    : null
                    }
                    <button
                        type="button"
                        onClick={() => setShowReportModal(true)}
                        className="inline-flex items-center px-3 py-2 space-x-3 text-red-500 opacity-100 hover:bg-red-100 dark:hover:bg-red-900"
                    >
                        <FiFlag size={18} className="ml-0.5" />
                        <span className="whitespace-nowrap">Report</span>
                    </button>
                </div>
            </div>
        </DropMenu>
    )
}

export default Options