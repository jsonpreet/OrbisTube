import React, { useState, useEffect, useRef } from 'react';
import { shortAddress } from '../functions';
import { getAddressFromDid } from "@orbisclub/orbis-sdk/utils";

export const useGetUsername = (details, address, did) => {
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

export const getUsername = (details, did) => {
  const { address } = getAddressFromDid(did);
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


  