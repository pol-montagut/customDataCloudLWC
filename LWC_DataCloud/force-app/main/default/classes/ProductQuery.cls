public with sharing class ProductQuery {
    @AuraEnabled(cacheable=true)
    public static ssot__ProductBrowseEngagement__dlm[] ProductQuery(String SourceRecordId) {
        return[
            SELECT ssot__IndividualId__c, ssot__EngagementChannelActionId__c, ssot__EngagementDateTm__c, ssot__Id__c
            FROM ssot__ProductBrowseEngagement__dlm
            WHERE ssot__IndividualId__c =: SourceRecordId
            AND ssot__EngagementChannelActionId__c != null
            AND ssot__EngagementDateTm__c != null
            ORDER BY ssot__EngagementDateTm__c DESC
            LIMIT 2
        ];
    }
}