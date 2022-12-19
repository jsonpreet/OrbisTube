import DropMenu from '@components/UI/DropMenu'
import { APP_CONTEXT } from '@utils/constants'
import { GlobalContext } from '@context/app'
import React, { useContext, useEffect, useState } from 'react'
import { CgBell } from 'react-icons/cg'
import Notification from './Notification'
import { useRouter } from 'next/router'
import { Loader2 } from '../UI/Loader'

function Notifications() {
    const router = useRouter()
    const { orbis, isLoggedIn, user, isConnected } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [notificationsCount, setNotificationsCount] = useState(0)

    useEffect(() => {
        if (!isLoggedIn) {
            setNotifications([])
            //router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])
    
    useEffect(() => {
        if (orbis && isConnected) {
            getNotifications()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orbis, isConnected])
    
    const getNotifications = async () => {
        setLoading(true)
        try {
            let { data, error } = await orbis.getNotifications({context: APP_CONTEXT, type: 'social'});
            if (error) {
                console.log(error)
            } else {
                console.log(data)
                setNotifications(data)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <>
            <div className="w-full max-w-7xl mx-auto bg-secondary border theme-border rounded-xl">
                <div className="flex flex-col space-y-1 border-b theme-border text-sm">
                    <div className="inline-flex items-center p-6 space-x-2">
                        <h3 className="text-base font-bold uppercase leading-4">
                            Notifications
                        </h3>
                    </div>
                </div>
                <div className="p-6 flex flex-col space-y-3 w-full">
                    {
                        loading ?
                            <div className="flex items-center justify-center w-full">
                                <Loader2/>
                            </div>
                        :
                        notifications.map((notification, index) => {
                            return <Notification key={index} notification={notification} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Notifications