import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { subscribe, unsubscribe, onError } from 'lightning/empApi';

export default class DisconnectionNotice extends LightningElement {    
    subscription = {};
    //tornei as variaveis reativas
    @track status;
    @track identifier;
    //instanciei o URI do evento
    channelName = '/event/Asset_Disconnection__e';

    
    connectedCallback() {
        this.handleSubscribe();
    }

    renderedCallback(){
        
    }

    //lógica de inscrição no evento
    handleSubscribe() {
        //Implement your subscribing solution here 
        
        const messageCallback = function (response) {
            console.log ('New message received: ', JSON.stringify(response));
            
            const assetId = message.data.payload.Asset_Identifier__c;
            const isDisconnected = message.data.payload.Disconnected__c;

            if (isDisconnected) {
                this.showSuccessToast(assetId);

            }else{
                this.showErrorToast();
            }
        };

        subscribe(this.channelName, -1, messageCallback).then((response) => {
            console.log('Subscription request sent to: ', JSON.stringify(response.channel));

        });

        subscribe(this.channelName, -1, this.messageCallback).then(response => {
            this.subscription = response;
            console.log('Subscribed to channel:', this.channelName);
        }).catch(error => {
            console.error('Subscription error:',error);
        });
        
    }

    //criei um handler para desinscrever
    handleUnsubscribed() {
        if(this.subscription){
            unsubscribe(this.subscription).then(() => {
                console.log('Unsubscribed from channel');
            })
            .catch(error => {
                console.error('Unsubscribed error:', error);
            });
        }
    }

    disconnectedCallback() {
        //Implement your unsubscribing solution here
        this.handleUnsubscribed;
    }

    showSuccessToast(assetId) {
        const event = new ShowToastEvent({
            title: 'Success',
            message: 'Asset Id '+assetId+' is now disconnected',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    showErrorToast() {
        const event = new ShowToastEvent({
            title: 'Error',
            message: 'Asset was not disconnected. Try Again.',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

}
