import React, { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import puffer from "../../assets/puffer.png";
import "react-toastify/dist/ReactToastify.css";
import "./header.css";
import {
  useMaxSupply,
  useTotalSupply,
  useCost,
  useWeiWhitelistCost,
  useWhitelistCost,
  useIsPreSale,
  useWeiCost,
} from "../../hooks";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { ethers } from "ethers";
import {
  notifyMintSuccess,
  notifyMintError,
  notifyConnectError,
  isWhiteListed,
  indexOfWhitelist,
} from "../../helper";
import { address } from "../../contracts";

import nftabi from "../../contracts/NFT.json";

const Header = () => {
  const { activateBrowserWallet, account } = useEthers();
  const totalSupply = useTotalSupply();
  const maxSupply = useMaxSupply();
  const isPreSale = useIsPreSale();
  const cost = useCost();
  const [amount, setAmount] = useState(1);
  const [minting, setMinting] = useState(false);

  const userIsWhitelisted = isWhiteListed(account);
  const weiCost = useWeiCost();

  const whitelistCost = useWhitelistCost();
  const whitelistWeiCost = useWeiWhitelistCost();

  const [hexproof, setHexproof] = useState([]);
  const [error, setError] = useState("");

  const indexOfUser = indexOfWhitelist(account);

  const proof = async (index) => {
    const res = await axios.get(`http://localhost:8000/detail/${index}`);
    return res;
  };

  // console.log(proof(indexOfUser));

  const loadProof = () => {
    proof(indexOfUser)
      .then((data) => {
        if (data.error) {
          setError(error);
          console.log(error);
        } else {
          setHexproof(data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadProof();
  });

  console.log(hexproof.data);

  const nftInterface = new ethers.utils.Interface(nftabi);

  function increaseAmount() {
    if (amount < 5) {
      setAmount(amount + 1);
    }
  }

  function decreaseAmount() {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  }

  function onError() {
    notifyConnectError();
  }

  async function handleWhiteListMint() {
    try {
      setMinting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const txCost = Number(whitelistWeiCost) * amount;

      const mainCost = txCost.toString();

      let nftcontract = new ethers.Contract(address, nftInterface, signer);
      let transaction = await nftcontract.whiteListedMint(
        hexproof.data,
        amount,
        {
          value: mainCost,
        }
      );
      await transaction.wait();
      await setAmount(1);
      await notifyMintSuccess();
      await setMinting(false);
    } catch (error) {
      console.log(error);
      notifyMintError();
      setMinting(false);
    }
  }

  async function handleMint() {
    try {
      setMinting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const txCost = Number(weiCost) * (amount + 0.01);
      console.log(Math.ceil(txCost));

      let nftcontract = new ethers.Contract(address, nftInterface, signer);
      let transaction = await nftcontract.mint(amount, {
        value: Math.ceil(txCost).toString(),
      });
      await transaction.wait();
      await setAmount(1);
      await notifyMintSuccess();

      await setMinting(false);
    } catch (error) {
      notifyMintError();
      setMinting(false);
    }
  }

  return (
    <div className="gpt3__header section__padding" id="home">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="gpt3__header-content">
        <h1 className="gradient__text">The Puffers Club</h1>

        {totalSupply < maxSupply ? (
          <>
            {isPreSale ? (
              <>
                <div>
                  <h3
                    style={{
                      display: "flex",
                      marginTop: 10,
                    }}
                    className="gradient__text"
                  >
                    Pre Sale
                  </h3>
                  <h2
                    style={{
                      display: "flex",
                      marginTop: 20,
                      fontSize: 40,
                    }}
                    className="gradient__text"
                  >
                    {totalSupply}/{maxSupply}
                  </h2>
                  <h3
                    style={{
                      display: "flex",
                      marginTop: 10,
                    }}
                    className="gradient__text"
                  >
                    Price: {whitelistCost} {ethers.constants.EtherSymbol}
                  </h3>
                </div>

                <div className="gpt3__header-content__input">
                  {account ? (
                    <>
                      {userIsWhitelisted ? (
                        <>
                          {!minting ? (
                            <div style={{ display: "flex", width: "100%" }}>
                              <div>
                                <button
                                  style={{ marginRight: 10 }}
                                  className="btn-amount"
                                  type="button"
                                  onClick={() => decreaseAmount()}
                                >
                                  -
                                </button>
                              </div>
                              <button
                                style={{ marginLeft: 10 }}
                                type="button"
                                onClick={() => handleWhiteListMint()}
                              >
                                Mint {amount} Puffers
                              </button>
                              <div>
                                <button
                                  style={{ marginLeft: 10 }}
                                  className="btn-amount"
                                  type="button"
                                  onClick={() => increaseAmount()}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div style={{ display: "flex", width: "100%" }}>
                              <div></div>
                              <button style={{ marginLeft: 10 }} type="button">
                                Please Wait
                              </button>
                              <div></div>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div style={{ display: "flex", width: "100%" }}>
                            <div></div>
                            <button type="button">You are not whitelist</button>
                            <div></div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => activateBrowserWallet(onError)}
                    >
                      Connect
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3
                    style={{
                      display: "flex",
                      marginTop: 10,
                    }}
                    className="gradient__text"
                  >
                    Public Sale
                  </h3>
                  <h2
                    style={{
                      display: "flex",
                      marginTop: 20,
                      fontSize: 40,
                    }}
                    className="gradient__text"
                  >
                    {totalSupply}/{maxSupply}
                  </h2>
                  <h3
                    style={{
                      display: "flex",
                      marginTop: 10,
                    }}
                    className="gradient__text"
                  >
                    Current Price: {cost} {ethers.constants.EtherSymbol}
                  </h3>
                </div>

                <div className="gpt3__header-content__input">
                  {account ? (
                    <>
                      {!minting ? (
                        <div style={{ display: "flex", width: "100%" }}>
                          <div>
                            <button
                              style={{ marginRight: 10 }}
                              className="btn-amount"
                              type="button"
                              onClick={() => decreaseAmount()}
                            >
                              -
                            </button>
                          </div>
                          <button
                            style={{ marginLeft: 10 }}
                            type="button"
                            onClick={() => handleMint()}
                          >
                            Mint {amount} Puffers
                          </button>
                          <div>
                            <button
                              style={{ marginLeft: 10 }}
                              className="btn-amount"
                              type="button"
                              onClick={() => increaseAmount()}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: "flex", width: "100%" }}>
                          <div></div>
                          <button style={{ marginLeft: 10 }} type="button">
                            Please Wait
                          </button>
                          <div></div>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => activateBrowserWallet(onError)}
                    >
                      Connect
                    </button>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div>
              <h3
                style={{
                  display: "flex",
                  marginTop: 10,
                }}
                className="gradient__text"
              >
                Secondary Sale
              </h3>
              <h2
                style={{
                  display: "flex",
                  marginTop: 20,
                  fontSize: 40,
                }}
                className="gradient__text"
              >
                {totalSupply}/{maxSupply}
              </h2>
              <h3
                style={{
                  display: "flex",
                  marginTop: 10,
                }}
                className="gradient__text"
              >
                Last Price: {cost} {ethers.constants.EtherSymbol}
              </h3>
            </div>

            <div className="gpt3__header-content__input">
              <button type="button">Buy On Opeansea</button>
            </div>
          </>
        )}
      </div>

      <div className="gpt3__header-image">
        <img alt="puffer" src={puffer} />
      </div>
    </div>
  );
};

export default Header;
