public with sharing class EmailQuery {
    @AuraEnabled(cacheable=true)
    public static ssot__EmailEngagement__dlm EmailQuery(String SourceRecordId) {
        return[
            SELECT ssot__IndividualId__c
            FROM ssot__EmailEngagement__dlm
            WHERE ssot__IndividualId__c =: SourceRecordId
            LIMIT 1
        ];
    }
}