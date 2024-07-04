public with sharing class ProductQuery {
    @AuraEnabled(cacheable=true)
    public static ssot__ProductBrowseEngagement__dlm ProductQuery(String SourceRecordId) {
        return[
            SELECT ssot__IndividualId__c
            FROM ssot__ProductBrowseEngagement__dlm
            WHERE ssot__IndividualId__c =: SourceRecordId
            LIMIT 1
        ];
    }
}