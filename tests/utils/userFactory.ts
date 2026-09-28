export interface TestUser {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export function buildUser(): TestUser {
  const unique = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    name: "Nadia Rahman",
    firstName: "Nadia",
    lastName: "Rahman",
    email: `qa.${unique}@example.com`,
    password: "Test@1234",
  };
}

export function toCreateAccountForm(user: TestUser) {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
    title: "Mrs",
    birth_date: "15",
    birth_month: "8",
    birth_year: "1993",
    firstname: user.firstName,
    lastname: user.lastName,
    company: "QA Labs",
    address1: "221 Baker Street",
    address2: "Floor 2",
    country: "Canada",
    zipcode: "10001",
    state: "Ontario",
    city: "Toronto",
    mobile_number: "5551234567",
  };
}
