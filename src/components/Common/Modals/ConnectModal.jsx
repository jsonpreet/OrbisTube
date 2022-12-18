import { sleep } from '@utils/functions'
import Modal from '@components/UI/Modal'
import { GlobalContext } from '@context/app'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@app/components/UI/Button'
import clsx from 'clsx'

const ConnectModal = ({ rootRef, show, setShowModal }) => {
    const { orbis, setLoggedIn, setUser } = useContext(GlobalContext)
    const [status, setStatus] = useState(0);
    const [statusM, setStatusM] = useState(0);

    /** Call the Orbis SDK to connect to Ceramic */
    async function connect() {
        /** Show loading state */
        setStatusM(1);

        let res = await orbis.connect();

        /** Parse result and update status */
        switch (res.status) {
            case 200:
                setStatusM(2);
                /** Save user details returned by the connect function in state */
                console.log("Connected to Ceramic: ", res);
                toast.success("Connected to Ceramic.");
                const profile = await getUserDetails(res.did);
                setUser(profile.result);
                setLoggedIn(true);
                setShowModal(false);
                break;
            default:
                console.log("Couldn't connect to Ceramic: ", res.error.message);
			    toast.error("Error connecting to Ceramic.");
                setStatusM(3);
                /** Wait for 2 seconds before resetting the button */
                await sleep(2000);
                setStatusM(0);
        }
    }

    async function connect2() {
        let res = await orbis.connect_v2({
            provider: window.phantom?.solana,
            chain: "solana",
            lit: true
        });

        /** Parse result and update status */
        switch (res.status) {
            case 200:
                setStatus(2);
                /** Save user details returned by the connect function in state */
                console.log("Connected to Ceramic: ", res);
			    toast.success("Connected to Ceramic.");
                const profile = await getUserDetails(res.did);
                setUser(profile.result);
                setLoggedIn(true);
                setShowModal(false);
                break;
            default:
                console.log("Couldn't connect to Ceramic: ", res.error.message);
			    toast.error("Error connecting to Ceramic.");
                setStatus(3);
                /** Wait for 2 seconds before resetting the button */
                await sleep(2000);
                setStatus(0);
        }
    }

     /** Load user details from indexer */
    async function getUserDetails(did) {
        let { data, error, status } = await orbis.getProfile(did);

        /** Returns error if any */
        if(error) {
            return {
                status: 300,
                result: "Error retrieving user details.",
                error: error
            }
        }

        /** Returns user details */
        return {
            status: 200,
            result: data
        }
    }
    // switch (status) {
    //     case 0:
    //     return <button className="btn md purple pointer" onClick={() => setShowModal(true)}>Connect</button>;
    //     case 1:
    //     return <button className="btn md  transparent-dashed">Loading...</button>;
    //     case 2:
    //     return <button className="btn md  green">Success</button>;
    //     case 3:
    //     return <button className="btn md  red">Error</button>

    // }

    return (
        <Modal
            title="Connect to Orbis"
            onClose={() => setShowModal(false)}
            show={show}
            ref={rootRef}
            panelClassName="w-full max-w-md"
        >
            <div className="w-full px-3 mt-2 flex md:max-w-xs justify-center mx-auto flex-col space-y-3">
                <Button
                    loading={statusM === 1}
                    variant='cbtn'
                    onClick={() => connect()}
                    className={clsx('text-white px-4 py-2 rounded-lg', {
                        'bg-green-500 hover:bg-green-600': statusM === 2,
                        'bg-[#fa812a] hover:bg-[#e7701a]': statusM === 0 || statusM === 1,
                        'bg-red-500 hover:bg-red-600': statusM === 3,
                    })}
                >
                    {statusM === 2 ? `Login Success` : statusM === 3 ? `Login Error` : `Metamask`}
                </Button>
                <Button
                    loading={status === 1}
                    variant='cbtn'
                    onClick={() => connect2()}
                    className={clsx('text-white px-4 py-2 rounded-lg', {
                        'bg-green-500 hover:bg-green-600': status === 2,
                        'bg-[#7967ff] hover:bg-[#6553e9]': status === 0 || status === 1,
                        'bg-red-500 hover:bg-red-600': status === 3,
                    })}
                >
                    {status === 2 ? `Login Success` : status === 3 ? `Login Error` : `Phantom`}
                </Button>
            </div>
        </Modal>
    )
}

export default ConnectModal