$(document).ready(function() {

    $('#etsy-search').submit(function(e) {
        /* $('#BuySellStuff').click(function(e) {*/
        e.preventDefault();
        //$('#defaultSection').hide();
        // $('#catchUpSection').hide();
        // $('#youtubeSection').hide();
        // $('#openLibrarySection').hide();
        //  $('#coffeeOrderSection').hide();
        $('#buySellStuffSection').show();

        //getDataFromEtsyApi(displayEtsySearchData);

        // MY METHOD OF GETTING THE ETSY API AND DISPLAYING THE DATA ON THE UI
        api_key = '1cipizancxf5fiqfzb5eri7s';
        etsyURL = 'https://openapi.etsy.com/v2/listings/active.js?api_key=' + api_key
            //$('#etsy-images').empty();
        var viewOutput = '';
        var count = 0;
        $.ajax({
            dataType: 'jsonp',
            url: etsyURL,
            success: function(data) {
                console.log(data);
                if (data.count > 0) {
                    $.each(data, function(dataArrayKey, dataArrayValue) {

                        console.log(dataArrayKey);
                        if (dataArrayKey === 'results') {
                            if (count < dataArrayValue.length) {
                                viewOutput = '<li>';
                                viewOutput += '<p>' + dataArrayValue[count].title + '</p>';
                                viewOutput += '<p>' + dataArrayValue[count].price + dataArrayValue[0].currency_code + '</p>';
                                viewOutput += '<a href="' + dataArrayValue[count].url + '" target="_blank">';
                                viewOutput += dataArrayValue[count].description + '</a></li >';
                                // viewOutput += '<img src=' + dataArrayValue[0].Images[0].url_170x135 + '>' + '</img></a></li >';
                                console.log(viewOutput);

                                $('#etsy-images ul').append(viewOutput);
                                count++;

                            }

                        }

                        // console.log(dataArrayValue.length);
                        // console.log(dataArrayValue[0].currency_code);
                        // console.log(dataArrayValue[0].description);
                        // console.log(dataArrayValue[0].price);
                        // console.log(dataArrayValue[0].title);
                        // console.log(dataArrayValue[0].url);


                        // }




                        // }

                    });
                }

            }

        });

        $('#etsy-search').bind('submit', function() {
            api_key = '1cipizancxf5fiqfzb5eri7s';
            terms = $('#etsy-terms').val();
            etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=" +
                terms + "&limit=12&includes=Images:1&api_key=" + api_key;

            $('#etsy-images').empty();
            $('<p></p>').text('Searching for ' + terms).appendTo('#etsy-images');

            $.ajax({
                url: etsyURL,
                dataType: 'jsonp',
                success: function(data) {
                    if (data.ok) {
                        $('#etsy-images').empty();
                        if (data.count > 0) {
                            $.each(data.results, function(i, item) {
                                console.log('item is ' + item);
                                $("<img/>").attr("src", item.Images[0].url_170x135).appendTo("#etsy-images").wrap(
                                    "<a style='padding-left:1.8em' href='" + item.url + "'  target=_blank></a><p>" + item.title + "</p>"

                                );
                                if (i % 4 == 3) {
                                    $('<br/>').appendTo('#etsy-images');
                                    $('<br/>').appendTo('#etsy-images');
                                    $('<br/>').appendTo('#etsy-images');
                                    $('<br/>').appendTo('#etsy-images');
                                }
                            });
                        } else {
                            $('<p>No results.</p>').appendTo('#etsy-images');
                        }
                    } else {
                        $('#etsy-images').empty();
                        alert(data.error);
                    }
                }
            });

            return false;
        })

    });

});


var Etsy_BASE_URL = 'https://openapi.etsy.com/v2/listings/active';

var Youtube_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';


function getDataFromEtsyApi(callback) {
    var query = {
            type: 'GET',
            api_key: '1cipizancxf5fiqfzb5eri7s'

        }
        //console.log(query);
    $.getJSON(Etsy_BASE_URL, query, callback);
}

function displayEtsySearchData(data) {
    console.log(data);
}

function getDataFromApi(searchTerm, callback) {
    var query = {
            part: 'snippet',
            key: 'AIzaSyBrs3d2Mb41LMlxO-Va_lC02QZ7FM3vxv4',
            q: searchTerm,
            maxResults: 20,
            type: "video"
        }
        //console.log(query);
    $.getJSON(Youtube_BASE_URL, query, callback);
}





function displaySearchResults(videosArray) {

    $('.js-search-results ul').empty();
    var htmlOutput = '';
    console.log(videosArray);
    $.each(videosArray, function(videosArrayKey, videosArrayValue) {
        console.log(videosArrayValue.snippet.title);
        htmlOutput = '<li>';
        htmlOutput += '<p>' + videosArrayValue.snippet.title + '</p>';
        htmlOutput += '<a href="https://www.youtube.com/watch?v=' + videosArrayValue.id.videoId + '" target="_blank">';
        htmlOutput += '<img src=' + videosArrayValue.snippet.thumbnails.high.url + '>' + '</img></a></li >';
        console.log(videosArrayValue.snippet.thumbnails.high.url);
        $('.js-search-results ul').append(htmlOutput);

        //   var htmlOut1 = '<a href="https://www.youtube.com/watch?v=mEkVNXRZJQA" >herewlkejnlwejnflewf</a>'

        //   $('.js-search-results ul').append(htmlOut1);
    });

}
