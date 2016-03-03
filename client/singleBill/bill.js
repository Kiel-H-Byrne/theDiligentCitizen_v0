Template.bill.helpers({
    currentBill: function() {
        return Session.get('currentBill');
    },
    getSponsorPartisan: function() {


        return Session.get('currentBillSponsorPartisan');
    },
    getPartyClass: function(partyNomer) {

        console.log(partyNomer);
        switch(partyNomer) {
            case 'D':
                return 'democratic-text';
                break;
            case 'R':
                return 'republican-text';
                break;
            default:
                return 'could-not-identify'
        }
    }
});

