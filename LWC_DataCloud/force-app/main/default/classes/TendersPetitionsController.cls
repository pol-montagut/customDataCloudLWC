public with sharing class TendersPetitionsController {
    @AuraEnabled(cacheable=true)
    public static Object getTendersPetitions() {
        String ciName = 'peticiones_de_licitaciones_ADIF__cio';
        String dimensions = null; 
        String measures= 'ActionCOUNT__c';
        String orderby = null; 
        String filters = '[UnifiedID__c=7695eb78406ae434bca4b42c2800f4a7]'; 
        Integer batchSize = 100; 
        Integer offset = null;
    
        ConnectApi.CdpQueryOutput output = ConnectApi.CdpQuery.queryCalculatedInsights( ciName,  dimensions, 
         measures,  orderby,  filters,  batchSize,  offset);
    
        return output.data[0];
    }
}