import { GlobalContext } from "@context/app";
import { formatNumber} from "@utils/functions";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { FaRegSmile, FaSmile } from "react-icons/fa";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { Button } from "@components/UI/Button";
import { toast } from "react-hot-toast";

function Reactions({video, iconSize = '21', showButton = true}) {
    const [likes, setLikes] = useState(video.count_likes)
    const [dislikes, setDisLikes] = useState(video.count_downvotes)
    const [reactions, setReactions] = useState(video.count_haha)
    const [liked, setLiked] = useState(false)
    const [disliked, setDisLiked] = useState(false)
    const [reacted, setReacted] = useState(false)
    const [liking, setLiking] = useState(false)
    const [disliking, setDisLiking] = useState(false)
    const [reacting, setReacting] = useState(false)
    const { orbis, user, isLoggedIn } = useContext(GlobalContext)

    useEffect(() => {
        if(user) {
            getUserReaction();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    /** If user is connected we check if it has reacted to this post */
    const getUserReaction = async() => {
        let { data, error, status } = await orbis.api.from("orbis_reactions").select('type').eq('post_id', video.stream_id).eq('creator', user.did);

        if(error) {
            console.log("Error getting reactions: ", error);
        }
        if (data && data.length > 0) {
            if (data[0].type === 'downvote') {
                setDisLiked(true)
            }
            if (data[0].type === 'like') {
                setLiked(true)
            }
            if (data[0].type === 'haha') {
                setReacted(true)
            }
        }
    }

    const like = async () => {
        if (!isLoggedIn)
            return toast.error('You need to be connected to do this action');
        setLiking(true)
        let res = await orbis.react(video.stream_id, 'like');
        if (res.status === 200) {
            setLikes(likes + 1)
            setDisLikes(dislikes - 1)
            setLiked(true)
            setLiking(false)
        } else {
            console.log(res)
        }
    }

    const dislike = async () => {
        if (!isLoggedIn)
            return toast.error('You need to be connected to do this action');
        setDisLiking(true)
        let res = await orbis.react(video.stream_id, 'downvote');
        if (res.status === 200) {
            setDisLikes(dislikes + 1)
            setLikes(likes - 1)
            setDisLiked(true)
            setDisLiking(false)
        } else {
            console.log(res)
        }
    }

    const reaction = async () => {
        if (!isLoggedIn)
            return toast.error('You need to be connected to do this action');
        setReacting(true)
        let res = await orbis.react(video.stream_id, 'haha');
        if (res.status === 200) {
            setReactions(reactions + 1)
            setReacted(true)
            setReacting(false)
        } else {
            console.log(res)
        }
    }
    
    return (
        <>
            <div className='flex space-x-2 md:space-x-4'>
                <Button variant={showButton ? "light" : "none"} onClick={() => like()} size={showButton ? 'md' : 'small'} className={`group ${showButton ? `h-10` : `!p-0`}`}>
                    <span className={clsx('flex items-center dark:group-hover:text-white group-hover:text-white outline-none', {
                        'text-brand2-500 dark:text-brand2-400 font-semibold': liked
                    },
                        { 'space-x-1.5': showButton },
                        { 'mt-1.5': !showButton },
                        { 'space-x-1.5 md:space-x-3': likes > 0 }
                    )}>
                        <FiThumbsUp size={iconSize}
                            className={clsx({
                                'animate-bounce': liking
                            })}
                        />
                        <span>
                            {likes > 0 ? formatNumber(likes) : ''}
                        </span>
                    </span>
                </Button>
                <Button variant={showButton ? "light" : "none"} size={showButton ? 'md' : 'small'} onClick={() => dislike()} className={`group ${showButton ? `h-10` : `!p-0`}`}>
                    <span className={clsx('flex items-center dark:group-hover:text-white group-hover:text-white outline-none', {
                        'text-brand2-500 dark:text-brand2-400 font-semibold': disliked
                    },
                        { 'space-x-1.5':  showButton && disliked },
                        { 'mt-1.5': !showButton },
                        { 'space-x-1.5 md:space-x-3': dislikes > 0 }
                    )}>
                        <FiThumbsDown size={iconSize}
                            className={clsx({
                                'animate-bounce': disliking
                            })}
                        />

                        <span>
                            {dislikes > 0 ? formatNumber(dislikes) : ''}
                        </span>
                    </span>
                </Button>
                <Button variant={showButton ? "light" : "none"} size={showButton ? 'md' : 'small'} onClick={() => reaction()} className={`group ${showButton ? `h-10` : `!p-0`}`}>
                    <span className={clsx('flex items-center dark:group-hover:text-white group-hover:text-white outline-none', {
                        'text-brand2-500 dark:text-brand2-400 font-semibold': reacted
                    },
                        { 'space-x-1.5': showButton && reacted },
                        { 'mt-1.5': !showButton },
                        { 'space-x-1.5 md:space-x-3': reactions > 0 }
                    )}>
                        {reacted ? <FaSmile size={iconSize}
                            className={clsx({
                                'animate-bounce': reacting
                            })}
                        /> :
                            <FaRegSmile size={iconSize}
                                className={clsx({
                                    'animate-bounce': reacting
                                })}
                            />
                        }

                        <span>
                            {reactions > 0 ? formatNumber(reactions) : ''}
                        </span>
                    </span>
                </Button>
            </div>
        </>
    )
}

export default Reactions