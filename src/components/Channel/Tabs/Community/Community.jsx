import { GROUP_ID } from '@utils/constants'
import { Button } from '@components/UI/Button'
import { GlobalContext } from '@context/app'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/dist/client/router'
import React, { useContext, useEffect, useState } from 'react'
import { useDidToAddress } from '@utils/functions/getDidToAddress'
import { ProfilePicture, getProfilePicture } from '@utils/functions/getProfilePicture'
import { getDisplay, getUsername } from '@utils/functions/getProfileName'
import { toast } from 'react-hot-toast'
import { Loader2 } from '@components/UI/Loader'
import InputMentions from '@components/UI/InputMentions'
import { Post } from './Post'

function Community({channel}) {
    const router = useRouter()
    const supabase = useSupabaseClient()
    const { orbis, isLoggedIn, user, isConnected } = useContext(GlobalContext)
    const { address } = useDidToAddress(user?.did)
    const [communityCreated, setCommunityCreated] = useState(false)
    const [fetched, setFetched] = useState(false)
    const [community, setCommunity] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [description, setDescription] = useState('')
    const [mentions, setMentions] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        checkCommunity()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channel])

    useEffect(() => {
        if (community && community.length > 0) {
            fetchCommunityPosts()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [community])

    const fetchCommunityPosts = async () => {
        console.log(channel.did, 'fetching community posts');
        let { data, error } = await orbis.getPosts({ did: channel.did, context: community[0].channel });
        if (data && data.length > 0) {
            setPosts(data)
            setFetched(true)
        } else {
            console.log(error)
            toast.error('Something went wrong, please try again later.');
        }
    }

    const checkCommunity = async () => {
        console.log(channel.did, 'Checking user community');
        try {
            const { data: community, error } = await supabase.from('communities').select('*').eq('user', channel.did);
            if (community && community.length > 0) {
                console.log(channel.did, 'community fetched', community);
                setCommunityCreated(true)
                setCommunity(community)
                setFetching(false)
            } else {
                setCommunityCreated(false)
                setFetching(false)
            }
        } catch (error) {
            console.log(channel.did, 'community', error);
            toast.error('Something went wrong, please try again later.');
        }
    }

    const createCommunity = async () => {
        setLoading(true)
        let res = await orbis.createChannel(GROUP_ID,  
            {
                group_id: GROUP_ID,
                pfp: getProfilePicture(user.profile, address),
                name: getDisplay(user.profile, address, user?.did),
                description: user.profile?.description,
                type: "feed",
            }
        );
        if (res && res.status === 200) {
            setLoading(false)
            setCommunityCreated(true)
            try {
                const request = {
                    creator: channel.did,
                    channel: res.doc,
                }
                supabase.from('communities').insert([request]).then((res) => {
                    if (res.error) {
                        console.log(channel.did, 'community created', res.error);
                    }
                })
            } catch (error) {
                console.log(channel.did, 'community', error);
            }
        } else {
            setLoading(false);
            setCommunityCreated(false);
            toast.error('Something went wrong, please try again later.');
        }
    }

    const createPost = async () => {
        setLoading(true)
        if (!description) return
        const { data: community, error } = await supabase.from('communities').select('*').eq('user', channel.did);
        if (community && community.length > 0) {
            let res = await orbis.createPost({ body: description, mentions: mentions, context: community[0].channel });
            if (res && res.status === 200) {
                setLoading(false)
                toast.success('Post created successfully');
                setDescription('')
                fetchCommunityPosts()
                setMentions([])
            } else {
                setLoading(false);
                toast.error('Something went wrong, please try again later.');
            }
        }
    }


    return (
        <>
            <div className='max-w-4xl mx-auto md:px-0 px-4'>
                <div className='flex flex-col space-y-6'>
                    <div className="flex flex-col">
                        {fetching ?
                            <div className="flex flex-col items-center justify-center">
                                <Loader2 />
                            </div>
                            : communityCreated ? (
                                <>
                                    {isLoggedIn && user.did === channel.did &&
                                        <div className="flex w-full mb-10 items-start justify-start space-x-4">
                                            <div className="flex space-x-2 items-center">
                                                <ProfilePicture details={user?.details} imgClass="w-10 h-10 rounded-full" />
                                            </div>
                                            <div className='flex-1 space-y-3'>
                                                <InputMentions
                                                    label=""
                                                    placeholder="Tell viewers about you (type @ to mention a channel)"
                                                    autoComplete="off"
                                                    value={description}
                                                    onFocus={() => null}
                                                    onAdd={(id, display) => {
                                                        let mention = { 'did': id, 'username': display }
                                                        setMentions([...mentions, mention])
                                                    }}
                                                    onContentChange={(value) => {
                                                        setDescription(value)
                                                    }}
                                                    mentionsSelector="input-mentions-textarea !h-20 !min-h-0"
                                                />
                                                <Button
                                                    loading={loading}
                                                    onClick={() => createPost()}
                                                >
                                                    Post
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                    {posts && posts.length > 0 ? (
                                        <div className="flex flex-col bg-secondary rounded-lg divide-y divide-gray-100">
                                            {posts.map((post, index) => {
                                                return <Post channel={channel} key={index} refetch={fetchCommunityPosts} post={post} />
                                            })}
                                        </div>   
                                    ): fetched ? (
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-black text-center">No posts yet</p>
                                        </div>
                                    ) : <div className="flex flex-col items-center justify-center">
                                            <Loader2 />
                                        </div>
                                    }
                                </>
                            ) : (
                                <div className="flex flex-col p-8 space-y-4  bg-secondary rounded-lg">
                                    {isLoggedIn && user.did === channel.did ?
                                        <>
                                            <p>We are excited to announce that you can now create a community for your channel under the OrbisTube Group! This community will be publicly available for all to join, and we believe it will be a great way for you to connect with your audience and foster a sense of belonging among your viewers.</p>
                                            <p>To get started, simply go to the OrbisTube Group page and click on the &quot;Create Community&quot; button. From there, you can customize your community by giving it a name, description, and setting the rules for participation. You can also invite your viewers to join the community by sharing a link to it on your channel or social media.</p>
                                            <div>
                                                <Button
                                                    loading={loading}
                                                    onClick={() => createCommunity()}
                                                >
                                                    Create Community
                                                </Button>
                                            </div>
                                        </>
                                        :
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-black text-center">No posts found</p>
                                        </div>
                                    }
                                </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Community


