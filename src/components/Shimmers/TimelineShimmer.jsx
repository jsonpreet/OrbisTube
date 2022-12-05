import React, { useMemo } from 'react'

import VideoCardShimmer from './VideoCardShimmer'

const TimelineShimmer = ({cols = 16}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cards = useMemo(() => Array(cols).fill(1), [])
  return (
    <div className="grid gap-x-5 lg:grid-cols-4 md:gap-y-8 gap-y-2 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
      {cards.map((i, idx) => (
        <VideoCardShimmer key={`${i}_${idx}`} />
      ))}
    </div>
  )
}

export default TimelineShimmer