import Link from "next/link"

function Tags({video}) {
    return (
        <>
            {video.tags.length > 0 ?
                <>
                    <span className="middot"></span>
                    {video.tags.map(tag => {
                        return (
                            <span key={tag.slug} className="">
                                <Link href={`/explore/${tag.slug}`}>
                                    {tag.title}
                                </Link>
                            </span>
                        )
                    })}
                </>
            : null}
        </>
    )
}

export default Tags