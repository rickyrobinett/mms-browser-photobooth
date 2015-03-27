<?php
  require_once('twilio-php-master/Services/Twilio.php');

  define('UPLOAD_DIR', 'images/');

  $img = $_POST['image'];
  $img = str_replace('data:image/png;base64,', '', $img);
  $img = str_replace(' ', '+', $img);
  $data = base64_decode($img);

  $file = UPLOAD_DIR . uniqid() . '.png';
  $success = file_put_contents($file, $data);

  $url = 'http://yourdomain.com/' . $file;

  $AccountSid = "YOURTWILIOACCOUNTSID";
  $AuthToken = "YOURTWILIOAUTHTOKEN";

  $client = new Services_Twilio($AccountSid, $AuthToken);

  $sms = $client->account->messages->sendMessage(
      "+15555555555", // Your Twilio number
      $_POST['phoneNumber'],
      "When it's time to party we will party hard!",
      $url
  );

