<?php

require_once $_SERVER['DOCUMENT_ROOT'].'/usbank-member-web/server/includes/master.php';
require_once BASE_WEB_DIR.'/interfaces/InterfaceLmp.php';
include WEB_DIR.'/server/classes/PhotoContestTools.php';

global $LMP_ADMIN_HEADER;
$url = URL_LMP."api/v2/custom/photoSubmissionDashboard?api_key=".API_KEY."&count=100&contestMonth=".$post['mY'];
$response = (new InterfaceLmp())->get($url, $LMP_ADMIN_HEADER, 'ALL_PHOTOS');

echo json_encode($response);