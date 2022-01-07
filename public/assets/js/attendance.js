'user strict';
{
  let startingTime;
  let refreshStartingTime;
  let timerId;
  let refreshTimerId;
  let elapsedTime = 0;
  let refreshElapsedTime = 0;
  let workingTime;
  let refreshTime;
  
  let nDate;

  let attendanceStartStatus = window.sessionStorage.getItem('attendanceStartStatus');
  let attendanceEndStatus = window.sessionStorage.getItem('attendanceEndStatus');
  let refreshStartStatus = window.sessionStorage.getItem('refreshStartStatus');
  let refreshEndStatus = window.sessionStorage.getItem('refreshEndStatus');
  
  let attendanceStart = document.getElementById('attendance-start');
  let attendanceEnd = document.getElementById('attendance-end');
  let date = document.getElementById('date');
  let refreshStart = document.getElementById('refresh-start');
  let refreshEnd = document.getElementById('refresh-end');
  let start = document.getElementById('start_time');
  let end = document.getElementById('end_time');
  let refresh = document.getElementById('refresh_time');
  let attendanceTime = document.getElementById('attendance_time');
  
  function formatDate(dt, text) {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    text.value = (y + '-' + m + '-' + d);
  }
  
  function formatTime(time, text) {
    let h = time.getHours();
    let i = ('00' + (time.getMinutes())).slice(-2);
    let s = ('00' + (time.getSeconds())).slice(-2);
    text.value = (h + ':' + i + ':' + s);
  }

  function setButtonStatus(btn, status) {
    if (status === 'active') {
      btn.classList.remove('inactive');
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
      btn.classList.add('inactive');
    }
  }
  
  setButtonStatus(attendanceStart, attendanceStartStatus);
  setButtonStatus(attendanceEnd, attendanceEndStatus);
  setButtonStatus(refreshStart, refreshStartStatus);
  setButtonStatus(refreshEnd, refreshEndStatus);
  
  attendanceStart.addEventListener('click', () => {
    if (attendanceStartStatus === 'active') {
      window.sessionStorage.removeItem('attendanceStartStatus');
      window.sessionStorage.removeItem('attendanceEndStatus');
      window.sessionStorage.removeItem('refreshStartStatus');
      window.sessionStorage.setItem('attendanceStartStatus', 'inactive');
      window.sessionStorage.setItem('attendanceEndStatus', 'active');
      window.sessionStorage.setItem('refreshStartStatus', 'active');
      attendanceStartStatus = window.sessionStorage.getItem('attendanceStartStatus');
      attendanceEndStatus = window.sessionStorage.getItem('attendanceEndStatus');
      refreshStartStatus = window.sessionStorage.getItem('refreshStartStatus');
      refreshEndStatus = window.sessionStorage.getItem('refreshEndStatus');
      setButtonStatus(attendanceStart, attendanceStartStatus);
      setButtonStatus(attendanceEnd, attendanceEndStatus);
      setButtonStatus(refreshStart, refreshStartStatus);
      setButtonStatus(refreshEnd, refreshEndStatus);
      startingTime = new Date;
      updateAttendanceTime();
    } else {
      return;
    }
    
  });
  
  attendanceEnd.addEventListener('click', () => {
    if (attendanceEndStatus === 'active') {
      if (refreshTime) {
        let totalWork = workingTime - refreshTime;
        attendanceTime.value = totalWork;
      } else {
        attendanceTime.value = workingTime;
      }
      elapsedTime += Date.now() - startingTime;
      clearTimeout(timerId);
      let endingTime = new Date;
      formatTime(startingTime, start);
      formatTime(endingTime, end);
      formatDate(startingTime, date);
      window.sessionStorage.removeItem('attendanceStartStatus');
      window.sessionStorage.removeItem('attendanceEndStatus');
      window.sessionStorage.removeItem('refreshStartStatus');
      window.sessionStorage.removeItem('refreshEndStatus');
      window.sessionStorage.setItem('attendanceStartStatus', 'active');
      window.sessionStorage.setItem('attendanceEndStatus', 'inactive');
      window.sessionStorage.setItem('refreshStartStatus', 'inactive');
      window.sessionStorage.setItem('refreshEndStatus', 'inactive');
      attendanceStartStatus = window.sessionStorage.getItem('attendanceStartStatus');
      attendanceEndStatus = window.sessionStorage.getItem('attendanceEndStatus');
      refreshStartStatus = window.sessionStorage.getItem('refreshStartStatus');
      refreshEndStatus = window.sessionStorage.getItem('refreshEndStatus');
      setButtonStatus(attendanceStart, attendanceStartStatus);
      setButtonStatus(attendanceEnd, attendanceEndStatus);
      setButtonStatus(refreshStart, refreshStartStatus);
      setButtonStatus(refreshEnd, refreshEndStatus);
    } else {
      return;
    }
  });
  
  refreshStart.addEventListener('click', () => {
    if (refreshStartStatus === 'active') {
      refreshStartingTime = new Date;
      updateRefreshTime();
      window.sessionStorage.removeItem('attendanceStartStatus');
      window.sessionStorage.removeItem('attendanceEndStatus');
      window.sessionStorage.removeItem('refreshStartStatus');
      window.sessionStorage.removeItem('refreshEndStatus');
      window.sessionStorage.setItem('attendanceStartStatus', 'inacitve');
      window.sessionStorage.setItem('attendanceEndStatus', 'active');
      window.sessionStorage.setItem('refreshStartStatus', 'inactive');
      window.sessionStorage.setItem('refreshEndStatus', 'active');
      attendanceStartStatus = window.sessionStorage.getItem('attendanceStartStatus');
      attendanceEndStatus = window.sessionStorage.getItem('attendanceEndStatus');
      refreshStartStatus = window.sessionStorage.getItem('refreshStartStatus');
      refreshEndStatus = window.sessionStorage.getItem('refreshEndStatus');
      setButtonStatus(attendanceStart, attendanceStartStatus);
      setButtonStatus(attendanceEnd, attendanceEndStatus);
      setButtonStatus(refreshStart, refreshStartStatus);
      setButtonStatus(refreshEnd, refreshEndStatus);
    } else {
      return;
    }
  });
  
  refreshEnd.addEventListener('click', () => {
    if (refreshEndStatus === 'active') {
      refreshElapsedTime += Date.now() - refreshStartingTime;
      clearTimeout(refreshTimerId);
      window.sessionStorage.setItem('refreshTime', refreshTime);
      refresh.value = window.sessionStorage.getItem('refreshTime');
      window.sessionStorage.removeItem('attendanceStartStatus');
      window.sessionStorage.removeItem('attendanceEndStatus');
      window.sessionStorage.removeItem('refreshStartStatus');
      window.sessionStorage.removeItem('refreshEndStatus');
      window.sessionStorage.setItem('attendanceStartStatus', 'inacitve');
      window.sessionStorage.setItem('attendanceEndStatus', 'active');
      window.sessionStorage.setItem('refreshStartStatus', 'active');
      window.sessionStorage.setItem('refreshEndStatus', 'inactive');
      attendanceStartStatus = window.sessionStorage.getItem('attendanceStartStatus');
      attendanceEndStatus = window.sessionStorage.getItem('attendanceEndStatus');
      refreshStartStatus = window.sessionStorage.getItem('refreshStartStatus');
      refreshEndStatus = window.sessionStorage.getItem('refreshEndStatus');
      setButtonStatus(attendanceStart, attendanceStartStatus);
      setButtonStatus(attendanceEnd, attendanceEndStatus);
      setButtonStatus(refreshStart, refreshStartStatus);
      setButtonStatus(refreshEnd, refreshEndStatus);
      updateAttendanceTime();
    } else {
      return;
    }
  });

  

  function updateAttendanceTime() {
    timerId = setTimeout(() => {
      let t = Date.now() - startingTime + elapsedTime;
      window.sessionStorage.setItem('workingTime', t);
      workingTime = window.sessionStorage.getItem('workingTime');
      updateAttendanceTime();
    }, 10);
  }

  function updateRefreshTime() {
    refreshTimerId = setTimeout(() => {
      let t = Date.now() - refreshStartingTime + refreshElapsedTime;
      refreshTime = t;
      updateRefreshTime();
    }, 10);
  }

  function check() {
    let pDate = startingTime.getDate();
    nDate = new Date().getDate();
    if (pDate != nDate) {
      window.sessionStorage.removeItem('workingTime');
      window.sessionStorage.removeItem('refreshTime');
      window.sessionStorage.removeItem('attendanceStartStatus');
      window.sessionStorage.removeItem('attendanceEndStatus');
      window.sessionStorage.removeItem('refreshStartStatus');
      window.sessionStorage.removeItem('refreshEndStatus');
      window.sessionStorage.setItem('attendanceStartStatus', 'active');
      window.sessionStorage.setItem('attendanceEndStatus', 'inactive');
      window.sessionStorage.setItem('refreshStartStatus', 'inactive');
      window.sessionStorage.setItem('refreshEndStatus', 'inactive');
      attendanceStartStatus = window.sessionStorage.getItem('attendanceStartStatus');
      attendanceEndStatus = window.sessionStorage.getItem('attendanceEndStatus');
      refreshStartStatus = window.sessionStorage.getItem('refreshStartStatus');
      refreshEndStatus = window.sessionStorage.getItem('refreshEndStatus');
      setButtonStatus(attendanceStart, attendanceStartStatus);
      setButtonStatus(attendanceEnd, attendanceEndStatus);
      setButtonStatus(refreshStart, refreshStartStatus);
      setButtonStatus(refreshEnd, refreshEndStatus);
    } else {
      console.log('test2');
    }
  }

  setInterval(check, 1000);
}