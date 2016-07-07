<?php

require_once $_SERVER['DOCUMENT_ROOT'].'/rz-ng1-seed/server/classes/ExampleClass.php';

$talk = new ExampleClass('Hey! This is an example message.');

echo $talk->talk();