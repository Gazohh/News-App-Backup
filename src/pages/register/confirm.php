<?php
if (isset($_SERVER["HTTP_ORIGIN"])) {

    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");

    header("Access-Control-Allow-Credentials: true");

    header('Access-Control-Max-Age: 86400');    // cache for 1 day

}

// Access-Control headers are received during OPTIONS requests

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS')
{


    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))

        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))

        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);

}

if(!isset($_GET['email']) || !isset($_GET['token']))
{
    header("Location: https://www.axastudios.com");
    echo "Kaas";
    exit();
}
else{
    $con = new mysqli('localhost', 'gazohonlin_root', 'bQ4YR4c5ro', 'gazohonlin_ionic');
    $email = $con->real_escape_string($_GET["email"]);
    $token = $con->real_escape_string($_GET["token"]);

    $sql = $con->query("SELECT * FROM users WHERE email='$email' AND token='$token' AND emailVerified=0");
    if ($sql->num_rows > 0)
    {
        $con->query("UPDATE users SET emailVerified=1, token='' WHERE email=$email");
        header("Location: http://gazoh.net/confirmed.php?email=$email");
    }
}