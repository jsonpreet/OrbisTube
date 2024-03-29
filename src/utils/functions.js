export const toastOptions = {
  error: {
    style: {
      border: '1px solid rgba(223, 0, 141, 1)',
      padding: '16px',
      background: 'linear-gradient(333deg, rgba(223, 0, 141, 0.88), rgba(124, 0, 214, 0.9))',
      borderRadius: '100px',
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 6px 45px',
      backdropFilter: 'blur(3px)',
      color: '#ffffff',
      whiteSpace: 'nowrap',
      textShadow: 'rgba(17, 17, 17, 0.21) 0px 1px 12px',
    },
    iconTheme: {
      primary: '#fff',
      secondary: 'rgba(223, 0, 141, 0.88)',
    },
  },
  success: {
    style: {
      border: '1px solid rgb(62, 148, 95)',
      padding: '16px',
      background: 'linear-gradient(333deg, rgba(6, 176, 63, 0.88), rgba(0, 165, 142, 0.9))',
      borderRadius: '100px',
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 6px 45px',
      backdropFilter: 'blur(3px)',
      color: 'rgb(255, 255, 255)',
      whiteSpace: 'nowrap',
      textShadow: 'rgba(17, 17, 17, 0.21) 0px 1px 12px',
    },
    iconTheme: {
      primary: '#fff',
      secondary: 'rgba(6, 176, 63, 0.88)',
    },
  },
  loading: {
    style: {
      border: '1px solid rgba(230, 125, 0, 0.88)',
      padding: '16px',
      background: 'linear-gradient(333deg, rgba(230, 125, 0, 0.88), rgba(244, 160, 0, 0.9))',
      borderRadius: '100px',
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 6px 45px',
      backdropFilter: 'blur(3px)',
      color: '#ffffff',
      whiteSpace: 'nowrap',
      textShadow: 'rgba(17, 17, 17, 0.21) 0px 1px 12px',
    },
    iconTheme: {
      primary: '#fff',
      secondary: 'rgba(230, 125, 0, 1)',
    },
  },
  position:"top-center",
  reverseOrder: false,
  duration: 4000,
}

export const getSecondsFromTime = (time) => {
  const timeSplitted = time.split(':')
  let seconds = 0
  let minute = 1
  while (timeSplitted.length > 0) {
    seconds += minute * parseInt(timeSplitted.pop() ?? '0', 10)
    minute *= 60
  }
  return seconds
}

export const getTimeFromSeconds = (seconds) => {
  if (seconds === 'Infinity') return null
  const parsed = parseFloat(seconds)
  if (parsed < 3600) {
    return new Date(parsed * 1000)?.toISOString().slice(14, 19)
  }
  return new Date(parsed * 1000)?.toISOString().slice(11, 19)
}

export function nFormatter(num, digits) {
  const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export const dateFormat = (p_timeStampNanoSeconds) => {
  const milliseconds = p_timeStampNanoSeconds / 1000000;
  const date = new Date(milliseconds);
  const formattedDate = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',

  }) + ' · ' + date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
  });
  return formattedDate;
}

export const formatNumber = (num) => {
  if (num > 999 && num < 1000000) {
    return `${(num / 1000).toPrecision(3)}k`
  } else if (num > 1000000) {
    return `${(num / 1000000).toPrecision(3)}m`
  } else if (num < 1000) {
    return num
  }
}

export const timeNow = (p_timeStampNanoSeconds) => {
  const milliseconds = p_timeStampNanoSeconds / 1000000;
  const durationUntilNowInMilliseconds = new Date().getTime() - milliseconds;
  const durationInMinutes = durationUntilNowInMilliseconds / 1000 / 60;

  if (durationInMinutes < 60) {
      return (durationInMinutes > 1) ? Math.floor(durationInMinutes) + ' minutes ago' : Math.floor(durationInMinutes) + ' minute ago';
  }

  const durationInHours = durationInMinutes / 60;

  if (durationInHours < 24) {
      return (durationInHours > 1) ? Math.floor(durationInHours) + ' hours ago' : Math.floor(durationInHours) + ' hour ago';
  }

  const durationInDays = durationInHours / 24;

  return (durationInDays > 1) ? Math.floor(durationInDays) + ' days ago' : Math.floor(durationInDays) + ' day ago';
}

export const isAlreadyAddedToWatchLater = (currentVideo,videos) => {
  const alreadyExists = videos.find((el) => el.PostHashHex === currentVideo.PostHashHex)
  return !!alreadyExists
}

export const getThumbDuration = (duration) => {
  const seconds = Math.round(duration)
  const second = (duration > 10) ? 10 : (duration > 5) ? 5 : (duration > 1) ? 1 : 0
 return `${second}s`
}

export const formatBytes = (bytes) => {
  if (bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.min(
      parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10),
      sizes.length - 1
    )
    return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)} ${sizes[i]}`
  }
  return 'n/a'
}

/** Wait for x ms in an async function */
export const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/** Convert an address into a short address with only the first 7 + last 7 characters */
export function shortAddress(_address) {
  if(!_address) {
    return "-";
  }

  const _firstChars = _address.substring(0, 5);
  const _lastChars = _address.substr(_address.length - 5);
  return _firstChars.concat('-', _lastChars);
}

/** Returns current timestamp */
export function getTimestamp() {
  const cur_timestamp = Math.round(new Date().getTime() / 1000).toString()
  return cur_timestamp;
}

/** Returns true if object is an array */
export function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

/** Convert local base64 image to a file object that can be pushed to Arweave */
export async function base64ToFile(dataURL, fileName) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    return (fetch(dataURL).then(function (result) {
      return result.arrayBuffer();
    }));
}

/** Generate random id */
export function randomId() {
  return Math.floor(Math.random() * 10) + 1 * Date.now();
}