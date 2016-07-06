<?php
function includeVersion($fileName, $includeBuildVersion = true, $includeProtocol = false) {
	echo wrapVersion($fileName, $includeBuildVersion, $includeProtocol);
}

function getProtocol(){
	if (isset($_SERVER['HTTPS']) &&
			($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1) ||
			isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
			$_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
				$protocol = 'https://';
			}
			else {
				$protocol = 'http://';
			}
			return $protocol;
}

function wrapVersion($fileName, $includeBuildVersion ,$includeProtocol) {
    $host = HTTP_HOST;
    if((substr( $host, 0, 5 ) === "http:") || (substr( $host, 0, 6 ) === "https:")){
        $host = strstr($host, '//');
        if ($includeProtocol) {
        	$host = getProtocol().substr($host, 2);
        }
    };
	if (preg_match('/\?/', $fileName)) {
		return $includeBuildVersion ? $host.$fileName.'&'.BUILD_VERSION : $host.$fileName;
	} else {
		return $includeBuildVersion ? $host.$fileName.'?'.BUILD_VERSION : $host.$fileName;
	}
}
function includeImage($fileName) {
	echo wrapImage ( $fileName );
}
function wrapImage($fileName) {
	if (preg_match ( '/\?/', $fileName )) {
		return URL_IMAGE_SERVER . $fileName . '&' . BUILD_VERSION;
	} else {
		return URL_IMAGE_SERVER . $fileName . '?' . BUILD_VERSION;
	}
}