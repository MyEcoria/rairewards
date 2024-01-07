import { delegators, account_infos } from "../modules/rpc.mjs";
import { config_general } from "../modules/config.mjs";
import { calculateMultiplier, estAdresseNano, pourcentage } from "../modules/utils.mjs";
import Decimal from 'decimal.js';
import { send } from "../modules/wallet.mjs";

export default async function start() {
        console.log("ddd");
        const delegAll = await delegators(config_general()["account"]);
        console.log(delegAll);
        const delegInfo = await account_infos(config_general()["account"]);
        let weightDeleg = delegInfo["weight"];
        if (config_general()["ignore"] != undefined && estAdresseNano(config_general()["ignore"]) ) {
            const delegAllDeleg = await account_infos(config_general()["ignore"]);
            weightDeleg = new Decimal(weightDeleg)
                .minus(new Decimal(delegAllDeleg["balance"]))
                .toNumber();
        }
        const balanceDeleg = delegInfo["balance"];
        const multy = calculateMultiplier(config_general()["fee"]);
        let dimAmountPlain = new Decimal(balanceDeleg);
        const degAmount = dimAmountPlain.times(multy);
        console.log(delegAll);

        if (delegAll && delegAll.delegators) {
            for (const delegatorAddress in delegAll.delegators) {
                try {
                    if (config_general()["ignore"] != undefined) {
                        if (delegatorAddress != config_general()["ignore"]) {
                            const delegatedAmount = delegAll.delegators[delegatorAddress];
                            console.log(`Delegator Address: ${delegatorAddress}, Delegated Amount: ${delegatedAmount}`);
                            const toSend = (pourcentage(delegatedAmount, weightDeleg) / 100) * degAmount;
                            await send(delegatorAddress, toSend);
                        }
                    }
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