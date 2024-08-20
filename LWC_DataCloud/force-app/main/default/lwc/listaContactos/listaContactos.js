import { LightningElement, wire } from 'lwc';
import contactsL from "@salesforce/apex/ContactosQ.getContactos";

export default class ListaContactos extends LightningElement {
  nombres = [];

  @wire(contactsL)
  wiredContacts({ error, data }) {
      if (data) {
          this.nombres = data.map(contact => contact.Name);
      } else if (error) {
          console.error(error);
      }
  }

}