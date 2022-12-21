import makeBlockie from "ethereum-blockies-base64";
import { useDidToAddress } from "./getDidToAddress";
import imageCdn from "./imageCdn";

export function getProfilePicture(profile, address) {
  return profile ? profile.data?.Avatar ? profile.data?.Avatar : profile.pfp ? profile.pfp : makeBlockie(address) : makeBlockie(address)
}

export function ProfileBadges({details, imgClass}) {
  if (!details) {
    return null;
  }
  const classes = imgClass ? imgClass : "w-3 h-3";
  return(
    <>
      {details.profile?.isHuman &&
        <div>
          <img src="/icons/human-verified.png" className={classes} />
        </div>
      }
      {details.profile?.pfpIsNft &&
        <div>
          <img src={"/icons/nft-verified-"+details.profile?.pfpIsNft.chain+".png"} className={classes} />
        </div>
      }
    </>
  );
}

export function ProfilePicture({details, imgClass}) {
  const { address } = useDidToAddress(details?.did);

  if(!details) {
    return null;
  }

  /** Show profile badges */
  const ProfileBadges = () => {
    return(
      <div className="flex items-start">
        {details.profile?.isHuman &&
          <div>
            <img src="/icons/human-verified.png" className="w-3 h-3" />
          </div>
        }
        {details.profile?.pfpIsNft &&
          <div>
            <img src={"/icons/nft-verified-"+details.profile?.pfpIsNft.chain+".png"} className="w-3 h-3" />
          </div>
        }
      </div>
    );
  }

  const PfpImg = ({ className }) => {
    if(details.profile?.data?.Avatar !== undefined && details.profile?.data?.Avatar !== null) {
      return <img className={className} src={imageCdn(details.profile?.data?.Avatar, 
      'avatar_lg')} alt="pfp" />
    } else if(details.profile?.pfp) {
      return <img className={className} src={imageCdn(details.profile?.pfp, 'avatar_lg')} alt="pfp" />
    } else if(address) {
      return <img className={className} src={makeBlockie(address)} alt="pfp" />
    } else {
      return <img className={className} src="/empty-state.png" alt="pfp" />;
    }
  }

  return(
    <div className="">
      {/** Show profile picture image */}
      <PfpImg className={imgClass} />

      {/** Show profile badges such as PoH and verified NFTs */}
      {/* <ProfileBadges /> */}
    </div>
  )
}