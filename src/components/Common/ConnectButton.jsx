import { useState } from "react";
import { Button } from "../UI/Button";
import ConnectModal from "@components/Common/Modals/ConnectModal";

function ConnectButton() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <ConnectModal show={showModal} setShowModal={setShowModal}/>
            <Button variant='primary' className="drop-shadow-[0_0px_10px_rgba(0,0,0,0.15)]" onClick={() => setShowModal(true)}>Connect</Button>
        </>
    )
}

export default ConnectButton