import { APP_CONTEXT } from '@app/utils/constants';
import Category from '@components/Explore/Category'
import { Orbis } from '@orbisclub/orbis-sdk';

export default Category

export const getServerSideProps = async (ctx) => {
    const { category } = ctx.params;
    const orbis = new Orbis()
    let { data, error } = await orbis.getPosts({context: APP_CONTEXT, tag: category});
    if (data) {
        if (data.length > 0) {
            return {
                props: {
                    loading: false,
                    isError: false,
                    error: error,
                    posts: data
                },
            }
        }
        return {
            props: {
                loading: false,
                isError: false,
                error: error,
                posts: data
            },
        }
    } else {
        return {
            props: {
                loading: true,
                isError: false,
                error: error,
                posts: data
            },
        }
    }
}