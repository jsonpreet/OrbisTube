import { Channel } from '@components/Channel'
import { Orbis } from '@orbisclub/orbis-sdk';

export default Channel

export const getServerSideProps = async (ctx) => {
    const { channel } = ctx.params;
    const orbis = new Orbis()
    let { data, error } = channel.includes('did') ? await orbis.getProfile(channel) : await orbis.getProfilesByUsername(channel);
    if (data) {
        if (data.length > 0) {
            return {
                props: {
                    loading: false,
                    isError: false,
                    error: error,
                    channel: data,
                    isDid: channel.includes('did')
                },
            }
        }
        return {
            props: {
                loading: false,
                isError: false,
                error: error,
                channel: data,
                isDid: channel.includes('did')
            },
        }
    } else {
        return {
            props: {
                loading: true,
                isError: false,
                error: error,
                channel: data,
                isDid: channel.includes('did')
            },
        }
    }
}