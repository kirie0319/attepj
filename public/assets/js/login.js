'use strict'
{
  let loginBtn = document.getElementById('login-btn');
  loginBtn.addEventListener('click', () => {
    window.sessionStorage.setItem('attendanceStartStatus', 'active');
    window.sessionStorage.setItem('attendanceEndStatus', 'inactive');
    window.sessionStorage.setItem('refreshStartStatus', 'inactive');
    window.sessionStorage.setItem('refreshEndStatus', 'inactive');
    window.sessionStorage.removeItem('workingTime');
    window.sessionStorage.removeItem('refreshTime');
  });
}