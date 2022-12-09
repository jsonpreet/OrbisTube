import { Watch } from '@components/Watch'
import { Orbis } from '@orbisclub/orbis-sdk';

export default Watch

export const getServerSideProps = async (ctx) => {
    const { id } = ctx.params;
    const orbis = new Orbis()
    let { data, error } = await orbis.getPost(id);
    if (data && data.stream_id !== null) {
        return {
            props: {
                loading: false,
                isError: false,
                error: error,
                post: data
            },
        }
    } else {
        return {
            props: {
                loading: true,
                isError: false,
                error: error,
                post: data
            },
        }
    }
}