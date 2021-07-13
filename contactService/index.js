// Start your code here!
// You should not need to edit any other existing files (other than if you would like to add tests)
// You do not need to import anything as all the necessary data and events will be delivered through
// updates and service, the 2 arguments to the constructor
// Feel free to add files as necessary

import { findQueryInContact, resultsFormatter } from './helpers'

export default class {
  constructor(updates, service) {
    this.arr = [];
    updates.on("add", async (id) => {
      const newContact = await service.getById(id);
      if (newContact.emailAddress) {
        newContact.primaryEmail = newContact.emailAddress;
        newContact.email = newContact.emailAddress;
      }
      this.arr.push(newContact);
    });
    updates.on("change", async (id, field, value) => {
      const contacttoUpdate = this.arr.find(
        (contact) => contact.id === id
      );
      contacttoUpdate[field] = value;
    });
    updates.on("remove", async (id) => {
      this.arr.splice(this.arr.findIndex(contact => contact.id === id), 1);
    });
  }


  search(query) {
          //splitting query string into iterable array and also removing special characters;
          const queries = query.split(' ').map(searchTerm => searchTerm.replace(/[^A-Z0-9]/ig, ''));
          const results = this.arr.filter(contact => {
              let isMatch = true;
              //this loop ensures that the contact matches each part of the query string
              for (let i = 0; i < queries.length; i++) {
                  const queryToFind = queries[i]
                  if (!findQueryInContact(contact, queryToFind)) {
                      isMatch = false
                  }
              }
              return isMatch;
          })
          return results.map(resultsFormatter)
  }
}
