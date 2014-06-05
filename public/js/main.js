$(window).load(function() {
    
    $("#send-message").keypress(function(event){
        if(event.charCode === 13 && !event.shiftKey) {
            $("#send-button").click();
            return false;
        }
    });

    $(".account-block .account-button").on("click", function(){
        $(this).toggleClass("is-active");
    });

    $("#get-previous").on("click", function(e){
        e.preventDefault();
        var period = $('#messages').attr('for-days');
        sendAjax(Number(period) + 1);
    });

    $(".menu-switcher").on("click", function(){
        $(this).parent().toggleClass("active");
        $(".header-container").toggleClass("active");
    });

});