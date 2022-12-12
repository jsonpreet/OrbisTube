import makeBlockie from "ethereum-blockies-base64";
import { useDidToAddress } from "./getDidToAddress";

export function ProfilePicture({details, imgClass}) {
  const { address } = useDidToAddress(details?.did);

  if(!details) {
    return null;
  }

  /** Show profile badges */
  const ProfileBadges = () => {
    return(
      <div className="badges-container">
        {details.profile?.isHuman &&
          <div>
            <img src="/img/icons/human-verified.png" />
          </div>
        }
        {details.profile?.pfpIsNft &&
          <div>
            <img src={"/img/icons/nft-verified-"+details.profile?.pfpIsNft.chain+".png"} />
          </div>
        }
      </div>
    );
  }

  const PfpImg = ({className}) => {
    if(details.profile?.pfp) {
      return <img className={className} src={details.profile?.pfp} alt="pfp" />
    } else if(address) {
      return <img className={className} src={makeBlockie(address)} alt="pfp" />
    } else {
      return <img className={className} src="/img/empty-state.png" alt="pfp" />;
    }
  }

  return(
    <div className="flex space-x-1 items-center">
      {/** Show profile picture image */}
      <PfpImg className={imgClass} />

      {/** Show profile badges such as PoH and verified NFTs */}
      <ProfileBadges />
    </div>
  )
}