import React from 'react'

export function LivePeer ({className}) {
    return (
        <>
            <svg className={className} viewBox="0 0 64 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="52" y="40" className={className} transform="rotate(-90 52 40)" fill="black"></rect>
                <rect x="26" y="26" className={className} transform="rotate(-90 26 26)" fill="black"></rect>
                <rect x="26" y="54" className={className} transform="rotate(-90 26 54)" fill="black"></rect>
                <rect y="68" className={className} transform="rotate(-90 0 68)" fill="black"></rect>
                <rect y="40" className={className} transform="rotate(-90 0 40)" fill="black"></rect>
                <rect y="12" className={className} transform="rotate(-90 0 12)" fill="black"></rect>
            </svg>
        </>
    )
}