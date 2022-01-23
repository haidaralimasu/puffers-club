import { toast } from "react-toastify";

export const notifyMintSuccess = () => {
  toast.success("Puffers minted successfully !", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyMintError = () => {
  toast.error("Something went wrong !", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyConnectError = () => {
  toast.error("Please connect to ethereum mainnet", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const isWhiteListed = (address) => {
  let names = [
    "0xA9889aAC1c8d0e8d5F874CdC9D475D0Dfcf32EB1",
    "0xDf9f0593449Ec6e6a3706EBB505794FdB83FEF77",
  ];

  const whitelistedUser = names.map((name) => name.toLowerCase());
  const userAddress = address ? address.toLowerCase() : "0";

  if (whitelistedUser.includes(userAddress)) {
    return true;
  } else {
    return false;
  }
};

export const indexOfWhitelist = (address) => {
  let names = [
    "0xA9889aAC1c8d0e8d5F874CdC9D475D0Dfcf32EB1",
    "0xDf9f0593449Ec6e6a3706EBB505794FdB83FEF77",
  ];

  const whitelistedUser = names.map((name) => name.toLowerCase());
  const userAddress = address ? address.toLowerCase() : "0";

  return whitelistedUser.indexOf(userAddress);
};
