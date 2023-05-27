import { File, NFTStorage } from "nft.storage";

async function uploadToIPFS(imageFile: File, name: string, description: string) {
  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFhYzczNDUyNzgyMDBDMzg1MWIxM2RmRkNGMUE5MTNFOUMyMkU2MTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NTE1Njk5MzQzMSwibmFtZSI6InNxdWFkX2dvYWxzIn0._XbEcHA4hSPSX8zEqVjNR2-ylt2yB-UjoYh5L-5VwZ8",
  });

  // call client.store, passing in the image & metadata
  return nftstorage.store({
    image: imageFile as File,
    name,
    description,
  });
}

export default uploadToIPFS;
