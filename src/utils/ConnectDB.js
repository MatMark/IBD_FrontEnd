import { handleResponse } from './utils';

class ConnectDB {

    //-----------------------ADDRESSES----------------------------------

    static async getAddresses(){
        const headers = new Headers([['Accept', 'application/json'], ['Authorization', 'bearer '+localStorage.getItem('token')]]);
        try {
            const res = await fetch('https://backendw4rta.azurewebsites.net/api/Address', {
                method: 'GET',
                headers: headers
            });
            const res_1 = await res.json();
            return res_1;
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    //-----------------------LOGIN----------------------------------

    static async login(email, password){
        const headers = new Headers([['Content-Type', 'application/json']]);
        let object = {
            email,
            password
        } 
          try {
            const res = await fetch('https://backendw4rta.azurewebsites.net/api/Login', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(object),
            }).then(handleResponse)
            .then(user => {
                console.log(user)
                localStorage.setItem('token', user.token);
            });
            const res_1 = await res.json();
            return res_1;
        }
        catch (error) {
            const err = await error;
            return err;
            // console.error('Error:', error);
        }
    }
}
export default ConnectDB;