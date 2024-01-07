import { wallet as kWallet, block as poolBlock } from 'nanocurrency-web';
import { wallet as walletLib, block } from 'multi-nano-web';
import { account_infos, work_generate, process, block_count } from './rpc.mjs';
import { MegaToRaw, RawToMega, sleep } from './utils.mjs';
import Decimal from 'decimal.js';
import { config_general } from './config.mjs';
import * as nanocurrency from 'nanocurrency';
import { workLocal } from './utils.mjs';
import { theWork } from './utils.mjs';


export async function send(destination, amount) {
    console.log(`sennnddd: ${destination}, ${amount}`);
    try {
        const blockSync = await block_count();
        console.log(blockSync);
        const count = parseInt(blockSync.count, 10);
        const unchecked = parseInt(blockSync.unchecked, 10);
        const cemented = parseInt(blockSync.cemented, 10);
        let blockDif;
        if (unchecked > 20) {
            blockDif = count - cemented;
        } else {
            blockDif = count + unchecked - cemented;
        }
        console.log(blockDif);
        await sleep(blockDif * 1000 + 1000);
        const addInfo = await account_infos(config_general()["account"]);
        console.log(addInfo);
        const data = {
            walletBalanceRaw: addInfo.balance,
            fromAddress: config_general()["account"],
            toAddress: destination,
            representativeAddress: addInfo.representative,
            frontier: addInfo.frontier,
            amountRaw: amount,
            work: (await theWork(addInfo.frontier)),
        };
        console.log(data);
        const signedBlock = block.send(data, config_general()["privateKey"]);
        console.log(signedBlock);
        let r = await process(signedBlock, "send");
        return r;
    } catch (error) {
        return false;
    }
}
