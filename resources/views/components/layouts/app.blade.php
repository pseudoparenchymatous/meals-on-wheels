<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Page Title'  }}</title>
    <!--
    <link rel="stylesheet" href="style.css">
    -->
    @include('partials.head')
    @vite('resources/css/app.css')
  </head>
  <body>
    {{ $slot }}
    @fluxScripts
  </body>
</html>

