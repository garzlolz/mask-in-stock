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
var town = document.querySelector('#town');
var title = document.querySelector('.title');
citys.addEventListener('change',changelocal,false);


//取得資料
var result ;
var data;

function getdata(){
    var xhr = new XMLHttpRequest();
    xhr.open('get','https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json');
    xhr.send();
    xhr.onload = function(){
            document.querySelector('#loadingpic').style.display = 'none';
             data = JSON.parse(xhr.responseText);
             renderoption();
             result = data.features;
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
            
            j++;
            town.innerHTML = '';
        }

    }  
    town.innerHTML = `<option>一一一一一</option>` 
}
//顯示 第二個selector
function changelocal(){
    
    var str2 ='<option>請選擇行政區</option>';
        let temp = [];

        for(var i=0;i<data.features.length;i++){
            if(city.value == data.features[i].properties.county){
                temp.push(data.features[i].properties.town);
            }
            else{
                town.innerHTML =`<option>無此行政區</option>`
            }
        }
        var noreaptemp = temp.filter(function(element, index ,arr){
            return arr.indexOf(element) === index;
        });
        for(var i=0;i<noreaptemp.length;i++){
            str2+=`<option>${noreaptemp[i]}</option>`;
            town.innerHTML = str2;
        };
        town.addEventListener('change',changeList);
        
    }


    function changeList(){
        title.textContent = town.value;
        var str3 = ''
        for(var i=0;i<result.length;i++){
            if(citys.value == result[i].properties.county && town.value == result[i].properties.town){
                str3 += `<div data-index=${i}><div class = "storeName">${data.features[i].properties.name}</div>`+
                `<div class = adultMask>成人口罩數量: <span>${data.features[i].properties.mask_adult}</span></div><div>童口罩數量: <span>${data.features[i].properties.mask_child}</span></div>`+
                `<p class="address">完整地址:<a href="#">${result[i].properties.address}</span></a></div>`;

                list.innerHTML = str3 ;
            }
        }
    }
