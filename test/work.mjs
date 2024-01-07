import * as nanocurrency from 'nanocurrency';
import { workLocal } from '../modules/utils.mjs';

const blockHash = "F9134D06E3AF39AD3277D38AE936A7AB5E5394C2D8FFCE414A6BDDC1C05FDB89";
const pow = await workLocal(blockHash);
console.log(pow);