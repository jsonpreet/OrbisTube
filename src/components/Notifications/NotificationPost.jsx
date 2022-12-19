import { useDidToAddress } from "@utils/functions/getDidToAddress";
import { getDisplay, getUsername } from "@utils/functions/getProfileName";
import { ProfileBadges, ProfilePicture } from "@utils/functions/getProfilePicture";
import Link from "next/link";

function NotificationPost({ post }) {
    const user = post.creator_details;
    const profile = user.profile !== null ? user.profile : null;
    const profileData = profile && profile.data !== null ? profile.data : null;
    const avatar = profileData ? profileData.Avatar ? profileData.Avatar : profile.pfp : null;
    const { address } = useDidToAddress(user?.did)
    const username = getUsername(user.profile, address, user.did)
    const displayName = getDisplay(user.profile, address, user.did)
    return (
        <>
            <div className="flex items-cemter space-x-2 p-2 mt-2 border theme-border rounded-lg">
                <Link href={`/${profile !== null ? username : user.did}`}>
                    {profileData ?
                        <img className="w-8 h-8 rounded-full" src={avatar} alt="pfp" />
                        :
                        <ProfilePicture details={user} imgClass='w-8 h-8 rounded-full' />
                    }
                </Link>
                <div className="flex-shrink-0">
                    <div className="flex-1 flex min-w-0">
                        <Link href={`/${profile !== null ? username : user.did}`}
                            className="text-sm font-medium text-secondary flex space-x-1 items-center">
                            <span>{displayName}</span>
                            <ProfileBadges details={user} />
                        </Link>
                    </div>
                    <div className="text-sm text-secondary space-x-1 flex">
                        <span className="text-sm flex space-x-1 items-center text-secondary">
                            {post.content.body}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotificationPost