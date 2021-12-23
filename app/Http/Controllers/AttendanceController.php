<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Attendance;
use App\Models\User;
use App\Models\Date;
use Illuminate\Support\Facades\Auth;

class AttendanceController extends Controller
{
    public function index()
    {
        $attendances = Attendance::paginate(5);
        $date = Carbon::today();
        $format = $date->format('Y-m-d');
        foreach($attendances as $attendance) {
        $user = User::where('id', $attendance->user_id)->first();
        $attendance->name = $user->name;
        $attendancetime = $attendance->attendance_time;
        $a_h = ($attendancetime / 1000 / 60 / 60 )%24;
        $a_m = ($attendancetime /1000/60)%60;
        $a_s = ($attendancetime /1000)%60;
        $a_time = $a_h.':'.$a_m.':'.$a_s;
        $attendance->a_time = $a_time;
        $refreshtime = $attendance->refresh_time;
        $r_h = ($refreshtime / 1000 / 60 / 60 )%24;
        $r_m = ($refreshtime /1000/60)%60;
        $r_s = ($refreshtime /1000)%60;
        $r_time = $r_h.':'.$r_m.':'.$r_s;
        $attendance->r_time = $r_time;
        }
        return view('attendance', ['attendances' => $attendances, 'date' => $date, 'format' => $format]);
    }

    public function attendance_finish(Request $request)
    {
        Attendance::create($request->all());
        return redirect('/');
    }

    public function previous(Request $request)
    {
        $attendances = Attendance::paginate(5);
        $date = new Carbon($request->when);
        $yesterday = $date->subDay();
        $format = $yesterday->format('Y-m-d');
        foreach($attendances as $attendance) {
        $user = User::where('id', $attendance->user_id)->first();
        $attendance->name = $user->name;
        $attendancetime = $attendance->attendance_time;
        $a_h = ($attendancetime / 1000 / 60 / 60 )%24;
        $a_m = ($attendancetime /1000/60)%60;
        $a_s = ($attendancetime /1000)%60;
        $a_time = $a_h.':'.$a_m.':'.$a_s;
        $attendance->a_time = $a_time;
        $refreshtime = $attendance->refresh_time;
        $r_h = ($refreshtime / 1000 / 60 / 60 )%24;
        $r_m = ($refreshtime /1000/60)%60;
        $r_s = ($refreshtime /1000)%60;
        $r_time = $r_h.':'.$r_m.':'.$r_s;
        $attendance->r_time = $r_time;
        }
        return view('attendance', ['attendances' => $attendances, 'date' => $yesterday, 'format' => $format]);
    }

    public function next(Request $request)
    {
        $attendances = Attendance::paginate(5);
        $date = new Carbon($request->when);
        $tomorrow = $date->addDay();
        $format = $tomorrow->format('Y-m-d');
        foreach($attendances as $attendance) {
        $user = User::where('id', $attendance->user_id)->first();
        $attendance->name = $user->name;
        $attendancetime = $attendance->attendance_time;
        $a_h = ($attendancetime / 1000 / 60 / 60 )%24;
        $a_m = ($attendancetime /1000/60)%60;
        $a_s = ($attendancetime /1000)%60;
        $a_time = $a_h.':'.$a_m.':'.$a_s;
        $attendance->a_time = $a_time;
        $refreshtime = $attendance->refresh_time;
        $r_h = ($refreshtime / 1000 / 60 / 60 )%24;
        $r_m = ($refreshtime /1000/60)%60;
        $r_s = ($refreshtime /1000)%60;
        $r_time = $r_h.':'.$r_m.':'.$r_s;
        $attendance->r_time = $r_time;
        }
        return view('attendance', ['attendances' => $attendances, 'date' => $tomorrow, 'format' => $format]);
    }
}
