<!doctype html>
<html class="no-js" lang="de">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>{% if pagetitle %}{{ pagetitle }}{% else %}%%project%%{% endif %}</title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="apple-touch-icon" href="apple-touch-icon.png">

		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">

		<script>
			var html = document.querySelector('html');
			html.className = html.className.replace('no-js', '');
		</script>
		<link rel="stylesheet" href="%%public%%/css/main.css">
		<script async src="%%public%%/js/main.js"></script>
	</head>
