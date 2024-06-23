// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

// function getUserData(id) {
//   const dbs = {
//     db1: db1,
//     db2: db2,
//     db3: db3
//   };
// }

function getUserData(id) {
  if (typeof id !== "number" || id < 1 || id > 10) {
    return Promise.reject("Invalid input");
  }

  return central(id)
    .then(db => {
      return Promise.all([
        dbs[db](id),
        vault(id)
      ]);
    })
    .then(([userData, vaultData]) => {
      return {
        id: id,
        name: vaultData.name,
        username: userData.username,
        email: vaultData.email,
        address: vaultData.address,
        phone: vaultData.phone,
        website: userData.website,
        company: userData.company
      };
    })
    .catch(error => {
      return Promise.reject(`Error accessing database: ${error.message}`);
    });
}