public with sharing class contactQuery {
    @AuraEnabled(cacheable=true)
    public static Contact contactQuery(Id contactId) {
        return [
            SELECT FirstName, LastName, Email, MobilePhone, MailingAddress, Id
            FROM Contact
            WHERE Id = :contactId
            WITH SECURITY_ENFORCED 
            LIMIT 1
        ];
    }
}