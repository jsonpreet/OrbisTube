import { APP_CONTEXT } from '@utils/constants'
import { GlobalContext } from '@context/app'
import { useContext, useEffect, useState } from 'react'
import { CgBell } from 'react-icons/cg'
import { NOTIFICATIONS } from '@app/utils/paths'
import Link from 'next/link'

function NotificationMenu() {
    const { orbis, isConnected } = useContext(GlobalContext)
    const [notificationsCount, setNotificationsCount] = useState(0)
    
    useEffect(() => {
        if (orbis && isConnected) {
            // Get notifications count after few seconds
            setTimeout(() => {
                getNotificationsCount()
            }, 1500)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orbis, isConnected])
    
    const getNotificationsCount = async () => {
        try {
            let { data, error } = await orbis.getNotificationsCount({context: APP_CONTEXT, type: 'social'});
            if (error) {
                console.log(error)
            } else {
                setNotificationsCount(data.count_new_notifications)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Link href={NOTIFICATIONS} className="text-secondary hover-primary relative flex items-center justify-center w-10 h-10 rounded-full flex-none mr-4">
                <CgBell size={24} />
                {notificationsCount > 0 && (
                    <span className="absolute flex w-2 h-2 bg-red-500 rounded-full top-2 right-0.5" />
                )}
            </Link>
        </>
    )
}

export default NotificationMenu