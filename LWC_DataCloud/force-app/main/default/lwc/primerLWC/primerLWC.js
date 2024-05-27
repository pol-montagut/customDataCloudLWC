import { LightningElement, wire,api  } from 'lwc';
import contactQuery from '@salesforce/apex/contactQuery.contactQuery';
/*import FirstName_FIELD from '@salesforce/schema/Contact.FirstName';
import LastName_FIELD from '@salesforce/schema/Contact.LastName';
import Email_FIELD from '@salesforce/schema/Contact.Email';


/*const COLUMNS = [
    { label: 'First Name', fieldName: FirstName_FIELD.fieldApiName, type: 'text' },
    { label: 'Last Name', fieldName: LastName_FIELD.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: Email_FIELD.fieldApiName, type: 'email' },
    { label: 'Mobile', fieldName: MobilePhone_FIELD.fieldApiName, type: 'phone'},
    { label: 'Address', fieldName: MailingAddress_FIELD.fieldApiName, type: 'address'},
    { label: 'User ID', fieldName: AccountId_FIELD.fieldApiName, type: 'lookup'},

];*/

//const FIELDS = ['Contact.FirstName', 'Contact.LastName', 'Contact.Email','Contact.MobilePhone','Contact.MailingAddress','Contact.AccountID'];

export default class PrimerLWC extends LightningElement {
    @api recordId;
    contact;
    email;
    id;
    nombre;
    apellido;
    telefono;
    direccion;
    nivel;

    @wire(contactQuery, { contactId: '$recordId'})
    wiredContact({error,data}){
        if(data){
            this.contact = data;
            this.nombre = this.contact.FirstName;
            this.apellido = this.contact.LastName;
            this.telefono = this.contact.MobilePhone;
            this.email = this.contact.Email;
            this.id = this.contact.Id;
            this.direccion = this.contact.MailingAddress.street;
            console.log(data);
        }else if(error){
            console.log("error buscando usuario")
        }
    }
    valor = 50
    gasto = "1000$"
    engagement = 75
    
    get progressStyle() {
        const circumference = 314; // Circunferencia de un círculo con radio 50
        const dashOffset = circumference * (1 - this.engagement / 100);
        return `stroke-dashoffset: ${dashOffset};`;
    }
}