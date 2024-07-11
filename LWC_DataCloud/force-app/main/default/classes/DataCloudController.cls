public with sharing class DataCloudController {
    @AuraEnabled(cacheable=true)
    public static UnifiedssotIndividualMain__dlm DataCloudController() {
        return[
            SELECT ssot__Id__c
            FROM UnifiedssotIndividualMain__dlm
            WHERE ssot__Id__c =: '160c986e85f320e37ba2806b030f07a1'
            LIMIT 1
        ];
    }
}



//7695eb78406ae434bca4b42c2800f4a7  --> Manuel Aneiros