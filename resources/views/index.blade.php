<!-- 打刻ページ -->

@extends('layouts.default')
@section('content')
@if (Auth::check())
  <h2 class="attendance-title">{{$user->name}}さんお疲れ様です！</h2>
  <div class="attendance-container">
    <div class="attendance-card">
      <button type="submit" id="attendance-start" class="attendance-txt">勤務開始</button>
    </div>
    <div class="attendance-card right">
      <form action="/attendance_finish" method="POST">
        @csrf
        <input type="hidden" name="user_id" value="{{$user->id}}">
        <input id="start_time" type="hidden" name="start_time" value="">
        <input id="date" type="hidden" name="date" value="">
        <input id="end_time" type="hidden" name="end_time" value="">
        <input id='attendance_time' type="hidden" name="attendance_time" value="0">
        <input id="refresh_time" type="hidden" name="refresh_time" value="0">
        <button type="submit" id="attendance-end" class="attendance-txt">勤務終了</button>
      </form>
    </div>
  </div>
  <div class="attendance-container">
    <div class="attendance-card">
      <button class="attendance-txt" id="refresh-start">休憩開始</button>
    </div>
    <div class="attendance-card right">
      <button id="refresh-end" class="attendance-txt">休憩終了</button>
    </div>
  </div>
<script src="{{ asset('/assets/js/attendance.js') }}"></script>
@endif
@endsection