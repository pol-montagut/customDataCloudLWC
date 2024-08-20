public with sharing class ContactosQ {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactos() {
        return [
            SELECT Name
            FROM Contact 
            WITH SECURITY_ENFORCED
            ORDER BY LastModifiedDate DESC
            LIMIT 15
        ];
    }
}