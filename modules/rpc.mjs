import axios from 'axios';
import { config_general } from './config.mjs';
const apiUrl = config_general()["node_url"];
let workUrl;
if (config_general()["work"] === "remote" && config_general()["work_url"] != undefined) {
    workUrl = config_general()["work_url"];
} else if (config_general()["work"] === "remote") {
    workUrl = config_general()["node_url"];
}

const headers = {
    'Content-Type': 'application/json',
};   

export function account_infos(account) {
    return new Promise((resolve, reject) => {
        const data = {
            action: 'account_info',
            account: account,
            representative: 'true',
            weight: "true"
        };

        axios.post(apiUrl, data, { headers })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(false);
            });
    });
}

export async function work_generate(frontier) {
    return new Promise((resolve, reject) => {
        const data = {
            action: 'work_generate',
            hash: frontier
        };

        axios.post(workUrl, data, { headers })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(false);
            });
    });
}

export async function block_count() {
    return new Promise((resolve, reject) => {
        const data = {
            action: 'block_count'
        };

        axios.post(apiUrl, data, { headers })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(false);
            });
    });
}

export async function process(block, subtype) {
    return new Promise((resolve, reject) => {
        const data = {
            action: "process",
            json_block: "true",
            subtype: subtype,
            block: block
        };

        axios.post(apiUrl, data, { headers })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(false);
            });
    });
}

export async function pending(account) {
    return new Promise((resolve, reject) => {
        const data = {
            action: "pending",
            account: account,
            threshold: "1"
        };

        axios.post(apiUrl, data, { headers })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(false);
            });
    });
}

export async function delegators(account) {
    return new Promise((resolve, reject) => {
        const data = {
            action: "delegators",
            account: account
        };
        console.log(data);
        axios.post(apiUrl, data, { headers })
            .then(response => {
                console.log(response.data);
                resolve(response.data);
            })
            .catch(error => {
                reject(false);
            });
    });
}