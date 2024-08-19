public with sharing class UserRolCQuery {
    @AuraEnabled(cacheable=true)
    public static UserRole getUserRol() {
        return [
            SELECT Name
            FROM UserRole
            WHERE Id = :UserInfo.getUserRoleId()
        ];
    }
}