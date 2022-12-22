import { RiVideoAddLine } from 'react-icons/ri'
import DropMenu, { NextLink } from '@components/UI/DropMenu';
import { Button } from '@components/UI/Button';
import { Menu } from '@headlessui/react';
import { BsPencilSquare } from 'react-icons/bs';
import { useDidToAddress } from '@utils/functions/getDidToAddress';
import { getUsername } from '@utils/functions/getProfileName';
import { SlCamrecorder } from "react-icons/sl";
import { HiStatusOnline } from "react-icons/hi";

function NewVideoMenu({user}) {
    const { address } = useDidToAddress(user?.did)
    const username = getUsername(user?.profile, address, user?.did)
    return (
        <>
            <DropMenu
                trigger={
                    <Button
                        variant='none'
                        className="!p-0 text-secondary hover-primary relative flex items-center justify-center w-10 h-10 rounded-full flex-none mr-4"
                    >
                        <RiVideoAddLine size={24} />
                    </Button>
                }
            >
                <div className="py-2 my-1 overflow-hidden rounded-lg dropdown-shadow bg-dropdown outline-none ring-0 focus:outline-none focus:ring-0 divide-y dropdown-shadow max-h-96 bg-dropdown theme-divider border theme-border w-56">
                    <div className="pt-2 text-sm">
                        <Menu.Item
                            as={NextLink}
                            href={`/upload`}
                            className="inline-flex w-full items-center px-3 py-2 space-x-3 hover-primary"
                        >
                            <SlCamrecorder size="20" />
                            <span className="truncate whitespace-nowrap">
                                Upload Video
                            </span>
                        </Menu.Item>
                        <Menu.Item
                            as={NextLink}
                            href={`/${user.profile !== null ? username : user.did}/community`}
                            className="inline-flex w-full items-center px-3 py-2 space-x-3 hover-primary"
                        >
                            <BsPencilSquare size="20" />
                            <span className="truncate whitespace-nowrap">
                                Create Post
                            </span>
                        </Menu.Item>
                    </div>
                </div>
            </DropMenu>
        </>
    )
}

export default NewVideoMenu