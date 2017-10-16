<?php
require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

session_start();

if(isset($_SESSION['access_token'])) {
    define('CONSUMER_KEY', getenv('CONSUMER_KEY'));
    define('CONSUMER_SECRET', getenv('CONSUMER_SECRET'));

    $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['access_token']['oauth_token'], $_SESSION['access_token']['oauth_token_secret']);
    
    //Replace this by what I actually want? This counts towards API x/75
    //Could potentially store this and then:
    //Only fetch it if it has last been fectched
    $limits = $connection->get("application/rate_limit_status");


    if(isset($limits->{"resources"})) {
        if($limits->resources->account->{"/account/verify_credentials"}->remaining > 0) {
            $user = $connection->get("account/verify_credentials");
            $_SESSION['user'] = $user;
        } else {
            unset($_SESSION['user']);
        }
    } else {
        unset($_SESSION['user']);
    }


    if(isset($_SESSION['user'])) {
        $myJSON = json_encode($_SESSION['user']);
        
        echo $myJSON;
        return;
    } else {
        unset($_SESSION['access_token']);
        echo "";
        return;
    }
    
} else {
    echo "";
    return;
}

?>
