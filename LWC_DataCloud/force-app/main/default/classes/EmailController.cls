public with sharing class EmailController {
  @AuraEnabled(cacheable=true)
  public static ssot__EmailEngagement__dlm getEmail(String SourceRecordId) {
    return [
      SELECT ssot__IndividualId__c, ssot__EmailFromAddr__c
      FROM ssot__EmailEngagement__dlm
      WHERE ssot__IndividualId__c = :SourceRecordId
      LIMIT 1
    ];
  }
}