import { APP } from '@app/utils/constants'
import Modal from '@app/components/UI/Modal'
import toast from 'react-hot-toast'
import { BiCopy } from 'react-icons/bi';

const ReportModal = ({ rootRef, show, setShow, video }) => {

    return (
        <Modal
            title="Report"
            onClose={() => setShow(false)}
            show={show}
            ref={rootRef}
            panelClassName="w-full max-w-lg"
        >
            <div className="w-full px-5 mt-2">
                <div className="items-center justify-between p-3 py-3 border shadow-inner customBorder bg-primary dark:border-gray-800 rounded-xl hidden md:flex">
                    <button
                        className="ml-2 focus:outline-none primary-button py-2 px-4 font-semibold text-sm rounded-full"
                        type="button"
                    >
                        Copy
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ReportModal