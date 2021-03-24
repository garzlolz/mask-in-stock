//取得時間
function renderDay(){
    var d  = new Date();
    var weekday =document.querySelector('.day');
    document.querySelector('.time').textContent = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
    document.querySelector('.announcement').textContent = '公告:自109 年12/31 起將由廠商統一包裝成10 片/包';
        switch (d.getDay()){
    case 1:
        weekday.textContent = '一';
        break;
    case 2:
        weekday.textContent = '二';
        break;
    case 3:
        weekday.textContent = '三';
        break;
    case 4:
        weekday.textContent = '四';
    case 5:
        weekday.textContent = '五';
    case 6:
        weekday.textContent = '六';
        break;
    default:
        weekday.textContent = '日';
        break;
        };
    }

//初始化
function init(){
    renderDay();
    getdata();
};
init();


var uptime= document.querySelector('.updatedtime');
var list = document.querySelector('.list');
var img = document.querySelector('#loadingpic');
var citys = document.querySelector('#city');
citys.addEventListener('change',changelocal,false);


//取得資料
var data;
function getdata(){
    var xhr = new XMLHttpRequest();
    xhr.open('get','https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json');
    xhr.send();
    xhr.onload = function(){
            document.querySelector('#loadingpic').style.display = 'none';
             data = JSON.parse(xhr.responseText);
             renderoption();
            
        };
    };

    

//顯示第一個selector
function renderoption(){
    var resault = data.features;
    uptime.textContent = resault[0].properties.updated;
    var str = '<option>請選擇縣市</option>';

    let temp = [];
    let j =0;

    for(var i=0;i<resault.length;i++){
        if(temp.indexOf(resault[i].properties.county)!=-1){
            continue;
        }
        else{
            temp.push(resault[i].properties.county)
            if(resault[i].properties.county == ''){
                temp.push(resault[i].properties.county)
                continue;
            }
            str+=` <option data-index='${j}' class="local">${resault[i].properties.county}</option>`;
            citys.innerHTML = str;
            j++
        }
    }  
  
}
//顯示 第二個selector
function changelocal(){
    
    var str2 ='<option>請選擇區域</option>';

        for(var i=0;i<data.features.length;i++){
            if(citys.value == data.features[i].properties.county){
                str2+=`<option>${data.features[i].properties.town}</option>`;
                document.querySelector('#town').innerHTML = str2;
            }
        }
    }


   /* var str = ''
    for(var i=0;i<data.features.length;i++){
     if(city.value == data.features[i].properties.county){
         str+=`<div data-index=${i}>${data.features[i].properties.name}</div>`+
              `<div class = mask>成人口罩數量: <span>${data.features[i].properties.mask_adult}</span>童口罩數量: <span>${data.features[i].properties.mask_child}</span></div>`
     }
     list.innerHTML = str;
 }
} */

