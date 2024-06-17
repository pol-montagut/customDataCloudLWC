public with sharing class LinkQuery {
    @AuraEnabled(cacheable=true)
    public static UnifiedLinkssotIndividualMain__dlm LinkQuery(Id ssot_Id) {
            return[
                SELECT UnifiedRecordId__c, SourceRecordId__c
                FROM UnifiedLinkssotIndividualMain__dlm
                WHERE UnifiedRecordId__c =: ssot_Id
                LIMIT 1
            ];
    }
}
