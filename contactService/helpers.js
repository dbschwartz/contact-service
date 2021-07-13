function phoneFormatter (primary, secondary) {
  const phoneArr = [];
  const phoneRegex = /(\+*\d{1,})*([ |\(])*(\d{3})[^\d]*(\d{3})[^\d]*(\d{4})/;
  for (let number of arguments) {
    if (number) {
     /* phone number is in 3rd, 4th, and 5th capture group so slicing last three indexes
        in order to format */
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
    state,
    zipCode,
    id
  },
  query
) =>
  firstName.includes(query) ||
  lastName.includes(query) ||
  nickName.includes(query) ||
  primaryPhoneNumber.replace(/[^0-9]/g, "").includes(query) || //only looking at digits of phone number
  secondaryPhoneNumber.replace(/[^0-9]/g, "").includes(query) || //only looking at digits of phone number
  primaryEmail.includes(query) ||
  secondaryEmail.includes(query) ||
  addressLine1.includes(query) ||
  addressLine2.includes(query) ||
  addressLine3.includes(query) ||
  city.includes(query) ||
  state.includes(query) ||
  zipCode.includes(query) ||
  id.includes(query);

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