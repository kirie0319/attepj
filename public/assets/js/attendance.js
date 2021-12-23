'user strict';
{
  let startingTime;
  let refreshStartingTime;
  let timerId;
  let refreshTimerId;
  let elapsedTime = 0;
  let refreshElapsedTime = 0;
  let isRunnning = false;
  let refreshIsRunnning = false;
  let workingTime;
  let refreshTime;
  
  window.sessionStorage.setItem('attendanceStartStatus', true);
  window.sessionStorage.setItem('attendanceEndStatus', false);
  window.sessionStorage.setItem('refreshStartStatus', false);
  window.sessionStorage.setItem('refreshEndStatus', false);
  
  let attendanceStartStatus = window.sessionStorage.getItem('attendanceStartStatus');
  let attendanceEndStatus = window.sessionStorage.getItem('attendanceEndStatus');
  let refreshEndStatus = window.sessionStorage.getItem('refreshEndStatus');
  let refreshStartStatus = window.sessionStorage.getItem('refreshStartStatus');

  console.log(attendanceEndStatus);
  console.log(attendanceStartStatus);
  console.log(refreshStartStatus);
  console.log(refreshEndStatus);

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


  function setButtonStatus(start, stop, r_start, r_end) {
    attendanceStart.className = start ? 'active' : 'inactive';
    attendanceEnd.className = stop ? 'active' : 'inactive';
    refreshStart.className = r_start ? 'active' : 'inactive';
    refreshEnd.className = r_end ? 'active' : 'inactive';
  };

  setButtonStatus(attendanceStartStatus, attendanceEndStatus, refreshStartStatus, refreshEndStatus);

  function attendanceWork() {
    startingTime = new Date;
    updateAttendanceTime();
    setButtonStatus(false, true, true, false);
  }
  
  attendanceStart.addEventListener('click', () => {
    if (isRunnning) return;
    isRunnning = true;
    window.sessionStorage.removeItem('workingTime');
    attendanceWork();
  });

  attendanceEnd.addEventListener('click', () => {
    if (!isRunnning) return;
    isRunnning = false;
    elapsedTime += Date.now() - startingTime;
    clearTimeout(timerId);
    window.sessionStorage.setItem('workingTime', workingTime);
    let endingTime = new Date;
    formatTime(startingTime, start);
    formatTime(endingTime, end);
    formatDate(startingTime, date);
    attendanceTime.value = window.sessionStorage.getItem('workingTime');
    setButtonStatus(true, false, false, false);
  });
  
  refreshStart.addEventListener('click', () => {
    if (refreshIsRunnning) return;
    refreshIsRunnning = true;
    refreshStartingTime = new Date;
    updateRefreshTime();
    setButtonStatus(false, true, false, true);
  });
  
  refreshEnd.addEventListener('click', () => {
    if (!refreshIsRunnning) return;
    refreshIsRunnning = false;
    refreshElapsedTime += Date.now() - refreshStartingTime;
    clearTimeout(refreshTimerId);
    window.sessionStorage.setItem('refreshTime', refreshTime);
    refresh.value = window.sessionStorage.getItem('refreshTime');
    setButtonStatus(false, true, true, false);
    attendanceWork();
  });

  

  function updateAttendanceTime() {
    timerId = setTimeout(() => {
      let t = Date.now() - startingTime + elapsedTime;
      workingTime = t;
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
}