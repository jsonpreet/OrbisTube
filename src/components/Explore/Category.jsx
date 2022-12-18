import { VideoCard } from '@components/Common/Cards';
import TimelineShimmer from '@components/Shimmers/TimelineShimmer';
import { NoDataFound } from '@components/UI/NoDataFound';

function Category({ posts, loading, isError }) {

    if (loading) {
        return <div><TimelineShimmer cols={28} /></div>
    }

    if (isError) {
        return <NoDataFound 
                isCenter
                withImage
                isHeading={true}
                heading="Something went wrong"
                text="We are unable to fetch the latest videos. Please try again later."
        />
    }

    return (
        <>
        {
            posts && posts.length > 0 ? (
            <>
                <div className="grid gap-x-4 lg:grid-cols-4 md:gap-y-4 gap-y-2 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
                    {posts.map(video => {
                        return (
                            <VideoCard key={`${video.stream_id}`} video={video} />
                        )
                    })}
                </div>
            </>
            )
            : (
                <div>
                    <NoDataFound 
                        isCenter
                        withImage
                        isHeading={true}
                        text="We are unable to fetch the latest videos. Please try again later."
                    />
                </div>
            )
        }
        </>
        
    )
}

export default Category