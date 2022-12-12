import React, { useState, useEffect, useRef } from 'react';
import { getAddressFromDid } from "@orbisclub/orbis-sdk/utils";

/** Turns a did:pkh into a clean address and chain object */
export function useDidToAddress(did) {
  let res = getAddressFromDid(did);
  return res;
}