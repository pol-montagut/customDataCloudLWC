public with sharing class DataCloudController {
    @AuraEnabled(cacheable=true)
    public static UnifiedssotIndividualMain__dlm DataCloudController() {
        return[
            SELECT ssot__Id__c
            FROM UnifiedssotIndividualMain__dlm
            WHERE ssot__Id__c =: '8d76731b52a4c64f9d89573c5d91931c'
            LIMIT 1
        ];
    }
}