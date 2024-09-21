export default class Cookies {
    getCookie(cookieName, index) {
        return document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${cookieName}=`))
            ?.split("=")[index];
    }

    setCookie(cookieName, cookieValue, extraDays) {
        const date = new Date();
        date.setTime(date.getTime() + (extraDays * 24 * 60 * 60));
        let expires = `max-age=${date.toUTCString}`;
        document.cookie = `${cookieName}=${cookieValue};${expires};SameSite=None; Secure`;
    }

     getCookieByName(cname) {
         let name = cname + "=";
         let decodedCookie = decodeURIComponent(document.cookie);
         let ca = decodedCookie.split(';');
         for(let i = 0; i <ca.length; i++) {
             let c = ca[i];
             while (c.charAt(0) == ' ') {
                 c = c.substring(1);
             }
             if (c.indexOf(name) == 0) {
                 return c.substring(name.length, c.length);
             }
         }
         return "";
     }
}
