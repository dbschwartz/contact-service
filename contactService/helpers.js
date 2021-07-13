function phoneFormatter (primary, secondary) {
  const phoneArr = [];
  const phoneRegex = /(\+*\d{1,})*([ |\(])*(\d{3})[^\d]*(\d{3})[^\d]*(\d{4})/;
  for (let number of arguments) {
    if (number) {
      const temp = phoneRegex.exec(number).slice(3);
      phoneArr.push(`(${temp[0]}) ${temp[1]}-${temp[2]}`);
    }
  }
  return phoneArr;
};

const findQueryInContact = (
  {
    firstName,
    lastName,
    nickName,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    primaryEmail,
    secondaryEmail,
    addressLine1,
    addressLine2,
    addressLine3,
    city,
    state
  },
  query
) =>
  firstName.includes(query) ||
  lastName.includes(query) ||
  nickName.includes(query) ||
  primaryPhoneNumber.replace(/[^0-9]/g, "").includes(query) ||
  secondaryPhoneNumber.replace(/[^0-9]/g, "").includes(query) ||
  primaryEmail.includes(query) ||
  secondaryEmail.includes(query) ||
  addressLine1.includes(query) ||
  addressLine2.includes(query) ||
  addressLine3.includes(query) ||
  city.includes(query) ||
  state.includes(query);

const resultsFormatter = (unformattedContact) => ({
  name: `${
    unformattedContact.nickName
      ? unformattedContact.nickName
      : unformattedContact.firstName
  } ${unformattedContact.lastName}`,
  phones: phoneFormatter(
    unformattedContact.primaryPhoneNumber,
    unformattedContact.secondaryPhoneNumber
  ),
  email: unformattedContact.primaryEmail,
  address: unformattedContact.addressLine1.concat(
    unformattedContact.addressLine2,
    unformattedContact.addressLine3
  ),
  id: unformattedContact.id,
});

module.exports = {findQueryInContact, resultsFormatter}