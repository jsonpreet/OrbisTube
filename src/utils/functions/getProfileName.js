import { shortAddress } from '../functions';

export function getUsername(details, address, did) {
  if(details && details.username) {
    return details.username;
  } else if(details && details.body?.name) {
    return details.body.name;
  } else if(address) {
    return shortAddress(address)
  } else {
    return shortAddress(did)
  }
}



export function getDisplay(details, address, did) {
  if (details && details.data?.DisplayName && details.data?.DisplayName !== undefined) {
    return details.data?.DisplayName;
  }
  else if(details && details.username) {
    return details.username;
  } else if(details && details.body?.name) {
    return details.body.name;
  } else if(address) {
    return shortAddress(address)
  } else {
    return shortAddress(did)
  }
}
  