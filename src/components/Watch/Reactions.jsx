import { GlobalContext } from "@context/app";
import usePersistStore from "@store/persist";
import { formatNumber} from "@utils/functions";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { FaRegSmile, FaSmile } from "react-icons/fa";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { Button } from "../UI/Button";

function Reactions({video, iconSize = '21', showButton = true}) {
    const [userReaction, setUserReaction] = useState(null)
    const [likes, setLikes] = useState(video.count_likes)
    const [dislikes, setDisLikes] = useState(video.count_downvotes)
    const [reactions, setReactions] = useState(video.count_haha)
    const [liked, setLiked] = useState(userReaction === "like" ? true : false)
    const [disliked, setDisLiked] = useState(userReaction === "downvote" ? true : false)
    const [reacted, setReacted] = useState(userReaction === "haha" ? true : false)
    const [liking, setLiking] = useState(false)
    const [disliking, setDisLiking] = useState(false)
    const [reacting, setReacting] = useState(false)
    const { orbis, following } = useContext(GlobalContext)
    const { isLoggedIn, user } = usePersistStore()

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
            setUserReaction(data[0].type);
        }
    }

    const like = async () => {
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
    // function LoopFollowingReaction({reactions}) {
    //     const ReactionUser = ({reaction}) => {
    //         const { address } = useDidToAddress(reaction.did);

    //         if(reaction.profile?.username) {
    //             return <Link href={"/profile/" + reaction.did}>{reaction.profile.username}</Link>;
    //         } else {
    //             return <Link href={"/profile/" + reaction.did}>{shortAddress(address)}</Link>;
    //         }
    //     }

    //     const ReactionSuffix = ({value, length}) => {
    //         if(value < length - 2) {
    //             return   <span>, </span>
    //         } else if(value < length - 1) {
    //             return   <span> and </span>
    //         } else {
    //             return null;
    //         }
    //     }

    //     const LoopReactions = () => {
    //         return reactions.map((reaction, key) => {
    //             if(key < 3) {
    //                 return(
    //                     <>
    //                         <span className="fw-500"><ReactionUser reaction={reaction} key={key} /></span>
    //                         <ReactionSuffix value={key} length={reactions.length} />
    //                     </>
    //                 )
    //             } else {
    //                 return null;
    //             }
    //         });
    //     }

    //     return(
    //         <>
    //             <LoopReactions />
    //             {reactions.length > 3 &&
    //                 <span className="fw-500">+ {reactions.length - 3} user(s)</span>
    //             }
    //         </>
    //     )
    // }
    
    return (
        <>
            {/* {video.reactions_from_following && video.reactions_from_following.length > 0 &&
                <p className="secondary fs-13 m-0 mbottom-10 reaction-following">Reaction(s) from <LoopFollowingReaction reactions={video.reactions_from_following} />.</p>
            } */}

            <div className='flex space-x-2 md:space-x-4'>
                <Button variant={showButton ? "light" : "none"} onClick={() => like()} size={showButton ? 'md' : 'small'} className={`group ${showButton ? `h-10` : `!p-0`}`}>
                    <span className={clsx('flex items-center dark:group-hover:text-brand2-400 group-hover:text-brand2-500 outline-none', {
                        'text-brand2-500 dark:text-brand2-400 font-semibold': liked
                    },
                        { 'space-x-1.5 md:space-x-3': showButton },
                        { 'mt-1.5': !showButton },
                        { 'space-x-1.5': likes > 0 }
                    )}>
                        <FiThumbsUp size={iconSize}
                            className={clsx({
                                'text-brand2-500 dark:text-brand2-400': liked,
                                'animate-bounce': liking
                            })}
                        />
                        <span
                            className={clsx({
                                'text-brand2-500 dark:text-brand2-400': liked
                            })}
                        >
                            {likes > 0 ? formatNumber(likes) : ''}
                        </span>
                    </span>
                </Button>
                <Button variant={showButton ? "light" : "none"} size={showButton ? 'md' : 'small'} onClick={() => dislike()} className={`group ${showButton ? `h-10` : `!p-0`}`}>
                    <span className={clsx('flex items-center dark:group-hover:text-brand2-400 group-hover:text-brand2-500 outline-none', {
                        'text-brand2-500 dark:text-brand2-400 font-semibold': disliked
                    },
                        { 'space-x-1.5 md:space-x-3':  showButton && disliked },
                        { 'mt-1.5': !showButton },
                        { 'space-x-1.5': dislikes > 0 }
                    )}>
                        <FiThumbsDown size={iconSize}
                            className={clsx({
                                'text-brand2-500 dark:text-brand2-400': disliked,
                                'animate-bounce': disliking
                            })}
                        />

                        <span
                            className={clsx({
                                'text-brand2-500 dark:text-brand2-400': disliked
                            })}
                        >
                            {dislikes > 0 ? formatNumber(dislikes) : ''}
                        </span>
                    </span>
                </Button>
                <Button variant={showButton ? "light" : "none"} size={showButton ? 'md' : 'small'} onClick={() => reaction()} className={`group ${showButton ? `h-10` : `!p-0`}`}>
                    <span className={clsx('flex items-center dark:group-hover:text-brand2-400 group-hover:text-brand2-500 outline-none', {
                        'text-brand2-500 dark:text-brand2-400 font-semibold': reacted
                    },
                        { 'space-x-1.5 md:space-x-3': showButton && reacted },
                        { 'mt-1.5': !showButton },
                        { 'space-x-1.5': reactions > 0 }
                    )}>
                        {reacted ? <FaSmile size={iconSize}
                            className={clsx({
                                'text-brand2-500 dark:text-brand2-400': reacted,
                                'animate-bounce': reacting
                            })}
                        /> :
                            <FaRegSmile size={iconSize}
                                className={clsx({
                                    'text-brand2-500 dark:text-brand2-400': reacted,
                                    'animate-bounce': reacting
                                })}
                            />
                        }

                        <span
                            className={clsx({
                                'text-brand2-500 dark:text-brand2-400': reacted
                            })}
                        >
                            {reactions > 0 ? formatNumber(reactions) : ''}
                        </span>
                    </span>
                </Button>
            </div>
        </>
    )
}

export default Reactions