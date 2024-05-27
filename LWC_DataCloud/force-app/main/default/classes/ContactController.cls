public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
            SELECT AccountId, FirstName, LastName, Email, 
            Phone, MailingStreet, Birthdate
            FROM Contact
            WITH SECURITY_ENFORCED
            ORDER BY FirstName
        ];
    }
}