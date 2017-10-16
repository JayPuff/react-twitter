<?php
require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

session_start();

//First we set need to autoload the TwitterOAuth class and the need Twitter application details. We will also construct a TwitterOAuth instance with the application consumer_key and consumer_secret.
// getenv gets a environment variable from APACHE virtual host config file
define('CONSUMER_KEY', getenv('CONSUMER_KEY'));
define('CONSUMER_SECRET', getenv('CONSUMER_SECRET'));
define('OAUTH_CALLBACK', "http://192.168.0.148/index.html");

$request_token = [];
$request_token['oauth_token'] = $_SESSION['oauth_token'];
$request_token['oauth_token_secret'] = $_SESSION['oauth_token_secret'];

// Compare session token and secret with values on URL given by twitter when we return
if (isset($_REQUEST['oauth_token']) && $request_token['oauth_token'] !== $_REQUEST['oauth_token']) {
    // Abort! Something is wrong.
    echo "";
    return;
}

// Connection is now using twitter user key and secret!
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $request_token['oauth_token'], $request_token['oauth_token_secret']);

$access_token = $connection->oauth("oauth/access_token", ["oauth_verifier" => $_REQUEST['oauth_verifier']]);
// array(5) {
//     ["oauth_token"]=>
//     string(50) "3011233307-EFbGhAVEv4DV5n188lBw2ECBxhzyf4sh65Bph9W"
//     ["oauth_token_secret"]=>
//     string(45) "OPQpELTbq8ylR7f02hCdqHoXIclH5tlKuz4jWQ81yTFEJ"
//     ["user_id"]=>
//     string(10) "3011233307"
//     ["screen_name"]=>
//     string(8) "JPuffSSB"
//     ["x_auth_expires"]=>
//     string(1) "0"
//   }

// This is the important part where you save the credentials to your database of choice.

$_SESSION['access_token'] = $access_token;

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['access_token']['oauth_token'], $_SESSION['access_token']['oauth_token_secret']);
$user = $connection->get("account/verify_credentials");


$myJSON = json_encode($user);

echo $myJSON;
return;


?>
