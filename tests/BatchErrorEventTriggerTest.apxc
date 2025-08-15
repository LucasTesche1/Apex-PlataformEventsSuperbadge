@isTest
public class BatchErrorEventTriggerTest implements Database.RaisesPlatformEvents {
    @testSetup
    static void setup(){
        List<Contact> pilots = new List<Contact>();
        
        for (Integer i = 0; i < 5; i++) {
            Contact pilot = new Contact(
            	FirstName = 'Test',
                LastName = 'Pilot' + i,
                Pilot_Rating__c = 3.0
                	
            );
            pilots.add(pilot);
            
        }
        insert pilots;
        
        //cria os dados para missions
      	
        List<Mission__c> missions = new List<Mission__c>();
        List<Mission__c> missions1 = new List<Mission__c>();
        
        for (Contact pilot : pilots) {
            Mission__c mission = new Mission__c(
            	Pilot__c = pilot.Id,
                Completion_Rating__c = 4.0,
                Overall_Rating__c = 5.0,
                Safety_Incidents__c = 1.0,
                Status__c = 'Complete',
                Subject__c = 'test'                
            );
            insert mission;           
        }
}
    
        @isTest
        static void testBacthApexErrorEventTrigger() {
            Test.startTest();
            
            Database.SaveResult sr = EventBus.publish(new BatchApexErrorEvent());
            //força o job a executar na hora
            Test.stopTest();
            
            Test.getEventBus().deliver();
            
            //verifica se os logs foram criados
            List<Error_log__c> errorLogs = [SELECT Id, Name, Async_Apex_Job_Id__c, Message__c FROM Error_Log__c];
            System.assertEquals(5, errorLogs.size(), 'Five error logs should be created. ');
        }
      
    }

