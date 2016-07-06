<?php require_once $_SERVER['DOCUMENT_ROOT'].'/usbank-member-web/server/includes/master.php'; ?>

<title>USBank FlexPerks</title>
<meta charset="utf-8">
<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex" />

<link rel="apple-touch-icon" sizes="57x57" href="/web/assets/favicons/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/web/assets/favicons/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/web/assets/favicons/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/web/assets/favicons/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/web/assets/favicons/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/web/assets/favicons/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/web/assets/favicons/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/web/assets/favicons/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/web/assets/favicons/apple-touch-icon-180x180.png">
<link rel="icon" type="image/png" href="/web/assets/favicons/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="/web/assets/favicons/favicon-194x194.png" sizes="194x194">
<link rel="icon" type="image/png" href="/web/assets/favicons/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="/web/assets/favicons/android-chrome-192x192.png" sizes="192x192">
<link rel="icon" type="image/png" href="/web/assets/favicons/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="/web/assets/favicons/manifest.json">
<link rel="mask-icon" href="/web/assets/favicons/safari-pinned-tab.svg" color="#c0143c">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="msapplication-TileImage" content="/web/assets/favicons/mstile-144x144.png">
<meta name="theme-color" content="#ffffff">

<!-- Facebook Open Graph Tags -->
<?php include_once WEB_DIR.'/server/includes/facebook-og-tags.php'?>

<!-- Base CSS -->
<!--<link href="<?php includeVersion('base/css/master.css'); ?>"  rel="stylesheet"/>-->

<!-- Application CSS - used for all of the public site -->
<link href="<?php includeVersion('dist/master.css'); ?>" media="all" rel="stylesheet" type="text/css" data-ng-if="!$root.isAdmin" />

<!-- Admin CSS - used for the admin site - lacks media queries -->
<link href="<?php includeVersion('dist/admin.css'); ?>" media="all" rel="stylesheet" type="text/css" data-ng-if="$root.isAdmin" />

<!-- Styleguide CSS -->
<!-- TODO: only should show up on styleguide view -->
<link rel="stylesheet" href="<?php includeVersion('dist/styleguide.css'); ?>" type="text/css">

<?php require_once WEB_DIR.'/server/includes/header-css.php'; ?>

<!-- JQuery CDN References -->
<script src="//code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.min.js" integrity="sha256-xNjb53/rY+WmG+4L6tTl9m6PpqknWZvRt0rO1SRnJzw=" crossorigin="anonymous"></script>

<!-- Angular and associated library CDN References -->

<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-route.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-animate.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-resource.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-sanitize.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-messages.min.js"></script>


<script src="<?php includeVersion('web/lib/JavascriptLoadImage/load-image.all.min.js'); ?>"></script>
<script src="<?php includeVersion('web/lib/Cropper/cropper.min.js'); ?>"></script>

<script src="<?php includeVersion('web/lib/moment/moment.min.js'); ?>"></script>
<script src="<?php includeVersion('web/lib/moment/moment-timezone.min.js'); ?>"></script>
<!--script src="<?php includeVersion('web/lib/moment/moment-timezone-with-data-2010-2020.min.js'); ?>"></script-->
<script src="<?php includeVersion('web/lib/moment/angular-moment.min.js'); ?>"></script>

<link rel="stylesheet" href="<?php includeVersion('web/lib/Cropper/cropper.min.css'); ?>" type="text/css" />
<script src="<?php includeVersion('web/lib/angular-filter/angular-filter.min.js'); ?>"></script>
<script src="<?php includeVersion('web/application.js'); ?>"></script>
<script src="https://maps.googleapis.com/maps/api/js"></script>
<script src="<?php includeVersion('web/lib/infobox.js'); ?>"></script>


<?php if (DEPLOYMENT < DeploymentMode::LIVE){ ?>
<script type="text/javascript" src="//nexus.ensighten.com/usbank/uat/Bootstrap.js"></script>
<?php } else { ?>
<script type="text/javascript" src="//nexus.ensighten.com/usbank/Bootstrap.js"></script>
<?php } 
require_once WEB_DIR.'/server/includes/header-js.php';

if (MINIFIED) { ?>
	<script src="<?php echo '/dist/master.min.js'; ?>"></script>

<?php } else { ?>
	<script src="<?php includeVersion('web/application.js'); ?>"></script>
	<?php require_once(BASE_WEB_DIR.'/includes/javascriptManager.php');
	JavascriptManager::getJSIncludes();
	?>

	<script src="<?php includeVersion('web/master.js'); ?>"></script>
	<script src="<?php includeVersion('web/home.js'); ?>"></script>
	<script src="<?php includeVersion('web/services/session-service.js'); ?>"></script>
	<script src="<?php includeVersion('web/services/image-service.js'); ?>"></script>
	<script src="<?php includeVersion('web/services/country-service.js'); ?>"></script>
	<script src="<?php includeVersion('web/services/state-service.js'); ?>"></script>
	<script src="<?php includeVersion('web/services/external-link-service.js'); ?>"></script>
	<script src="<?php includeVersion('web/services/photo-management-service.js'); ?>"></script>
	<script src="<?php includeVersion('web/services/youtube-service.js'); ?>"></script>
	<script src="<?php includeVersion('web/services/code-sets-service.js'); ?>"></script>
	<script src="<?php includeVersion('web/services/winner-service.js'); ?>"></script>

	<script src="<?php includeVersion('web/components/login/login-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/admin/login-controller-admin.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/interstitial/interstitial-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/photo-contest/contest-landing-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/photo-contest-popularity/contest-popularity-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/photo-contest-map/contest-map-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/photo-contest-destination/contest-destination-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/photo-contest-submissions/contest-my-submissions-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/photo-contest-winners/contest-winners-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/photo-contest-upload/photo-upload-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/photo-contest-single-photo/photo-detail-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/admin-dashboard/admin-dashboard-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/admin-search/admin-search-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/admin-submissions/admin-submissions-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/admin-photo-detail/admin-photo-detail-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/admin-winners-view/admin-viewwinners-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/admin-winners-select/admin-winners-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/terms-and-conditions/terms-and-conditions-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/promotions/promotions-list-controller.js'); ?>"></script>
	<script src="<?php includeVersion('web/components/promotions-details/promotion-detail-controller.js'); ?>"></script>
	
	<script src="<?php includeVersion('web/directives/template-directives.js'); ?>"></script>
	<script src="<?php includeVersion('web/directives/dynamic-directives.js'); ?>"></script>
	<script src="<?php includeVersion('web/directives/field-directives.js'); ?>"></script>
	
	<script src="<?php includeVersion('base/js/angular-directives/element-directives/extend-form-directive.js'); ?>"></script>
	<script src="<?php includeVersion('base/js/angular-directives/attribute-directives/placeholder-directive.js'); ?>"></script>
<?php }
