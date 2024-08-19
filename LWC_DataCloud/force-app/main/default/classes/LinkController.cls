public with sharing class LinkController {
  @AuraEnabled(cacheable=true)
  public static UnifiedLinkssotIndividualMain__dlm getLink(String ssot_Id) {
    return [
      SELECT UnifiedRecordId__c, SourceRecordId__c
      FROM UnifiedLinkssotIndividualMain__dlm
      WHERE UnifiedRecordId__c = :ssot_Id
      LIMIT 1
    ];
  }
}