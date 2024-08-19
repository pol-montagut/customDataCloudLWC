import { LightningElement, wire } from "lwc";
import getContData from "@salesforce/apex/DCController.getContData";
import getLink from "@salesforce/apex/LinkController.getLink";
import getUserRol from "@salesforce/apex/UserRolCQuery.getUserRol";
//import getEmail from "@salesforce/apex/EmailController.getEmail";
import getCalculatedInsightData from "@salesforce/apex/EngagementScoreController.getCalculatedInsightData";
import getTendersAvg from "@salesforce/apex/TendersAvgController.getTendersAvg";
import getTendersPetitions from "@salesforce/apex/TendersPetitionsController.getTendersPetitions";

export default class contactCard extends LightningElement {
  contactData;
  clientData;
  Idn;
  Idcn;
  Idsn;
  Iden;
  IdLn;
  mobile;
  street;
  country;
  province;
  firstName;
  lastName;
  linkDatan;
  emailDatan;
  emailn;

  age;
  tipoDoc;
  numDoc;
  empresa;
  birthdate;
  clientType;
  nationality;
  productoContratado;
  interest;
  GDPR;
  gender;


  clientRol;
  rol;


  engagementScore;
  tendersAvg;
  tendersPetition;
  stats = [];



  @wire(getUserRol)
  wiredRol({ data }) {
    if (data) {
      this.clientRol = data;
      this.rol = this.clientRol.Name;
    }
    console.log("HOLAAAAAAAAAAAAAAAAAAAAAAA ",this.rol);
  }



  
  @wire(getContData)
  wiredContact({ data }) {
    if (data) {
      this.contactData = data;
      this.Idn = this.contactData.Id;
      this.Idcn = this.contactData.ssot__Id__c;
      this.mobile = this.contactData.Mobile_Phone__c;
      this.street = this.contactData.Billing_Street__c;
      this.country = this.contactData.Billing_Country__c;
      this.province = this.contactData.Billing_Country__c;
      this.firstName = this.contactData.ssot__FirstName__c;
      this.lastName = this.contactData.ssot__LastName__c;
      this.age = this.contactData.Age__c; 
      this.tipoDoc = this.contactData.Tipo_de_documento__c;
      this.numDoc = this.contactData.Numero_de_documento__c;
      this.empresa = this.contactData.Empresa__c;
      this.birthdate = (this.contactData.ssot__BirthDate__c).slice(0, 10);
      this.clientType = this.contactData.Tipo_Cliente__c;
      this.nationality = this.contactData.Nationality__c;
      this.productoContratado = this.contactData.Producto_contratado__c;
      this.interest = this.contactData.Interest__c;
      this.GDPR = this.contactData.GDPR__c;
      this.gender = this.contactData.ssot__GenderId__c;
    }
  }

  @wire(getLink, { ssot_Id: "$Idcn" })
  wiredLink({ data }) {
    if (data) {
      this.linkDatan = data;
      this.IdLn = this.linkDatan.UnifiedRecordId__c;
      this.Idsn = this.linkDatan.SourceRecordId__c;
    }
  }

  /*@wire(getEmail, { SourceRecordId: "$Idsn" })
  wiredEmail({ data }) {
    if (data) {
      this.emailDatan = data;
      this.Iden = this.emailData.ssot__IndividualId__c;
      this.emailn = this.emailData.ssot__EmailFromAddr__c;
    }
  }*/

  @wire(getCalculatedInsightData)
  wiredInsight({ data }) {
    if (data) {
      this.engagementScore = data.email_conversion__c * 100;
    } else {
      console.log("No hay datos");
    }
  }

  @wire(getTendersAvg)
  wiredTender({ data }) {
    if (data) {
      this.tendersAvg = data.promedio__c;
    } else {
      console.log("No hay datos");
    }
  }

  @wire(getTendersPetitions)
  wiredTenderPetition({ data }) {
    if (data) {
      this.tendersPetition = data.ActionCOUNT__c;
    } else {
      console.log("No hay datos");
    }
  }

  get dashOffset() {
    const percentage =
      this.engagementScore % 100 * 125.66;
      
    return percentage;
  }



}