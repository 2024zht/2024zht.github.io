// 创建一个包含完整时间信息的 data 对象
const data = {
  year: 0,
  month: 0,
  day: 0,
  weekday: '',
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
  updateTime: function() {
    const now = new Date(); // 获取当前时间
    this.year = now.getFullYear();
    this.month = now.getMonth() + 1; // 月份从 0 开始，需要加 1
    this.day = now.getDate();
    this.weekday = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()]; // 获取星期
    this.hours = now.getHours();
    this.minutes = now.getMinutes();
    this.seconds = now.getSeconds();
    this.milliseconds = now.getMilliseconds(); // 获取毫秒
  },
  formatTime: function() {
    // 格式化时间为完整的时间字符串，精确到秒
    let timeString = `${this.year}年${this.month < 10 ? '0' + this.month : this.month}月${this.day < 10 ? '0' + this.day : this.day}日 ` +
           `${this.weekday} ` +
           `${this.hours < 10 ? '0' + this.hours : this.hours}:${this.minutes < 10 ? '0' + this.minutes : this.minutes}:${this.seconds < 10 ? '0' + this.seconds : this.seconds}`;

    // 如果分钟数为20或50，输出特定提示词
    if (this.minutes === 20) {
      timeString += "\n站起来活动一下！";
    } else if (this.minutes === 50) {
      timeString += "\n站起来活动一下！";
    }

    return timeString;
  }
};

// 每秒更新一次时间并显示
function updateClock() {
  data.updateTime(); // 更新时间
  document.getElementById('clock').textContent = data.formatTime(); // 更新时钟显示
}

// 初次加载时更新一次时钟
updateClock();
// 每秒更新时钟
setInterval(updateClock, 1000); // 以秒为单位更新