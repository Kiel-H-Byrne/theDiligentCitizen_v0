(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/methods.js                                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
abbr_State = function (name, to) {                                     // 2
    var states = new Array({ 'name': 'Alabama', 'abbrev': 'AL' }, { 'name': 'Alaska', 'abbrev': 'AK' }, { 'name': 'Arizona', 'abbrev': 'AZ' }, { 'name': 'Arkansas', 'abbrev': 'AR' }, { 'name': 'California', 'abbrev': 'CA' }, { 'name': 'Colorado', 'abbrev': 'CO' }, { 'name': 'Connecticut', 'abbrev': 'CT' }, { 'name': 'Delaware', 'abbrev': 'DE' }, { 'name': 'Florida', 'abbrev': 'FL' }, { 'name': 'Georgia', 'abbrev': 'GA' }, { 'name': 'Hawaii', 'abbrev': 'HI' }, { 'name': 'Idaho', 'abbrev': 'ID' }, { 'name': 'Illinois', 'abbrev': 'IL' }, { 'name': 'Indiana', 'abbrev': 'IN' }, { 'name': 'Iowa', 'abbrev': 'IA' }, { 'name': 'Kansas', 'abbrev': 'KS' }, { 'name': 'Kentucky', 'abbrev': 'KY' }, { 'name': 'Louisiana', 'abbrev': 'LA' }, { 'name': 'Maine', 'abbrev': 'ME' }, { 'name': 'Maryland', 'abbrev': 'MD' }, { 'name': 'Massachusetts', 'abbrev': 'MA' }, { 'name': 'Michigan', 'abbrev': 'MI' }, { 'name': 'Minnesota', 'abbrev': 'MN' }, { 'name': 'Mississippi', 'abbrev': 'MS' }, { 'name': 'Missouri', 'abbrev': 'MO' }, { 'name': 'Montana', 'abbrev': 'MT' }, { 'name': 'Nebraska', 'abbrev': 'NE' }, { 'name': 'Nevada', 'abbrev': 'NV' }, { 'name': 'New Hampshire', 'abbrev': 'NH' }, { 'name': 'New Jersey', 'abbrev': 'NJ' }, { 'name': 'New Mexico', 'abbrev': 'NM' }, { 'name': 'New York', 'abbrev': 'NY' }, { 'name': 'North Carolina', 'abbrev': 'NC' }, { 'name': 'North Dakota', 'abbrev': 'ND' }, { 'name': 'Ohio', 'abbrev': 'OH' }, { 'name': 'Oklahoma', 'abbrev': 'OK' }, { 'name': 'Oregon', 'abbrev': 'OR' }, { 'name': 'Pennsylvania', 'abbrev': 'PA' }, { 'name': 'Rhode Island', 'abbrev': 'RI' }, { 'name': 'South Carolina', 'abbrev': 'SC' }, { 'name': 'South Dakota', 'abbrev': 'SD' }, { 'name': 'Tennessee', 'abbrev': 'TN' }, { 'name': 'Texas', 'abbrev': 'TX' }, { 'name': 'Utah', 'abbrev': 'UT' }, { 'name': 'Vermont', 'abbrev': 'VT' }, { 'name': 'Virginia', 'abbrev': 'VA' }, { 'name': 'Washington', 'abbrev': 'WA' }, { 'name': 'West Virginia', 'abbrev': 'WV' }, { 'name': 'Wisconsin', 'abbrev': 'WI' }, { 'name': 'Wyoming', 'abbrev': 'WY' }, { 'name': 'District of Columbia', 'abbrev': 'DC' });
    var name = name;                                                   // 22
    var to = to;                                                       // 23
    var returnthis = false;                                            // 24
    $.each(states, function (index, value) {                           // 25
        if (to == 'name') {                                            // 26
            if (value.abbrev == name) {                                // 27
                returnthis = value.name;                               // 28
                return false;                                          // 29
            }                                                          //
        } else if (to == 'abbrev') {                                   //
            if (value.name == name) {                                  // 32
                returnthis = value.abbrev;                             // 33
                return false;                                          // 34
            }                                                          //
        }                                                              //
    });                                                                //
    return returnthis;                                                 // 38
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);
