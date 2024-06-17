import { LightningElement, api, wire } from 'lwc';
//import DB from '@salesforce/resourceUrl/datos';
//import getContact from '@salesforce/apex/ContactController.getContacts';
import DataCloudController from '@salesforce/apex/DataCloudController.DataCloudController';
import LinkQuery from '@salesforce/apex/LinkQuery.LinkQuery';
import EmailQuery from '@salesforce/apex/EmailQuery.EmailQuery'


export default class ActivityFeed_Natalia extends LightningElement {
    @api recordId;
    contactData;
    clientData;
    Id;
    Idc;
    Ids;
    Ide;
    linkData;
    emailData;
    stats = [];

    /*@wire(getContact, { contactId: '$recordId' })
    wiredContact({ data }) {
        if (data) {
            this.contactData = data;
            this.loadInfo();
        }
    }*/
    @wire(DataCloudController)
    wiredContact({data,error}) {
        if (data) {
            this.contactData = data;
            this.Id = this.contactData.Id
            this.Idc = this.contactData.ssot__Id__c
            //this.loadInfo();
        }else if(error){ 
            console.log("no data")
        }
    }
    test;
    @wire(LinkQuery, { ssot_Id: '$Idc'})
    wiredContact({error,data}){
        if(data){
            this.linkData = data;
            this.Ids = this.linkData.SourceRecordId__c
        }
    }
    @wire(EmailQuery, {SourceRecordId: '$Ids'})
    wiredContact({error,data}){
        if(data){
            this.emailData = data;
            this.Ide = this.emailData.ssot__IndividualId__c
        }
    }
}
    /*
    async loadInfo() {
        try {
            const response = await fetch(DB);
            if (!response.ok) {
                throw new Error('No s\'ha pogut carregar el fitxer JSON');
            }
            const data = await response.json();
            const contactName = this.contactData.FirstName;
            if (data[contactName] && data[contactName].activities) {
                this.stats = data[contactName].activities.map((item, index) => {
                    const activityDate = this.parseDate(item.time);
                    return {
                        id: index,
                        icon: `standard:${this.getIconName(item.title)}`, // Ensure correct format
                        title: item.title,
                        subtitle: '',
                        details: item.text,
                        time: activityDate,
                        relativeTime: this.getRelativeTime(activityDate)
                    };
                });

                // Sort by time from newest to oldest
                this.stats.sort((a, b) => b.time - a.time);
            } else {
                console.error(`No s'han trobat dades per al contacte: ${contactName}`);
            }
        } catch (error) {
            console.error('Error al carregar les estadístiques:', error);
        }
    }

    parseDate(dateString) {
        return new Date(dateString);
    }

    getRelativeTime(date) {
        const now = new Date();
        const diff = now - date;
        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (years > 0) return rtf.format(-years, 'year');
        if (months > 0) return rtf.format(-months, 'month');
        if (weeks > 0) return rtf.format(-weeks, 'week');
        if (days > 0) return rtf.format(-days, 'day');
        if (hours > 0) return rtf.format(-hours, 'hour');
        if (minutes > 0) return rtf.format(-minutes, 'minute');
        return rtf.format(-seconds, 'second');
    }

    getIconName(type) {
        switch (type) {
            case 'Phone Call':
                return 'call';
            case 'Email Opened':
                return 'email';
            case 'Email Sent':
                return 'email';
            case 'Web Visit':
                return 'product';
            case 'Product Purchase':
                return 'orders';
            case 'Mobile App View':
                return 'app';
            default:
                return 'default';
        }
    }
}*/
