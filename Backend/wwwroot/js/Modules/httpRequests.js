"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookies_1 = __importDefault(require("./cookies"));
const hostaddress_1 = __importDefault(require("./hostaddress"));
// imports cause mime ("") error in browser find a solution in future to clean up code base
const cookies = new cookies_1.default;
const hostadd = new hostaddress_1.default;
class requests {
    constructor() {
        this.userData = {
            deckData: [],
            heroData: [],
            itemData: []
        };
    }
    async fetchAllInventoryData() {
        const userId = cookies.getCookieByName('UserId');
        const url = `${hostadd.address}/UserData/AllUserAccountData/${userId}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Response Status: ${response.status}`);
            }
            if (response.ok) {
                this.userData.deckData = data.deckInv;
                this.userData.heroData = data.heroInv;
                this.userData.itemData = data.itemInv;
                return this.userData;
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }
}
exports.default = requests;
//# sourceMappingURL=httpRequests.js.map