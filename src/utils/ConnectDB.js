import { handleResponse } from "./utils";

class ConnectDB {
  //-----------------------ADDRESSES----------------------------------

  static async getAddress(id) {
    const headers = new Headers([
      ["Accept", "application/json"],
      ["Authorization", "bearer " + localStorage.getItem("token")]
    ]);
    try {
      const res = await fetch(
        "https://backendw4rta.azurewebsites.net/api/Address/" + id,
        {
          method: "GET",
          headers: headers
        }
      );
      const res_1 = await res.json();
      return res_1;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  static async postAddress(
    city,
    street,
    homeNumber,
    apartmentNumber,
    postCode
  ) {
    const headers = new Headers([["Content-Type", "application/json"]]);
    let object = {
      city,
      street,
      homeNumber,
      apartmentNumber,
      postCode
    };
    try {
      const res = await fetch(
        "https://backendw4rta.azurewebsites.net/api/Address",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(object)
        }
      );
      const res_1 = await res.json();

      return res_1;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //----------------------CLIENTS---------------------------------

  static async getClientData(id) {
    const headers = new Headers([
      ["Accept", "application/json"],
      ["Authorization", "bearer " + localStorage.getItem("token")]
    ]);
    try {
      const res = await fetch(
        "https://backendw4rta.azurewebsites.net/api/Client/" + id,
        {
          method: "GET",
          headers: headers
        }
      );
      const res_1 = await res.json();
      return res_1;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //----------------------ACCOUNTS--------------------------------

  static async getClientAccounts(clientId) {
    const headers = new Headers([
      ["Content-Type", "application/json"],
      ["Authorization", "bearer " + localStorage.getItem("token")]
    ]);
    try {
      const res = await fetch(
        "https://backendw4rta.azurewebsites.net/api/Account/client_accounts",
        {
          method: "POST",
          headers: headers,
          body: clientId
        }
      );
      const res_1 = await res.json();

      return res_1;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //-----------------------LOGIN----------------------------------

  static async login(email, password) {
    const headers = new Headers([["Content-Type", "application/json"]]);
    let object = {
      email,
      password
    };
    try {
      const res = await fetch(
        "https://backendw4rta.azurewebsites.net/api/Login",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(object)
        }
      )
        .then(handleResponse)
        .then(user => {
          // console.log(user)
          localStorage.setItem("token", user.token);
        });
      const res_1 = await res.json();
      return res_1;
    } catch (error) {
      const err = await error;
      return err;
      // console.error('Error:', error);
    }
  }

  //----------------------REGISTER----------------------------------
  static async register(
    firstName,
    lastName,
    pesel,
    phone,
    email,
    birthDate,
    password,
    addressId
  ) {
    const headers = new Headers([["Content-Type", "application/json"]]);
    let object = {
      firstName,
      lastName,
      pesel,
      phone,
      email,
      birthDate,
      password,
      addressId
    };

    try {
      const res = await fetch(
        "https://backendw4rta.azurewebsites.net/api/Register",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(object)
        }
      );
      const res_1 = await res.json();
      return res_1;
    } catch (error) {
      const err = await error;
      return err;
      // console.error('Error:', error);
    }
  }
}
export default ConnectDB;
