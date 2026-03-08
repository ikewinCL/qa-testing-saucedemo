const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
  invalid: { username: 'usuario_inexistente', password: 'wrong_password' }
};

const checkoutData = {
  valid: { firstName: 'Ana', lastName: 'Tester', postalCode: '15001' },
  missingFirstName: { firstName: '', lastName: 'Tester', postalCode: '15001' },
  missingLastName: { firstName: 'Ana', lastName: '', postalCode: '15001' },
  missingPostalCode: { firstName: 'Ana', lastName: 'Tester', postalCode: '' }
};

module.exports = { users, checkoutData };
