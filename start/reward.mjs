import { delegators, account_infos } from "../modules/rpc.mjs";
import { config_general } from "../modules/config.mjs";
import { calculateMultiplier, pourcentage } from "../modules/utils.mjs";
import Decimal from 'decimal.js';
import { send } from "../modules/wallet.mjs";

export default async function start() {
        console.log("ddd");
        const delegAll = await delegators(config_general()["account"]);
        console.log(delegAll);
        const delegInfo = await account_infos(config_general()["account"]);
        const weightDeleg = delegInfo["weight"];
        const balanceDeleg = delegInfo["balance"];
        const multy = calculateMultiplier(config_general()["fee"]);
        let dimAmountPlain = new Decimal(balanceDeleg);
        const degAmount = dimAmountPlain.times(multy);
        console.log(delegAll);

        if (delegAll && delegAll.delegators) {
            for (const delegatorAddress in delegAll.delegators) {
                try {
                    const delegatedAmount = delegAll.delegators[delegatorAddress];
                    console.log(`Delegator Address: ${delegatorAddress}, Delegated Amount: ${delegatedAmount}`);
                    const toSend = (pourcentage(delegatedAmount, weightDeleg) / 100) * degAmount;
                    await send(delegatorAddress, toSend);
                } catch (delegatorError) {
                    console.error(`Error processing delegator ${delegatorAddress}: ${delegatorError.message}`);
                }
            }

            const sendBalance = new Decimal(balanceDeleg)
                .minus(new Decimal(degAmount))
                .toNumber();
            const delegInfo2 = await account_infos(config_general()["account"]);
            if (delegInfo2["balance"] >= sendBalance) {
                const block = await send(config_general()["fee_add"], sendBalance);
                console.log(block);
            }
        } else {
            console.log("No delegators or invalid object.");
        }
}