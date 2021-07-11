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

  phoneFormatter(primary, secondary) {
    const phoneArr = [];
    const phoneRegex = /(\+*\d{1,})*([ |\(])*(\d{3})[^\d]*(\d{3})[^\d]*(\d{4})/;
    for (let number of arguments) {
      if (number) {
        const temp = phoneRegex.exec(number).slice(3);
        phoneArr.push(`(${temp[0]}) ${temp[1]}-${temp[2]}`);
      }
    }
    return phoneArr;
  }

  search(query) {
    let results = this.arr.filter(
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
        state.includes(query)
    ).map(unformattedContact => (
      {
           name: `${unformattedContact.nickName ? unformattedContact.nickName : unformattedContact.firstName} ${unformattedContact.lastName}`,
           phones: this.phoneFormatter(unformattedContact.primaryPhoneNumber, unformattedContact.secondaryPhoneNumber),
           email: unformattedContact.primaryEmail,
           address: unformattedContact.addressLine1.concat(unformattedContact.addressLine2, unformattedContact.addressLine3),
           id: unformattedContact.id
       })
   )
    return results;
  }
}
