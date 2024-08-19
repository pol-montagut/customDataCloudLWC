public with sharing class TendersAvgController {
        @AuraEnabled(cacheable=true)
        public static Object getTendersAvg() {
      
          String ciName = 'Promedio_Licitaciones_ADIF_V2__cio';
          String dimensions = null; 
          String measures= 'promedio__c';
          String orderby = null; 
          String filters = '[Cliente__c=7695eb78406ae434bca4b42c2800f4a7]'; 
          Integer batchSize = 100; 
          Integer offset = null;
      
          ConnectApi.CdpQueryOutput output = ConnectApi.CdpQuery.queryCalculatedInsights( ciName,  dimensions, 
           measures,  orderby,  filters,  batchSize,  offset);
      
          return output.data[0];
        }
}