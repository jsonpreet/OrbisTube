

const ChannelSettingsShimmer = () => {
    return (
        <>
            <div>
                <div className="w-full rounded-none md:rounded-md">
                    <div className="flex flex-col animate-pulse">
                    <div className="bg-white md:h-72 h-44 dark:bg-gray-700" />
                    <div className=" max-w-7xl w-full mx-auto ">
                        <div className="flex items-center p-2 space-x-4">
                            <div className="w-20 h-20 bg-white border-4 dark:border-gray-900 rounded-full md:-mt-12 md:w-32 md:h-32 dark:bg-gray-700" />
                                <div className="flex-1 py-5 space-y-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="h-3.5 col-span-2 bg-white rounded dark:bg-gray-700" />
                                        <div className="h-3 col-span-1 bg-white rounded dark:bg-gray-700" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}

export default ChannelSettingsShimmer