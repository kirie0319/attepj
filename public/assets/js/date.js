'use strict'
{

  let newDate = new Date();

  let when = document.getElementById('when');

  let previousDay = document.getElementById('previous_day');
  let nextDay = document.getElementById('next_day');

  function formatWhen(dt) {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    when.value = (y + '-' + m + '-' + d);
    when.innerText = (y + '-' + m + '-' + d);
  }

  previousDay.addEventListener('click', () => {
    newDate.setDate(newDate.getDate() - 1);
    formatWhen(newDate);
  });

  nextDay.addEventListener('click', () => {
    newDate.setDate(newDate.getDate() + 1);
    formatWhen(newDate);
  });

}