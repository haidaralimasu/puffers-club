import { ethers } from "ethers";
import { useContractCall } from "@usedapp/core";
import nftabi from "../contracts/NFT.json";
import { address } from "../contracts";
import { formatUnits } from "ethers/lib/utils";

const nftInterface = new ethers.utils.Interface(nftabi);

export function useTotalSupply() {
  const [totalSupply] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "totalSupply",
      args: [],
    }) ?? [];
  const formatedTotoalSupply = totalSupply ? totalSupply.toNumber() : 0;
  return formatedTotoalSupply;
}

export function useMaxSupply() {
  const [maxSupply] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "maxSupply",
      args: [],
    }) ?? [];
  const formatedMaxSupply = maxSupply ? maxSupply.toNumber() : 0;
  return formatedMaxSupply;
}

export function useCost() {
  const [cost] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "cost",
      args: [],
    }) ?? [];
  const formattedCost = cost ? parseFloat(formatUnits(cost, 18)) : 0;
  return formattedCost;
}

export function useWhitelistCost() {
  const [whitelistCost] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "whitelistCost",
      args: [],
    }) ?? [];
  const formattedCost = whitelistCost
    ? parseFloat(formatUnits(whitelistCost, 18))
    : 0;
  return formattedCost;
}

export function useWeiCost() {
  const [cost] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "cost",
      args: [],
    }) ?? [];
  return cost;
}

export function useWeiWhitelistCost() {
  const [whitelistCost] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "whitelistCost",
      args: [],
    }) ?? [];
  return whitelistCost;
}

export function useIsPreSale() {
  const [isPreSale] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "isPreSale",
      args: [],
    }) ?? [];
  return isPreSale;
}

export function useTotalWeiCost(amount) {
  const [getTotalCost] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "getTotalCost",
      args: [amount],
    }) ?? [];
  return getTotalCost;
}

export function useBalanceOf(ownerAddress) {
  const [balanceOf] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "balanceOf",
      args: [ownerAddress],
    }) ?? [];
  const formatedBalanceof = balanceOf ? balanceOf.toNumber() : 0;
  return formatedBalanceof;
}

export function useUserMintLimit() {
  const [nftPerAddressLimit] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "nftPerAddressLimit",
      args: [],
    }) ?? [];
  const formatedLimit = nftPerAddressLimit ? nftPerAddressLimit.toNumber() : 0;
  return formatedLimit;
}

export function UseisWhitelisted(userAddress) {
  const [isWhitelisted] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "isWhitelisted",
      args: [userAddress],
    }) ?? [];
  return isWhitelisted;
}
