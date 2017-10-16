<?php
require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

// Start session
session_start();

// First we set need to autoload the TwitterOAuth class and the need Twitter application details. We will also construct a TwitterOAuth instance with the application consumer_key and consumer_secret.
// getenv gets a environment variable from APACHE virtual host config file
define('CONSUMER_KEY', getenv('CONSUMER_KEY'));
define('CONSUMER_SECRET', getenv('CONSUMER_SECRET'));
define('OAUTH_CALLBACK', "http://192.168.0.148/index.html");

// This is in case we are trying to log in but already have stored user token, check if we should re-get it (old/expired)
if(isset($_SESSION['access_token'])) {
    // Check if valid...
    $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['access_token']['oauth_token'], $_SESSION['access_token']['oauth_token_secret']);
    $user = $connection->get("account/verify_credentials");

    if ($connection->getLastHttpCode() != 200) {
        unset($_SESSION['access_token']);
        // Continue auth!
    } else {
        if(empty($user->errors)) {
            // Should be fine then, why are you trying to get auth?
            echo "";
            return;
        } else {
            unset($_SESSION['access_token']);
            // Continue auth!
        }
    }
}


$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);

$request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => OAUTH_CALLBACK));

if ($connection->getLastHttpCode() != 200) {
    echo "";
    return;
}

$_SESSION['oauth_token'] = $request_token["oauth_token"];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];


//Here we are building a URL the authorizing users must navigate to in their browser. It is to Twitter's authorize page where the list of permissions being granted is displayed along with allow/deny buttons.
// Changed to authenticate so it doesn't always ask if session var is lost but app permission has already been granted?
// Still seems to ask for it..
$url = $connection->url('oauth/authenticate', array('oauth_token' => $request_token['oauth_token']));

echo $url;

?>
