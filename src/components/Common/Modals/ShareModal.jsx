import { APP } from '@app/utils/constants'
import Modal from '@app/components/UI/Modal'
import useCopyToClipboard from '@utils/hooks/useCopyToClipboard'
import toast from 'react-hot-toast'
import SimpleBar from 'simplebar-react';
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon
} from 'next-share';
import { BiCopy } from 'react-icons/bi';

const ShareModal = ({ rootRef, show, setShow, video }) => {
  const [copy] = useCopyToClipboard()

  const onCopyVideoUrl = async () => {
    await copy(`${APP.URL}/watch/${video.stream_id}`)
    toast.success('Link copied to clipboard')
  }

  return (
    <Modal
      title="Share"
      onClose={() => setShow(false)}
      show={show}
      ref={rootRef}
      panelClassName="w-full max-w-lg"
    >
      <div className="w-full px-5 mt-2">
        <SimpleBar className='h-auto w-full'>
          <div className="md:flex md:justify-center grid grid-cols-4 md:grid-cols-1 md:items-center md:gap-0 gap-3 flex-nowrap max-w-md">
            <div className='md:mr-4 mr-0'>
              <button
                type="button"
                onClick={onCopyVideoUrl}
                className="flex items-center justify-center rounded-full w-[43px] h-[43px] active-primary hover-primary"
              >
                <BiCopy size={24} round />
              </button>
            </div>
            <div className='md:mr-4 mr-0'>
              <WhatsappShareButton
                url={`${APP.URL}/watch/${video.stream_id}`}
                title={video.content.body ? video.content.body: APP.Description}
                separator=":: "
                blankTarget={true}
              >
                <WhatsappIcon size={44} round />
              </WhatsappShareButton>
            </div>
            <div className='md:mr-4 mr-0'>
              <TwitterShareButton
                url={`${APP.URL}/watch/${video.stream_id}`}
                title={`${video.content.body ? video.content.body : APP.Description}`}
                via={APP.Twitter}
                blankTarget={true}
              >
                <TwitterIcon size={44} round />
              </TwitterShareButton>
            </div>
            <div className='md:mr-4 mr-0'>
              <FacebookShareButton
                url={`${APP.URL}/watch/${video.stream_id}`}
                quote={`${video.content.body ? video.content.body : APP.Description} via ${APP.Twitter}`}
                hashtag={'#Videso'}
                blankTarget={true}
              >
                <FacebookIcon size={44} round />
              </FacebookShareButton>
            </div>
            <div className='md:mr-4 mr-0'>
              <EmailShareButton
                url={`${APP.URL}/watch/${video.stream_id}`}
                subject={APP.Name}
                body={video.content.body ? video.content.body : APP.Description}
                blankTarget={true}
              >
                <EmailIcon size={44} round />
              </EmailShareButton>
            </div>
            <div className='md:mr-4 mr-0'>
              <PinterestShareButton
                url={`${APP.URL}/watch/${video.stream_id}`}
                quote={`${video.content.body ? video.content.body : APP.Description} via ${APP.Twitter}`}
                blankTarget={true}
              >
                <PinterestIcon size={44} round />
              </PinterestShareButton>
            </div>
            <div>
              <RedditShareButton
                url={`${APP.URL}/watch/${video.stream_id}`}
                quote={`${video.content.body ? video.content.body : APP.Description} via ${APP.Twitter}`}
                blankTarget={true}
              >
                <RedditIcon size={44} round />
              </RedditShareButton>
            </div>
          </div>
        </SimpleBar>  
      </div>
    </Modal>
  )
}

export default ShareModal