import { sleep } from '@utils/functions'
import Modal from '@components/UI/Modal'
import { GlobalContext } from '@context/app'
import usePersistStore from '@store/persist'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'

const ConnectModal = ({ rootRef, show, setShowModal }) => {
    const { orbis, isLoggedIn, setLoggedIn, user, setUser } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(0);

    /** Returns a valid provider to use to connect the user's wallet */
    async function getProvider() {
        let provider = null;
        if(window.ethereum) {
            provider = window.ethereum;

            /** Return provider to use */
            return provider;
        } else {
            /** Create WalletConnect Provider */
            provider = new WalletConnectProvider({
                infuraId: "9bf71860bc6c4560904d84cd241ab0a0",
            });

            /** Enable session (triggers QR Code modal) */
            await provider.enable();

            /** Return provider to use */
            return provider;
        }
    }

    /** Call the Orbis SDK to connect to Ceramic */
    async function connect() {
        /** Show loading state */
        setStatus(1);

        let res = await orbis.connect();

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
            panelClassName="w-full max-w-lg"
        >
            <div className="w-full mt-2 flex md:max-w-xs justify-center mx-auto flex-col space-y-3">
                <button
                    onClick={() => connect()}
                    className='bg-[#f57b24] text-white px-4 py-2 rounded-lg'
                >
                    Metamask
                </button>
                <button
                    onClick={() => connect2()}
                    className='bg-[#6b59ec] text-white px-4 py-2 rounded-lg'
                >
                    Phantom
                </button>
            </div>
        </Modal>
    )
}

export default ConnectModal