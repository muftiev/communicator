$(window).load(function() {
    
    $("#send-message").keypress(function(event){
        if(event.charCode === 13 && !event.shiftKey) {
            $("#send-button").click();
            return false;
        }
    });

    $("#send-button").on("click", function(){
        var chatDiv = document.getElementById("team-chat");
        chatDiv.scrollTop = chatDiv.scrollHeight;
    });

    $(".account-block .account-button").on("click", function(){
        $(this).toggleClass("is-active");
    });

});