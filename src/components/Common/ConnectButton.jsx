import { useState } from "react";
import { Button } from "../UI/Button";
import ConnectModal from "./ConnectModal";

function ConnectButton() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <ConnectModal show={showModal} setShowModal={setShowModal}/>
            <Button variant='white' onClick={() => setShowModal(true)}>Connect</Button>
        </>
    )
}

export default ConnectButton