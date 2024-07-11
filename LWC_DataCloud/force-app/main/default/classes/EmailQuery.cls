public with sharing class EmailQuery {
    @AuraEnabled(cacheable=true)
    public static ssot__EmailEngagement__dlm[] EmailQuery(String SourceRecordId) {
        return[
            SELECT ssot__IndividualId__c, ssot__Id__c, OpenCount__c, ClickCount__c, OpenDate__c, EventDateClick__c, ssot__EmailName__c
            FROM ssot__EmailEngagement__dlm
            WHERE SubscriberKey__c =: SourceRecordId 
            AND (OpenCount__c != 0 OR ClickCount__c != 0)
            AND ssot__EngagementDateTm__c != null
            ORDER BY ssot__Id__c, ssot__EngagementDateTm__c DESC
            LIMIT 3
        ];
    }
}