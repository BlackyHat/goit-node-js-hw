const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join("db", "contacts.json");
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log("error", error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.filter(
      (contact) => Number(contactId) === Number(contact.id)
    );
    return contactById.length > 0 ? contactById : "Contact with not found";
  } catch (error) {
    console.log("error", error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const filteredContacts = contacts.filter(
      (contact) => Number(contactId) !== Number(contact.id)
    );

    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts),
      (error) => {
        if (error) {
          throw error;
        }
        console.log("The file has been removed.");
      }
    );
    return contacts.filter(
      (contact) => Number(contactId) === Number(contact.id)
    );
  } catch (error) {
    console.log("error", error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const id = Math.floor(Math.random() * 100) + 1 + "";
    const newContact = { id, name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
      if (error) {
        throw error;
      }
      console.log("The file has been added.");
    });
    return newContact;
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
