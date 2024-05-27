import { LightningElement, wire } from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Contact.AccountId';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/Contact.Email';
import PHONE from '@salesforce/schema/Contact.Phone';
import MAILING_STREET from '@salesforce/schema/Contact.MailingStreet';
import BIRTHDATE from '@salesforce/schema/Contact.Birthdate';
import getContacts from '@salesforce/apex/ContactController.getContacts';

const COLUMNS = [
    { label: 'Account Name', fieldName: ACCOUNT_NAME.fieldApiName, type: 'text' },
    { label: 'First Name', fieldName: FIRST_NAME.fieldApiName, type: 'text' },
    { label: 'Last Name', fieldName: LAST_NAME.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: EMAIL.fieldApiName, type: 'text' },
    { label: 'Phone', fieldName: PHONE.fieldApiName, type: 'text' },
    { label: 'Mailing Street', fieldName: MAILING_STREET.fieldApiName, type: 'text' },
    { label: 'Birthdate', fieldName: BIRTHDATE.fieldApiName, type: 'text' }
];

export default class ContactList extends LightningElement {
    columns = COLUMNS;
    currentContactIndex = 0;

    @wire(getContacts)
    contacts;

    get currentContact() {
        return this.contacts.data ? this.contacts.data[this.currentContactIndex] : null;
    }

    handleNext() {
        if (this.contacts.data && this.currentContactIndex < this.contacts.data.length - 1) {
            this.currentContactIndex++;
        }
    }

    handlePrevious() {
        if (this.currentContactIndex > 0) {
            this.currentContactIndex--;
        }
    }

    get errors() {
        return (this.accounts.error) ?
            reduceErrors(this.accounts.error) : [];
    }
}