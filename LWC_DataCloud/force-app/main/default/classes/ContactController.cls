public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static Contact getContacts(Id contactId) {
        return [
            SELECT FirstName, LastName, Email , MobilePhone, MailingAddress, OtherAddress, AccountId
            FROM Contact
            WHERE Id = :contactId
            WITH SECURITY_ENFORCED
            LIMIT 1
        ];
    }
}
