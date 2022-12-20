import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { NFTCard } from '../components/nftCard'

const Home = () => {
  const [wallet,setWalletAddress] = useState("")
  const [collection,setCollectionAddress] = useState("")
  const [NFTs,setNFTs] = useState([])
  const [fetchForCollection,setFetchForCollection] = useState(false)

  const fetchNFTs = async() => {
    let nfts;
    console.log("fetching NFTs");
    const baseURL = "https://eth-mainnet.g.alchemy.com/v2/zCCdyKuaWGrdenA1ZoXVs1ig1_Y9YZ-T";

    if(!collection.length){
      
      const url = `${baseURL}/getNFTs/?owner=${wallet}`;

      var requestOptions = {
        method: 'get',
        redirect: 'follow'
      };

      nfts = await fetch(url, requestOptions)
        .then(data => data.json())
        .catch(error => console.log('error', error))
    } else {
      console.log('collection nfts')
      const url = `${baseURL}/getNFTs/?owner=${wallet}&contractAddresses%5B%5D=${collection}`;

      nfts = await fetch(url, requestOptions)
        .then(data => data.json())
        .catch(error => console.log('error', error))
    }

    if(nfts){
      console.log(nfts);
      setNFTs(nfts.ownedNfts);
    }
  }

  const fetchNFTsForCollection = async () => {
    if(collection.length){
      var requestOptions = {
        method: 'GET'
      };
      // Alchemy API key
      const apiKey = 'zCCdyKuaWGrdenA1ZoXVs1ig1_Y9YZ';

      // Alchemy URL
      const baseURL = `https://eth-mainnet.g.alchemy.com/v2/zCCdyKuaWGrdenA1ZoXVs1ig1_Y9YZ-T/getNFTsForCollection`;
      const url = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;

      var requestOptions = {
        method: 'get',
        redirect: 'follow'
      };

      const nfts = await fetch(url, requestOptions)
        .then(response => response.json())
      
      if(nfts){
        console.log("NFTs in collection: ",nfts)
        setNFTs(nfts.nfts)
      }
    }
  }
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input disabled={fetchForCollection} onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={("text")} placeholder="Add your wallet address"></input>
        <input onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={("text")} placeholder="Add the collection address"></input>
        <label className="text-gray-600 "><input onChange={(e) => {setFetchForCollection(e.target.checked)}} type={("checkbox")} className="mr-2"></input>Fetch for collection</label>
        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
            () => {
              if(fetchForCollection){
                fetchNFTsForCollection()
              }else{
                fetchNFTs()
              }
            }
          }>Let's go</button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
