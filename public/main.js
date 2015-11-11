$(document).ready(function(){

    $('.buttons .btn').click(function(){
        $('#happiness-indicator').show();
    });

    $('#likeBtn').click(function(){
        $('#happiness-indicator').addClass('glyphicon-thumbs-up');
        $('#happiness-indicator').removeClass('glyphicon-thumbs-down');
    });

    $('#hateBtn').click(function(){
        $('#happiness-indicator').addClass('glyphicon-thumbs-down');
        $('#happiness-indicator').removeClass('glyphicon-thumbs-up');
    });

});