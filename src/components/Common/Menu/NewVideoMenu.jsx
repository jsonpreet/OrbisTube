import { useRouter } from 'next/router'
import { RiVideoAddLine } from 'react-icons/ri'
import usePersistStore from '@app/store/persist';
import Link from 'next/link';

function NewVideoMenu() {
    return (
        <>
            <Link
                href={`/upload`}
                className="text-secondary md:light-button-secondary light-button-secondary-hover flex items-center border-0 md:border theme-border mr-0 md:mr-3 px-2 md:px-3 md:py-1.5 py-2 justify-center space-x-2 rounded-full flex-none">
                <RiVideoAddLine className='md:h-5 md:w-5 w-6 h-6 md:text-brand2-700' /> <span className='hidden md:inline-flex'>Create</span>
            </Link>
        </>
    )
}

export default NewVideoMenu