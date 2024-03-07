import { getCosmWasmClient, getQueryClient } from "@sei-js/core";

async function delayOneSecond() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

const getOwnedNfts = async (wallet: string, collection: string) => {
  try {
    const cosmWasmClient = await getCosmWasmClient(
      "https://sei-rpc.polkachu.com/"
    );

    const queryMsg = {
      tokens: {
        owner: wallet,
      },
    };

    const queryResponse = await cosmWasmClient.queryContractSmart(
      collection,
      queryMsg
    );

    let current = queryResponse.tokens;
    const nfts: any[] = current;
    // do {
    //   await delayOneSecond();
    //   console.log(current);
    //   console.log(current[current.length - 1]);

    //   console.log(collection);
    //   const queryResponse2 = await cosmWasmClient.queryContractSmart(
    //     collection,
    //     {
    //       tokens: {
    //         owner: wallet,
    //         start_after: String(current[current.length - 1]),
    //       },
    //     }
    //   );

    //   current = queryResponse2.tokens;
    //   nfts.push(queryResponse2.tokens);
    // } while (!current);

    return nfts.flat().map((nft) => Number(nft));
  } catch (error) {
    console.log(error);
  }
};

export { getOwnedNfts };
