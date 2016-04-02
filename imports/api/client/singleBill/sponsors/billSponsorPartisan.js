Template.billSponsorPartisan.helpers({
    createSponsorPieGraph: function() {
        if(Session.get('currentBillSponsorPartisan')) {
            rawData = Session.get('currentBillSponsorPartisan').percentage;
            sponsorData = [];
            sponsorData.push({
                y: parseFloat(rawData.D),
                name: 'Democratic',
                color: '#232066'
                }, {
                y: parseFloat(rawData.R),
                name: 'Republican',
                color: '#E91D0E'
            });
            console.log(sponsorData);
            return {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                series: [{
                    type: 'pie',
                    data: sponsorData
                }],
                title: {
                    text: null
                },
                tooltip: {
                    formatter: function () {
                        console.log(this);
                        return this.y + "% " + this.key + " Sponsorship";
                    }
                }
            };
        }
    }
});

Template.billSponsorPartisan.helpers({
    getSponsorPartisan: function() {
        return Session.get('currentBillSponsorPartisan');
    }
});