public with sharing class DataCloudController {
    @AuraEnabled(cacheable=true)
    public static UnifiedssotIndividualMain__dlm DataCloudController() {
        return[
            SELECT ssot__Id__c
            FROM UnifiedssotIndividualMain__dlm
            LIMIT 1
        ];
    }
}