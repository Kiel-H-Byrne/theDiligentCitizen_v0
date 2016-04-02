console.log("routes.js");

Router.route('/', function(){
    this.layout('ApplicationLayout');

    this.render('PoliticalTree', {to: 'content'});
});

Router.route('/bill/:id', function() {
    var params = this.params;


    // legiscan call to get the bill
    //var legiScanResult = "http://api.legiscan.com/?key=APIKEY&op=getBill&state=MD&bill="+params.id;

    //{
    //    "status":"OK",
    //    "bill":{
    //    "bill_id":316708,
    //        "change_hash":"3bf478dea7dc2fa05d7f8c05e5c32abd",
    //        "session":{
    //        "session_id":82,
    //            "session_name":"2011-2012 Session"
    //    },
    //    "url":"http:\/\/legiscan.com\/CA\/bill\/AB1424\/2011",
    //        "state_link":"http:\/\/www.leginfo.ca.gov\/cgibin\/postquery?bill_number=ab_1424&sess=1112&house=A",
    //        "completed":1,
    //        "status":0,
    //        "progress":[],
    //        "state":"CA",
    //        "state_id":5,
    //        "bill_number":"AB1424",
    //        "bill_type":"B",
    //        "body":"A",
    //        "body_id":19,
    //        "current_body":"A",
    //        "current_body_id":19,
    //        "title":"Franchise Tax Board: delinquent tax debt.",
    //        "description":"An act to amend Sections 31 and 476 of, and to add Section 494.5 to, the Business
    //    and Professions Code, to add Section 12419.13 to the Government Code, to add Section 10295.4 to
    //    the Public Contract Code, to amend Sections 7063, 19195, and 19533 of, to add Sections 6835, 7057,
    //        7057.5, 19377.5, 19571, and 19572 to, to add Article 9 (commencing with Section 6850) to Chapter 6
    //    of Part 1 of Division 2 of, and to add Article 7 (commencing with Section 19291) to Chapter 5 of Part
    //    10.2 of Division 2 of, the Revenue and Taxation Code, and to add Section 34623.1 to the Vehicle
    //    Code, relating to taxation.",
    //    "committee":[],
    //        "history":[
    //        {
    //            "date":"2011-03-22",
    //            "action":"Read first time. To print. ",
    //            "chamber":"A",
    //            "chamber_id":19
    //        },
    //        ...
    //],
    //    "sponsors":[
    //        {
    //            "people_id":10971,
    //            "name":"Henry T. Perea",
    //            "role_id":1,
    //            "ftm_id":142104,
    //            "sponsor_type_id":0,
    //            "sponsor_order":0
    //        },
    //        ...
    //],
    //    "texts":[
    //        {
    //            "doc_id":265246,
    //            "date":"2011-03-22",
    //            "type":"Introduced",
    //            "mime":"text\/html",
    //            "url":"http:\/\/legiscan.com\/CA\/text\/AB1424\/id\/265246",
    //            "state_link":"http:\/\/www.leginfo.ca.gov\/pub\/11-12\/bill\/asm\/ab_1401-
    //            1450\/ab_1424_bill_20110322_introduced.html"
    //},
    //...
    //],
    //    "votes":[
    //        {
    //            "roll_call_id":76397,
    //            "date":"2011-05-02",
    //            "passed":1,
    //            "desc":"Do pass as amended and be re-referred to the Committee on \tAppropriations",
    //            "url":"http:\/\/legiscan.com\/CA\/rollcall\/AB1424\/id\/76397",
    //            "state_link":"http:\/\/www.leginfo.ca.gov\/pub\/11-12\/bill\/asm\/ab_1401-
    //            1450\/ab_1424_vote_20110502_000002_asm_comm.html"
    //},
    //...
    //],
    //}
    //}
    console.log("The params are {}", params);

    Meteor.call('legiScan', 'getBill','id=' + params.id, function(error, bill){
        console.log("the bill(#" + params.id + ") is ", bill);


        var i;
        var partyCount = {
            'D':0,
            'R': 0
        };
        if(bill) {
            Session.set('currentBill', bill);
            console.log(bill.bill.sponsors.length);
            for (i = 0; i < bill.bill.sponsors.length; i++) {
                //console.log(bill.bill.sponsors[i].party);
                partyCount[bill.bill.sponsors[i].party]++;
            }

            Session.set('currentBillSponsorPartisan', {
                partisan: partyCount.D > partyCount.R ? "Democratic" : "Republican",
                percentage: {
                    'D': ((partyCount.D / (partyCount.D + partyCount.R)) * 100).toFixed(2),
                    'R': ((partyCount.R / (partyCount.D + partyCount.R)) * 100).toFixed(2)
                },
                cssClass: partyCount.D > partyCount.R ? "democratic-text" : "republican-text"
            });

        }
        else if(error) {
            console.log("we have an error folks: "+error);
            console.log(error);
        }
    });


    this.render('bill');
});


Router.route('/representatives', function(){
    // use the template named ApplicationLayout for our layout
    this.layout('ApplicationLayout');

    this.render('myReps', {to: 'content'});
});

Router.route('/bills', function(){
    // use the template named ApplicationLayout for our layout
    this.layout('ApplicationLayout');

    this.render('legiScanResults', {to: 'content'});
});

Router.route('/public-opinion-polls', function(){
    // use the template named ApplicationLayout for our layout
    this.layout('ApplicationLayout');

    this.render('PublicOpinionPolls', {to: 'content'});
});

Router.route('/party', function() {
    this.render('party');
});

Router.route('/civics', function() {
    this.render('gCivic');
});

Router.route('/civic/:address', function() {
    var params = this.params;
    params.fields = "normalizedInput,offices,officials";
    delete params.query;
    delete params.hash;
    console.log("the params {} is", params);
    var urlParams = jQuery.param(params);
    console.log(urlParams.length);
    //TODO: fix jQuery.param, currently not converting object to parameters, 
    var method = "representatives";

    var res = ReactiveMethod.call('googleCivic', method, "address="+params.address);
    //console.log(res);
    Session.set('reps', res);
    this.render('gCivic');
});
/** Method '/elections'(view) only returns 3 results as of 3/2016: US(test), AZ, RI elections. 
Method '/voterinfo'(route) only pulls voter polls in the state of any 'elections'
**/

Router.route('/info/:address', function() {
    var params = this.params;
    params.fields = "normalizedInput,offices,officials";
    delete params.query;
    delete params.hash;
    console.log("the params {} is", params);
    var urlParams = jQuery.param(params);
    console.log(urlParams.length);
    //TODO: fix jQuery.param, currently not converting object to parameters, 
    var method = "voterinfo";

    var res = ReactiveMethod.call('googleCivic', method, "address="+params.address);
    //console.log(res);
    Session.set('vinfo', res);
    this.render('voters');
});






