import React from 'react'
import {
    EmailShareButton, EmailIcon,
    FacebookShareButton, FacebookIcon,
    LinkedinShareButton, LinkedinIcon,
    PinterestShareButton, PinterestIcon,
    RedditShareButton, RedditIcon,
    TelegramShareButton, TelegramIcon,
    TumblrShareButton, TumblrIcon,
    TwitterShareButton, TwitterIcon,
    ViberShareButton, ViberIcon,
    VKShareButton, VKIcon,
    WhatsappShareButton, WhatsappIcon
} from 'react-share'

const ShareModal = ({url, themeReducer}) => {
    return (
        <div className="flex justify-between px-4 py-2"
            style={{ filter: themeReducer ? 'invert(1)' : 'invert(0)' }}
        >
            <EmailShareButton url={url}>
                <EmailIcon round={true} size={32} />
            </EmailShareButton>
            
            <FacebookShareButton url={url}>
                <FacebookIcon round={true} size={32} />
            </FacebookShareButton>
            
            <LinkedinShareButton url={url}>
                <LinkedinIcon round={true} size={32} />
            </LinkedinShareButton>
            
            <PinterestShareButton url={url}>
                <PinterestIcon round={true} size={32} />
            </PinterestShareButton>
            
            <RedditShareButton url={url}>
                <RedditIcon round={true} size={32} />
            </RedditShareButton>
            
            <TelegramShareButton url={url}>
                <TelegramIcon round={true} size={32} />
            </TelegramShareButton>
            
            <TumblrShareButton url={url}>
                <TumblrIcon round={true} size={32} />
            </TumblrShareButton>
            
            <TwitterShareButton url={url}>
                <TwitterIcon round={true} size={32} />
            </TwitterShareButton>
            
            <ViberShareButton url={url}>
                <ViberIcon round={true} size={32} />
            </ViberShareButton>
            
            <VKShareButton url={url}>
                <VKIcon round={true} size={32} />
            </VKShareButton>
            
            <WhatsappShareButton url={url}>
                <WhatsappIcon round={true} size={32} />
            </WhatsappShareButton>
            
        </div>
    )
}

export default ShareModal
