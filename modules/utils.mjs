import { tools } from 'nanocurrency-web';
import * as nanocurrency from 'nanocurrency';
import { config_general } from './config.mjs';
import { work_generate } from './rpc.mjs';
export function estAdresseNano(texte) {
    // Expression régulière pour le format d'une adresse Nano
    const regexNano = /^(xrb|xro)_[13]{1}[13456789abcdefghijkmnopqrstuwxyz]{59}$/i;
  
    return regexNano.test(texte);
}

export function estNombre(texte) {
    // Expression régulière pour le format d'un nombre, y compris le format scientifique
    const regexNombre = /^-?\d*\.?\d+(?:[eE][-+]?\d+)?$/;

    return regexNombre.test(texte);
}

export function RawToMega(amount) {
    const converted = tools.convert(amount, 'RAW', 'NANO');
    return converted;
}

export function MegaToRaw(amount) {
    const converted = tools.convert(amount, 'NANO', 'RAW');
    return converted;
}

export async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function calculateMultiplier(percentage) {
    return 1 - (percentage / 100);
}

export function pourcentage(partie, total) {
    return (partie / total) * 100;
}

export async function workLocal(hash) {
    return new Promise((resolve, reject) => {
        nanocurrency.computeWork(hash)
            .then(pow => {
                console.log(pow);
                resolve(pow);
            })
            .catch(error => {
                console.error("Erreur lors du calcul du travail :", error);
                reject(error);
            });
    });
}

export async function theWork(hash) {
    return new Promise(async (resolve, reject) => {
        if (config_general()["work"] === "remote") {
            console.log("woooooork remooooote");
            const work = await work_generate(hash);
            resolve(work["work"]);
        } else {
            console.log("woooooork locallllll");
            const work = await workLocal(hash);
            return work;
        }
    });
}
