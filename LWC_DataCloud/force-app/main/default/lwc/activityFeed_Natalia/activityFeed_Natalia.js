import { LightningElement, api, wire, track } from 'lwc';
import DataCloudController from '@salesforce/apex/DataCloudController.DataCloudController';
import LinkQuery from '@salesforce/apex/LinkQuery.LinkQuery';
import EmailQuery from '@salesforce/apex/EmailQuery.EmailQuery';
import ProductQuery from '@salesforce/apex/ProductQuery.ProductQuery';

export default class ActivityFeed_Natalia extends LightningElement {
    @api recordId;
    contactData;
    clientData;
    Id;
    Idc;
    Ids = [];
    @track IdEE = [];
    @track IdPE = [];
    @track emailDataWithKeys = [];
    @track productDataWithKeys = [];
    linkData = [];
    emailData = [];
    productData;
    stats = [];
    allData = []; // Ensure allData is declared

    @wire(DataCloudController)
    wiredContact({data}) {
        if (data) {
            this.contactData = data;
            this.Id = this.contactData.Id;
            this.Idc = this.contactData.ssot__Id__c;
        }
    }

    @wire(LinkQuery, { ssot_Id: '$Idc'})
    wiredLink({error, data}) {
        if (data) {
            this.linkData = data;
            this.Ids = [];
            for (let i = 0; i < data.length; i++) {
                let element = this.linkData[i].SourceRecordId__c;
                console.log(element);
                if (!this.Ids.includes(element)) {
                    this.Ids.push(element);
                }
            }
            this.fetchEmails();
            this.fetchProducts();
        }
    }

    fetchEmails() {
        let tempIdEE = [];
        const promises = this.Ids.map(id => {
            return EmailQuery({ SourceRecordId: id })
                .then(result => {
                    result.forEach(record => {
                        let openDate = 'No date available';
                        if (record.OpenDate__c) {
                            const date = new Date(record.OpenDate__c);
                            if (!isNaN(date)) {
                                openDate = this.getRelativeTime(date);
                            }
                        }
                        let clicDate = 'No date available';
                        if (record.EventDateClick__c) {
                            const date = new Date(record.EventDateClick__c);
                            if (!isNaN(date)) {
                                clicDate = this.getRelativeTime(date);
                            }
                        }
                        const emailData = {
                            id: record.ssot__Id__c,
                            name: record.ssot__EmailName__c,
                            openCount: record.OpenCount__c,
                            clickCount: record.ClickCount__c,
                            openDate: openDate,
                            openTimestamp: record.OpenDate__c ? new Date(record.OpenDate__c).getTime() : null,
                            clicDate: clicDate,
                            clickTimestamp: record.EventDateClick__c ? new Date(record.EventDateClick__c).getTime() : null
                        };
                        tempIdEE.push(emailData);
                    });
                })
                .catch(error => {
                    console.error(`Error fetching emails for ${id}:`, error);
                });
        });

        Promise.all(promises)
            .then(() => {
                tempIdEE.sort((a, b) => {
                    const openDiff = (b.openTimestamp || 0) - (a.openTimestamp || 0);
                    const clickDiff = (b.clickTimestamp || 0) - (a.clickTimestamp || 0);
                    return openDiff !== 0 ? openDiff : clickDiff;
                });

                this.IdEE = tempIdEE;
                console.log('All emails fetched and sorted successfully:', this.IdEE);
                this.combineAndSortData();
            })
            .catch(error => {
                console.error('Error fetching emails:', error);
            });
    }

    fetchProducts() {
        let tempIdPE = [];
        const promises = this.Ids.map(id => {
            return ProductQuery({ SourceRecordId: id })
                .then(result => {
                    if (Array.isArray(result)) {
                        result.forEach(record => {
                            let productDate = 'No date available';
                            if (record.ssot__EngagementDateTm__c) {
                                const date = new Date(record.ssot__EngagementDateTm__c);
                                if (!isNaN(date)) {
                                    productDate = this.getRelativeTime(date);
                                }
                            }
                            const productData = {
                                id: record.ssot__Id__c,
                                individualId: record.ssot__IndividualId__c,
                                name: record.ssot__EngagementChannelActionId__c,
                                engagementDate: productDate,
                                engagementTimestamp: record.ssot__EngagementDateTm__c ? new Date(record.ssot__EngagementDateTm__c).getTime() : null
                            };
                            tempIdPE.push(productData);
                        });
                    }
                })
                .catch(error => {
                    console.error(`Error fetching products for ${id}:`, error);
                });
        });

        Promise.all(promises)
            .then(() => {
                tempIdPE.sort((a, b) => (b.engagementTimestamp || 0) - (a.engagementTimestamp || 0));
                this.IdPE = tempIdPE;
                console.log('All products fetched and sorted successfully:', this.IdPE);
                this.combineAndSortData();
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    combineAndSortData() {
        if (this.IdEE && this.IdPE) {
            const combinedData = [...this.IdEE, ...this.IdPE];
            combinedData.sort((a, b) => {
                const timestampA = a.engagementTimestamp || a.openTimestamp || 0;
                const timestampB = b.engagementTimestamp || b.openTimestamp || 0;
                return timestampB - timestampA;
            });

            this.allData = combinedData;
            console.log('All data combined and sorted successfully:', this.allData);
            this.updateComponent();
        }
    }

    updateComponent() {
        this.emailDataWithKeys = this.allData.filter(item => item.openTimestamp || item.clickTimestamp).map(email => ({
            ...email,
            openKey: `${email.id}-open`,
            clickKey: `${email.id}-click`
        }));

        this.productDataWithKeys = this.allData.filter(item => item.engagementTimestamp).map(product => ({
            ...product,
            productKey: `${product.id}-product`
        }));
    }

    getRelativeTime(date) {
        if (!(date instanceof Date) || isNaN(date)) {
            return 'Invalid date';
        }

        const now = new Date();
        const diff = now - date;

        if (diff > 365 * 24 * 60 * 60 * 1000) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

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
                        icon: `standard:${this.getIconName(item.title)}`,
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




/*   ICONS PERSONALIZADAS CODIGO


    get emailOpenIcon() {
        return this.icons['abrir-correo.png'] || '';
    }

    get clicIcon() {
        return this.icons['clic.png'] || '';
    }


        async loadIcons() {
        try {
            const response = await fetch(icons);
            if (!response.ok) {
                throw new Error('No s\'ha pogut carregar el fitxer JSON');
            }
            const data = await response.json();
            this.iconas = data;
        } catch (error) {
            console.error('Error al carregar les icones:', error);
        }
    }


    @track icons = {};

    async connectedCallback() {
        await this.loadIcons();
    }

    async loadIcons() {
        try {
            const response = await fetch(iconsUrl);
            if (!response.ok) {
                throw new Error('No s\'ha pogut carregar el fitxer ZIP');
            }
            const blob = await response.blob();
            const zip = await JSZip.loadAsync(blob);
            const iconFiles = Object.keys(zip.files);

            for (const fileName of iconFiles) {
                const file = zip.file(fileName);
                if (file) {
                    const content = await file.async('base64');
                    this.icons[fileName] = `data:image/png;base64,${content}`;
                }
            }
        } catch (error) {
            console.error('Error al carregar les icones:', error);
        }
    }

    //import DB from '@salesforce/resourceUrl/datos';
//import getContact from '@salesforce/apex/ContactController.getContacts';
//import JSZip from 'jszip';
//import icons from '@salesforce/resourceUrl/icons_activity_feed';
        //IdL = [];
    //Ide;
    //iconas;

    /*@wire(getContact, { contactId: '$recordId' })
    wiredContact({ data }) {
        if (data) {
            this.contactData = data;
            this.loadInfo();
        }
    }*/
