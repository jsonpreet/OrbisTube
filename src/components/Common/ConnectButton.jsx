import { useState } from "react";
import ConnectModal from "./ConnectModal";

function ConnectButton() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <ConnectModal show={showModal} setShowModal={setShowModal}/>
            <button className="btn md purple pointer" onClick={() => setShowModal(true)}>Connect</button>
        </>
    )
}

export default ConnectButton