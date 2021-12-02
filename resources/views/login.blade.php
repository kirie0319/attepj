<!-- login page -->
@extends('layouts.default')
@section('content')
<div>
  <h2 class="login-title">ログイン</h2>
  <form action="/login" method="POST">
    @csrf
    <input class="login-input" type="email" name="email" :value="old('email)" placeholder="メールアドレス" required>
    <input class="login-input" type="password" name="password" placeholder="パスワード" required>
    <button class="login-button" type="submit">ログイン</button>
  </form>
  <p class="login-small">アカウントをお持ちではない方はこちらから</p>
  <a class="to-register" href="/register">会員登録</a>
</div>
@endsection