export function getCoverPicture(profile) {
    const url = profile?.data?.Cover ? profile.data.Cover : `/backgrounds/3.jpg`
    return url
}