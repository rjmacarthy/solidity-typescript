import { deploy } from '../utils/deploy';
import { expect, assert } from "chai";
import { web3, getAccounts } from '../utils/web3';
import { Contract } from '../algernon/Contract';
import * as config from '../config';

describe('Contract spec', () => {
    let accounts: Array<string>;
    let methods: Contract;

    before(async () => {
        const deployed = await deploy(config.CONTRACT_NAME);
        accounts = await getAccounts();
        methods = deployed.methods;
    });

    it('Can get the count', async function () {
        var counter = await methods.counter().call()
        expect(counter).to.equal('0');
    });

    it('Can increment the count', async function () {
        await methods.incrementCounter().send({ from: accounts[0] });
        var counter = await methods.counter().call();
        expect(counter).to.equal('1');
    });

    it('Can decrement the count', async function () {
        await methods.decrementCounter().send({ from: accounts[0] });
        var counter = await methods.counter().call();
        expect(counter).to.equal('0');
    });

})