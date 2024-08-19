public with sharing class EngagementScoreController {
  @AuraEnabled(cacheable=true)
  public static Object getCalculatedInsightData() {

    String ciName = 'TASA_DE_ENGAGE_COMUNICACIONES_ADIF__cio';
    String dimensions = null; 
    String measures= 'email_conversion__c';
    String orderby = null; 
    String filters = '[customer_id__c=7695eb78406ae434bca4b42c2800f4a7]'; 
    Integer batchSize = 100; 
    Integer offset = null;

    ConnectApi.CdpQueryOutput output = ConnectApi.CdpQuery.queryCalculatedInsights( ciName,  dimensions, 
     measures,  orderby,  filters,  batchSize,  offset);

    return output.data[0];
  }
}