<?php
require_once("dbconnect.php");
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

    $data = file_get_contents("php://input");

    if (isset($data)) {

        $request = json_decode($data);

        $email = $request->email;

        $password = $request->password;

    }

      $email= mysqli_real_escape_string($con, $email);

      $password = mysqli_real_escape_string($con,$password);

      $email = stripslashes($email);

      $password = stripslashes($password);

    $sql = "SELECT * FROM users WHERE email = '$email'";

      $result = mysqli_query($con,$sql);

      $row = mysqli_fetch_array($result,MYSQLI_ASSOC);

      $count = mysqli_num_rows($result);

      if($count >0) {
          $hashedPasswordCheck = password_verify($password, $row["password"]);
          if($hashedPasswordCheck == false)
          {
             $response = "No matching password";
          }
          elseif($hashedPasswordCheck == true)
          {
              $response = 'Succesfully logged in!';
          }
      }

 echo json_encode($response);

?>