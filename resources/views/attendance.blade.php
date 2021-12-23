<!-- 日付別勤怠ページ -->
@extends('layouts.default')
@section('content')
<div class="date_box">
  <form action="/attendance_previous" method="POST">
    @csrf
    <input type="hidden" name="when" value="{{$date}}">
    <button type="submit" id="previous_day" class="previous_day"><</button>
  </form>
  <h2 class="attendance_ttl">{{$format}}</h2>
  <form action="/attendance_next" method="POST">
    @csrf
    <input type="hidden" name="when" value="{{$date}}">
    <button type="submit" id="next_day" class="next_day">></button>
  </form>
</div>
<table class="attendance_table">
  <tr class="attendance_tr">
    <th class="attandance_tr-txt">名前</th>
    <th class="attandance_tr-txt">勤務開始</th>
    <th class="attandance_tr-txt">勤務終了</th>
    <th class="attandance_tr-txt">休憩時間</th>
    <th class="attandance_tr-txt">勤務時間</th>
  </tr>
  @foreach ($attendances as $attendance)
  @if($format === $attendance->date)
  <tr class="attendance_tr">
    <td class="attandance_tr-txt">{{$attendance->name}}</td>
    <td class="attandance_tr-txt">{{$attendance->start_time}}</td>
    <td class="attandance_tr-txt">{{$attendance->end_time}}</td>
    <td class="attandance_tr-txt">{{$attendance->r_time}}</td>
    <td class="attandance_tr-txt">{{$attendance->a_time}}</td>
  </tr>
  @endif
  @endforeach
</table>
{{$attendances->links('vendor.pagination.pagination_view')}}
@endsection