import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

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
      }
    }
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <input onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={("text")} placeholder="Add your wallet address"></input>
      <input onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={("text")} placeholder="Add the collection address"></input>
      <label><input onChange={(e) => {setFetchForCollection(e.target.checked)}} type={("checkbox")}></input>Fetch for collection</label>
      <button onClick={
          () => {
            if(fetchForCollection){
              fetchNFTsForCollection()
            }else{
              fetchNFTs()
            }
          }
        }>Let's go</button>
    </div>
  )
}

export default Home
