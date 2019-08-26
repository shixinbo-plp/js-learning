var nowDate = new Date();
var input = document.querySelectorAll('#fill_in input');
var target =document.querySelector('#target strong');
var go =document.querySelector('#go');
var wishDate = null;
var ps = document.querySelectorAll('#date p');
var timer = null;
var onOff = true;
var strong = document.querySelectorAll('p strong');
init();
function init() {
    input[0].value = nowDate.getFullYear();
    input[1].value = nowDate.getMonth()+1;
    input[2].value = nowDate.getDate();
    target.innerHTML = setFormat();
}
strong.innerHTML = input[0].value +'年'+input[1].value + '月'+ input[2].value+'日';
function setFormat () {
    var txt =  nowDate.getFullYear() + '年' + (nowDate.getMonth()+1) + '月' + nowDate.getDate() + '日';
    return txt
}
go.onclick = function () {
    if (!onOff){
        return;
    }
    onOff = false;
    var year = input[0].value;
    var month = input[1].value - 1;
    var day = input[2].value;

    wishDate = new Date(year, month, day);
     //得要目标时间和现在时间的毫秒差值
    timer = setInterval(function () {
        upDate();
    },1000);
    upDate();
};
function countDate(dis) {
    //console.log(dis);
    var timeArr = [];                       //将剩余的时间存放在数组中
    var oneDay = 1000 * 60 * 60 * 24;       //一天的毫秒
    var oneHour = 1000 * 60 * 60 ;          //一小时
    var oneMinute = 1000 * 60 ;             //一分钟
    var oneSecond = 1000 ;                  //一秒
    // console.log(dis / oneDay);
    timeArr[0] = parseInt(dis / oneDay);
    dis = dis % oneDay;
    timeArr[1] = parseInt(dis/oneHour);
    dis = dis % oneHour;
    timeArr[2] = parseInt(dis / oneMinute);
    dis = dis % oneMinute;
    timeArr[3] = parseInt(dis / oneSecond);

    for (var i = 0;i<timeArr.length; i++){
        timeArr[i] = fillZero(timeArr[i]);
    }
    console.log(timeArr);
    for (i = 0; i < timeArr.length; i++){       //给ps赋新值
        ps[i].innerHTML= timeArr[i];
    }
}
//补零
function fillZero(value) {
    var str = ''+value;         //隐式类型转换为字符串
    if (str.length<2){          //判断字符串的长度来补零
        str = '0'+ str;
    }
    return str;
}
function upDate() {
    nowDate = new Date();
    var dis = wishDate - nowDate;
    if (dis <= 0) {
        alert('当前输入时间不需要做倒计时');
        clearInterval(timer);
        onOff = true;
        return
    }
    countDate(dis);
}
