//import generalConfig from '../config/general.json' assert { type: 'json' };

export function config_general_2() {
    return generalConfig;
}

export function config_general() {
    const data = {
        privateKey: process.env.privatekey,
        account: process.env.account,
        fee: process.env.fee,
        fee_add: process.env.feeadd,
        work: process.env.work,
        work_url: process.env.workurl,
        node_url: process.env.nodeurl,
        ignore: process.env.ignore ?? "xro_33k4j8zqowfchbyf7tp5xj96uqqmhmx97z56htdp4so8u1mu66aezjqydjpw"
    };
    return data;
}