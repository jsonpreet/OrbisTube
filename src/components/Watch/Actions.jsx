import { useContext, useState } from 'react'
import { FiFlag } from 'react-icons/fi'
import { RiShareForwardLine } from 'react-icons/ri'
import ShareModal from '@components/Common/Modals/ShareModal'
import { Button } from '@components/UI/Button'
import Reactions from './Reactions'
import { BsPencilSquare, BsThreeDots } from 'react-icons/bs'
import DropMenu from '@components/UI/DropMenu'
import { IoTrashOutline } from 'react-icons/io5'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { GlobalContext } from '@context/app'
import DeleteModal from '@components/Common/Modals/DeleteModal'
import EditModal from '@components/Common/Modals/EditModal'

const Actions = ({ video }) => {
    const router = useRouter()
    const { orbis, isLoggedIn, user } = useContext(GlobalContext)
    const [showShare, setShowShare] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const isVideoOwner = isLoggedIn ? user.did === video.creator_details?.did : false

    return (
        <>
            <ShareModal video={video} show={showShare} setShowShare={setShowShare} />
            <DeleteModal video={video} show={showDeleteModal} setShow={setShowDeleteModal} />
            <EditModal video={video} show={showEditModal} setShow={setShowEditModal} />
            <div className="flex items-center md:justify-end mt-4 space-x-2 md:space-x-4 md:mt-0">
                <Reactions video={video} />
                <Button variant="light" onClick={() => setShowShare(true)}>
                    <span className='flex items-center dark:group-hover:text-white group-hover:text-white outline-none space-x-1.5'>
                        <RiShareForwardLine size={22} />
                        <span className='hidden md:block'>Share</span>
                    </span>
                </Button>
                {isVideoOwner && (
                    <DropMenu
                        trigger={
                            <Button
                                variant="light"
                                className='md:!p-0 md:w-10 max-w-[40px] w-auto h-10' 
                            >
                                <span className="flex items-center space-x-2 md:space-x-3 dark:group-hover:text-white group-hover:text-white">
                                    <BsThreeDots size={22} />
                                </span>
                            </Button>
                        }
                    >
                        <div className="py-2 my-1 rounded-lg dropdown-shadow bg-dropdown outline-none ring-0 focus:outline-none focus:ring-0 w-44">
                            <div className="flex flex-col text-[14px] transition duration-150 ease-in-out rounded-lg">
                                <button 
                                    onClick={() => setShowEditModal(true)}
                                    className='inline-flex items-center px-3 py-2 space-x-3 hover-primary'
                                >
                                    <BsPencilSquare size={18} className="ml-0.5" />
                                    <span className="whitespace-nowrap">Edit Video</span>
                                </button>
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
                )}
            </div>     
        </>
    )
}

export default Actions