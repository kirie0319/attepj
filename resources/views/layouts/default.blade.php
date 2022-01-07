<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atte</title>
  <link rel="stylesheet" href="{{asset('/assets/css/reset.css')}}">
  <link rel="stylesheet" href="{{asset('/assets/css/style.css')}}">
</head>
<body>
  <header class="header">
    <h1 class="header-title"><a href="/">Atte</a></h1>
    @if (Auth::check())
      <nav>
        <ul class="header-list">
          <li class="header-list-item"><a href="/">ホーム</a></li>
          <li class="header-list-item"><a href="/attendance">日付一覧</a></li>
          <li class="header-list-item"><a href="/logout">ログアウト</a></li>
        </ul>
      </nav>
    @endif
  </header>
  <main class="main">
    @yield('content')
  </main>
  <footer class="footer">
    <p class="copyright">Atte,inc.</p>
  </footer>
</body>
</html>