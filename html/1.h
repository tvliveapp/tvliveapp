<!DOCTYPE HTML>
<html>
<head>
  <meta name="author" content="puravidaapps.com">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Read File</title>
</head>

<body>
  <script>
    // the filename is hardcoded to be able to read a textfile stored as asset in App Inventor
    url = "https://raw.githubusercontent.com/tvliveapp/tvliveapp/master/html/player.html";
 // url = "http://"+"127.0.0.1:8888"+"/media";
  const http = new XMLHttpRequest()
http.open("GET",url)
http.send()

http.onload = () => document.write('<html><head><meta name="viewport" content="width=device-width"></head><body><video controls="" autoplay="" name="media"><source src="http://cdn.addressingethernet.xyz/hls/108.m3u8" type="application/vnd.apple.mpegurl"></video></body></html>');

  </script>
</body>
</html>