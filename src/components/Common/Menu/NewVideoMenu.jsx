import { RiVideoAddLine } from 'react-icons/ri'
import Link from 'next/link';

function NewVideoMenu() {
    return (
        <>
            <Link
                href={`/upload`}
                className="group hover:text-white drop-shadow-[0_0px_10px_rgba(0,0,0,0.15)] text-secondary bg-secondary hover:bg-brand-700 flex items-center mr-0 md:mr-4 px-2 md:px-5 md:py-2 py-2 justify-center space-x-2 rounded-full flex-none">
                <RiVideoAddLine className='md:h-5 md:w-5 w-6 h-6 group-hover:text-white md:text-brand2-700' />
                <span className='hidden font-medium text-sm md:inline-flex'>Create</span>
            </Link>
        </>
    )
}

export default NewVideoMenu