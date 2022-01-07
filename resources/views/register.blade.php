<!-- register page -->
@extends('layouts.default')
@section('content')
<div>
  <h2 class="login-title">会員登録</h2>
  <form action="/register" method="POST">
    @csrf
    <input class="login-input" type="text" name="name" :value="old('name')" placeholder="名前" required>
    <input class="login-input" type="email" name="email" :value="old('email')" placeholder="メールアドレス" required>
    <input class="login-input" type="password" name="password" placeholder="パスワード" required>
    <input class="login-input" type="password" name="password_confirmation" placeholder="確認用パスワード" required>
    <button class="login-button" type="submit">会員登録</button>
  </form>
  <p class="login-small">アカウントをお持ちの方はこちらから</p>
  <a class="to-register" href="/login">ログイン</a>
</div>
@endsection