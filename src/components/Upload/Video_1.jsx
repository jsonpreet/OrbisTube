import usePersistStore from '@app/store/persist';
import MetaTags from '@components/Common/MetaTags'
import { Player, useCreateAsset } from '@livepeer/react';
import { useMemo, useState } from 'react';
import ProgressBar from '../UI/ProgressBar';
// import RecentVideos from './RecentVideos';
import { usePlaybackInfo } from '@livepeer/react';

function UploadVideo() {
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const [video, setVideo] = useState(undefined);

    const noWait = () => {
        
    }

    const { mutate: createAsset, data: assets, status, progress, error } = useCreateAsset(
        // we use a `const` assertion here to provide better Typescript types
        // for the returned data
        video
        ? { sources: [{ name: video.name, file: video }], noWait }
        : null,
    
    );


    const progressFormatted = useMemo(
    () =>
        progress?.[0].phase === 'failed'
            ? 'Failed to process video.'
            : progress?.[0].phase === 'waiting'
            ? 'Waiting'
            : progress?.[0].phase === 'uploading'
            ? Math.round(progress?.[0]?.progress * 100)
            : progress?.[0].phase === 'processing'
            ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
            : null,
        [progress],
    );
    const isLoading = useMemo(
        () =>
        status === 'loading' ||
        (assets?.[0] && assets[0].status?.phase !== 'ready'),
        [status, assets],
    );
    return (
        <>
            <MetaTags />
            <div className="md:px-16">
                <div className="space-y-2 w-full md:w-auto flex flex-col">
                    <div className='flex flex-col space-y-1'>
                        {/* <RecentVideos /> */}
                        {!assets ? (
                            <>
                                <input
                                    type="file"
                                    multiple={false}
                                    accept="video/*"
                                    onChange={(e) => {
                                    if (e.target.files) {
                                        setVideo(e.target.files[0]);
                                    }
                                    }}
                                />
                                <button
                                    className='p-4 bg-black text-white rounded-md'
                                    disabled={status === 'loading' || !createAsset}
                                    onClick={() => {
                                    createAsset?.();
                                    }}
                                >
                                    Create Asset
                                </button>
                                <div>
                                    {progressFormatted && <ProgressBar height={30} progress={progressFormatted} />}
                                </div>
                            </>
                        ): (
                            <>
                                <div>
                                    {assets?.map((asset) => (
                                        <div key={asset.id}>
                                            <div>
                                                <div>Asset Name: {asset?.name}</div>
                                                <div>Playback URL: {asset?.playbackUrl}</div>
                                                <div>IPFS CID: {asset?.storage?.ipfs?.cid ?? 'None'}</div>
                                            </div>
                                        </div>
                                    ))}
                             </div>

                                <div>
                                        {assets?.[0]?.playbackId && (
                                            <Player title={assets[0].name} playbackId={assets[0].playbackId} />
                                        )}
                                </div>
                            </>
                        )}
                    
                        {error && <div>{error.message}</div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadVideo