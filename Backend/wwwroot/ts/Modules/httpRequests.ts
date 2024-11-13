import Cookies from './cookies';
import hostAddress from './hostaddress';
// imports cause mime ("") error in browser find a solution in future to clean up code base

const cookies = new Cookies;
const hostadd = new hostAddress;

export default class requests {
    constructor() {
        this.userData = {
            deckData: [],
            heroData: [],
            itemData: []
        }  
    }

    async fetchAllInventoryData() {
        const userId =  cookies.getCookieByName('UserId');
        const url = `${hostadd.address}/UserData/AllUserAccountData/${userId}`
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

        } catch (error) {
           console.error(error.message);
        }
    }
}
