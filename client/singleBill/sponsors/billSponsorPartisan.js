Template.billSponsorPartisan.helpers({
    getSponsorPartisan: function() {
        return Session.get('currentBillSponsorPartisan');
    },
    createSponsorPieGraph: function() {



        // Get the data

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


            // Use Meteor.defer() to craete chart after DOM is ready:
            Meteor.defer(function () {


                // Create standard Highcharts chart with options:
                Highcharts.chart('sponsorPieGraphContainer', {

                    series: [{
                        type: 'pie',
                        data: sponsorData
                    }],
                    height: 250,
                    width: 250,
                    plotBackgroundColor: null,
                    title: {
                        text: null
                    },
                    tooltip: {
                        formatter: function () {
                            console.log(this);
                            return this.y + "% " + this.key + " Sponsorship";
                        }
                    }
                });


            });
        }
    }
});