public with sharing class DataCloudController {
    @AuraEnabled(cacheable=true)
    public static UnifiedssotIndividualMain__dlm DataCloudController() {
        return[
            SELECT ssot__Id__c
            FROM UnifiedssotIndividualMain__dlm
            WHERE ssot__Id__c =: '7695eb78406ae434bca4b42c2800f4a7'
            LIMIT 1
        ];
    }
}