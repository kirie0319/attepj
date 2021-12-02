<!-- 打刻ページ -->

@extends('layouts.default')
@section('content')
@if (Auth::check())
  <h2 class="attendance-title">{{$user->name}}さんお疲れ様です！</h2>
  <div class="attendance-container">
    <div class="attendance-card">
      <p class="attendance-txt">勤務開始</p>
    </div>
    <div class="attendance-card right">
      <p class="attendance-txt">勤務終了</p>
    </div>
  </div>
  <div class="attendance-container">
    <div class="attendance-card">
      <p class="attendance-txt">休憩開始</p>
    </div>
    <div class="attendance-card right">
      <p class="attendance-txt">休憩終了</p>
    </div>
  </div>
@endif
@endsection