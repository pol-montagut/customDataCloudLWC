public with sharing class DCController {
  @AuraEnabled(cacheable=true)
  public static UnifiedssotIndividualMain__dlm getContData() {
    return [
      SELECT
        ssot__Id__c,
        Mobile_Phone__c,
        Billing_Street__c,
        Billing_Country__c,
        Billing_State_Province__c,
        ssot__FirstName__c,
        ssot__LastName__c,
        Age__c,
        Tipo_de_documento__c,
        Numero_de_documento__c,
        Empresa__c,
        ssot__BirthDate__c,
        Tipo_Cliente__c,
        Nationality__c,
        Producto_contratado__c,
        Interest__c,
        GDPR__c,
        ssot__GenderId__c
      FROM UnifiedssotIndividualMain__dlm
      WHERE ssot__Id__c = :'7695eb78406ae434bca4b42c2800f4a7'
      LIMIT 1
    ];
  }
}