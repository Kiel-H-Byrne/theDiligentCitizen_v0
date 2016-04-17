/**
 * Created by terre on 4/1/2016.
 */



Template.NewsTicker.onRendered(function() {

    $("#bn1").on('updateTicker', function(){
        //console.log("updateTicker called");
        updateTicker();
    });

    //updateTicker();
    updateTicker();

});

updateTicker = function() {
    //var newTickerHandle = $('.newsticker');
    //newTickerHandle.easyTicker({
    //    direction: 'up',
    //    easing: 'swing',
    //    speed: 'slow',
    //    interval: 2000,
    //    height: 'auto',
    //    visible: 1,
    //    mousePause: 1,
    //    controls: {
    //        up: '',
    //        down: '',
    //        toggle: '',
    //        playText: 'Play',
    //        stopText: 'Stop'
    //    }
    //});
    //window.setTimeout(function(){
    //    $("ul#newsticker").liScroll();
    //}, 0);
    $("#bn1").breakingNews({
        width: '100%',
        color: 'black',
        border: true,
        effect: 'fade',
        fontstyle: 'normal',
        autoplay: true,
        timer: 8000,
        feed: false,
        feedlabels: false,
        feedcount: 5
    });
    var $newsItems = $("#bn1 li");

    $.each($newsItems, function(index, $newsItem){
        $($newsItem).popup({hoverable: true, popup: $("#popup-"+index)});
        //console.log("what's $newsItem ", $newsItem);
    });
};

var shorten = function(phrase, length){
    if(phrase.length > length) {
        phrase = phrase.substring(0, length - 3);
        phrase += '...';
    }

    return phrase;
};

Template.NewsTicker.helpers({
   newsItems: function() {
       //console.log("in newsItems");
       var items = [
           //{icon:"fa-newspaper-o", category:"NEWS",title:"This is the News story headline."},
           //{icon:"fa-video-camera", category:"VIDEO", title:"A Youtube video link goes here"},
           {icon:"", category:"NEWS", title:"A News story from CNN maybe"}
       ];

       var quotes = Session.get('quotes');
       if(!quotes)
       {
           quotes = ReactiveMethod.call('getNewsTickerFeed', "Barbara Mikulski");
          // console.log("found quotes", quotes);
           Session.set('quotes', quotes);

       }


       if(quotes) {
           id = 0;
           //console.log("these are the quotes on the client {}", quotes);
           //{
           //    "author": "Barbara Mikulski",
           //    "quote": "Barbara Mikulski said the goal now was to work out a broader spending plan for the rest of fiscal 2014 that would ease the impact of forced cuts to the military and other government programs.",
           //    "source": "http://edition.cnn.com/2013/09/27/politics/shutdown-showdown/index.html?eref=edition",
           //    "publishDate": "2013-09-27 00:00:00"
           //}
           quotes = quotes.map(function(quote) {
                                var newsTickerQuote = {
                                    id: id++,
                                    icon:"",
                                    category:"QUOTE",
                                    title: shorten(quote.quote, 85),
                                    link: quote.source,
                                    author: quote.author
                                };

                                return newsTickerQuote;
                           });
           //console.log("these are the quotes on the client after processing {}", quotes);

           for(var z = 0; z < 2; z++) {
               if(quotes[z]) {
                   items.push(quotes[z]);
               }
           }
       }

       //console.log("these are the items on the newsTicker {}", items);
       //console.log("attempting to fire updateTicker {}", $("#bn1"));
       $("#bn1").trigger('updateTicker');

       return quotes;
   }
});


