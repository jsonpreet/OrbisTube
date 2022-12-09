import { Watch } from '@components/Watch'
import { Orbis } from '@orbisclub/orbis-sdk';
import { useContext } from 'react';

export default Watch

// export const getServerSideProps = async (ctx) => {
//     const { id } = ctx.params;
//     const orbis = new Orbis()
//     let { data, error } = await orbis.getPost(id);
//     return {
//         props: {
//             error: error,
//             post: data
//         },
//     }
// }