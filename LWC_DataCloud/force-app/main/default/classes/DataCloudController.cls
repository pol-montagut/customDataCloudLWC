public with sharing class DataCloudController {
    @AuraEnabled(cacheable=true)
    public static UnifiedssotIndividualMain__dlm DataCloudController() {
        return[
            SELECT UnifiedssotIndividualMain__dlm.ssot__Id__c
            FROM UnifiedssotIndividualMain__dlm
            LIMIT 10
        ];
    }
}