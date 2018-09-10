<?php

define("HOST","109.201.137.134");

define("USER","gazohonlin_root");

define("PASS","bQ4YR4c5ro");

define("DB","gazohonlin_ionic");

$con = mysqli_connect(HOST,USER,PASS,DB);

if (!$con){

    die("Error in connection" . mysqli_connect_error()) ;

  }

?>