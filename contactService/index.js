// Start your code here!
// You should not need to edit any other existing files (other than if you would like to add tests)
// You do not need to import anything as all the necessary data and events will be delivered through
// updates and service, the 2 arguments to the constructor
// Feel free to add files as necessary

export default class {
  constructor(updates, service) {
    this.arr = [];
    updates.on("add", async (id) => {
      const newContact = await service.getById(id);
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
    const results = this.arr.filter(
      ({
        firstName,
        lastName,
        primaryPhoneNumber,
        secondaryPhoneNumber,
        primaryEmail,
        secondaryEmail,
        addressLine1,
        addressLine2,
        addressLine3,
        city,
        state,
      }) =>
        firstName.includes(query) ||
        lastName.includes(query) ||
        primaryPhoneNumber.includes(query) ||
        secondaryPhoneNumber.includes(query) ||
        primaryEmail.includes(query) ||
        secondaryEmail.includes(query) ||
        addressLine1.includes(query) ||
        addressLine2.includes(query) ||
        addressLine3.includes(query) ||
        city.includes(query) ||
        state.includes(query) ||
        id.includes(query)
    );
    //onsole.log(results);
    return results;
  }
}
