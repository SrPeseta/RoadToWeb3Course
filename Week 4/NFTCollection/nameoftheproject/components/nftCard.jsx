export const NFTCard = (nft) => {
    var nftReal = nft.nft;
    return (
        <div className="w-1/4 flex flex-col ">
        <div className="rounded-md">
            <img className="object-cover h-128 w-full rounded-t-md" src={nftReal.media[0].gateway} ></img>
        </div>
        <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
            <div className="">
                <h2 className="text-xl text-gray-800">{nftReal.title}</h2>
                <p className="text-gray-600">Id: {nftReal.id.tokenId.substr(nftReal.id.tokenId.length - 4)}</p>
                <p className="text-gray-600" >{`${nftReal.contract.address}...${nftReal.contract.address.substr(nftReal.contract.address.length - 4)}`}</p>
            </div>

            <div className="flex-grow mt-2">
                <p className="text-gray-600">{nft.description?.substr(0,150)}</p>
            </div>
            <div>
                <a target={"_blank"} href={`https://etherscan.io/token/${nftReal.contract.address}`}>View on Etherscan</a>
            </div>
        </div>

    </div>
    )
}