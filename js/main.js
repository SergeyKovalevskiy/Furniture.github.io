var cart = {}; /*Переменная для товара*/
var poisk = ""; /*Строка для поискового запроса*/
function init(){ /*Срабатывает при загрузке страницы*/
    //Загрузить товары
    $.getJSON("goods.json", goodsOut); /*Вытянуть товары из файла и применить goodsOut()*/
}

function goodsOut(data){ /*data - переданный параметр(массив товаров)*/
    //Вывести товары
    /*Выводит всё в консоль*/
    console.log(data); 
    /*Переменная для хранения структуры документа*/
    var out=''; 
    /*Для каждого товара из полученного массива*/
    for(var key in data){
        /*Открываем блок для товара с номером key*/
        out+='<div class="cart" data-description="'+data[key].order+'">';
        /*Заголовок блока(имя товара), переводится в верхний регистр*/
        out+='<p class="name">'+data[key].name.toUpperCase()+'</p>';
        /*изображение товара с авто-размерами*/
        out+='<img src="'+data[key].img+'" alt="" style="width: auto; height: 300px; max-width: 90%">';
        /*цена*/
        out+='<div class="cost">'+data[key].cost+'</div>';
        /*кнопка для добавления в корзину*/
        out+='<button class="add-to-cart" data-id="'+key+'">Добавить</button>';
        /*Ссылка на статью с полным описанием*/
        out+='<a href="view.php">';
        /*Кнопка размещена внутри ссылки чтобы та срабатывала по клику*/
        out+='<button class="desc-item" data-id="'+key+'">Описание</button>';
        out+='</a>';
        /*конец блока и шага в цикле*/
        out+='</div>';
    }
    /*Код в переменной out заносится в отдел для товара*/
    $('.goods-out').html(out);
    /*Обработчик для добавления в корзину*/
    $('.add-to-cart').on('click', addToCart);
    /*Обработчик для перехода к описанию*/
    $('.desc-item').on('click', descItem);
}

//Добавить товар в корзину
function addToCart(){     
    /*сохраняется id выбранного товара*/
    var id=$(this).attr('data-id');
    /*Вывод в консоль*/
    //console.log(id);
    /*Если товара с таким id нет*/
    if(cart[id]==undefined){
        /*он добавляется и колличество становится равно 1*/
        cart[id]=1;
    }
    else{
        /*Иначе увеличиваем его*/
        cart[id]++;
    }
    /*Показать корзину*/
    showMiniCart();
    /*Сохранить изменения*/
    saveCart();
    
}

/*Определяет, какой товар будет выгружен в новую страницу для описания*/
function descItem(){
    /*Из хранилища удаляется предыдущая метка "выбран"*/
    localStorage.removeItem('chosen');
    /*id товара сохраняется*/
    var id=$(this).attr('data-id');
    /*Товар отмечается в хранилище как выбранный*/
    localStorage.setItem('chosen', id); 
};

/*Сохраняет состояние корзины*/
function saveCart(){
    /*Превращаем переменную cart в строку и передаем в хранилище*/
    localStorage.setItem('cart', JSON.stringify(cart));
}

//Вывести мини-корзину
function showMiniCart(){
    /*Вытаскиваем из файла товары*/
    $.getJSON('goods.json',function(data){
        /*Сохраняем их в переменную*/
        var goods=data;
        /*Делаем переменную для добавляемого кода*/
        var out='';
        /*Два счетчика: кол-во товара и общая стоимость*/
    var counter=0;
    var summary=0;
    /*Для каждого ключа в корзине*/
    for(var key in cart){
        /*Увеличиваем кол-во соответствующей вещи*/
        counter+=cart[key];
        /*Множим его на цену и добавляем к стоимости*/
        summary+=goods[key].cost*cart[key];
    }
    /*Составляем текст мини-корзины*/
    out=counter+" товаров на сумму "+summary;
    /*Заносим его*/
    $('.mini-cart').html(out);
    //обновленную корзину
        if(!isEmpty(cart)){
            /*прячем если она пуста*/
            $(".cart-shape").hide();
        }
        /*иначе показываем*/
        else{$(".cart-shape").show();}
    });
    
}

//проверка на пустоту
function isEmpty(object){
    /*Для каждого ключа*/
    for(var key in object)
        /*Если он есть в объекте, вернуть правду*/
    if(object.hasOwnProperty(key)) return true;
    /*Если ни одного из ключей нет, вернуть ложь*/
    return false;
}

//восстановить корзину из хранилища при обновлении страницы
function loadCart(){
    /*Если в хранилище есть корзина*/
    if(localStorage.getItem('cart')){
        /*преобразуем из строки в массив и сохраняем в переменную*/
        cart=JSON.parse(localStorage.getItem('cart'));
        /*обновляем мини-корзину*/
        showMiniCart();
    }
};

//обработчик для кнопки при поисковой строке
$("#vvod").on("click", function(){
    /*переводим введенное значение в верхний регистр для сравнения и сохраняем*/
poisk=$("#text").val().toUpperCase();
/*прячем все товары*/
$("div.cart:not('.goods-out')").hide(); 
/*показываем лишь имеющие введенный текст в названии*/
$("div:not('.goods-out')").filter(":contains('"+poisk+"')").show(); 
/*выводим в консоль введенное значение(проверка)*/
console.log(poisk);
});

//функция сброса фильтров
$("#polish").on("click", function(){
    //присваиваем поисковому шаблону пустое значение
    $("#text").val("");
    //ищем товары, имеющие null(подойдут все)
    $("div.cart:not('.goods-out')").show(); 

    /*Меняем цвет вкладок(не исспользуется)*/
   /* $(".tab").css("background", "white"); //анимация вкладок
    $(".tab").css("color", "black");
    $('.tab').eq(0).css("background", "#9370DB");
    $('.tab').eq(0).css("color", "white");*/
})


//Запуск функций при загрузке/обновлении страницы
$(document).ready(function(){ 
    /*загружает товары*/
    init();
    /*загружает корзину*/
    loadCart();

    /*стартовый цвет вкладок(не используется)*/
  /*  $('.tab').eq(0).css("background", "#9370DB");
    $('.tab').eq(0).css("color", "white");*/

    //обработчик нажатия на вкладки
    $(".glass").on("click", function(){

        /*не используется*/
      /*  $(".tab").css("background", "white"); //анимация вкладок
        $(".tab").css("color", "black");
        $(this).css("background", "#9370DB");
        $(this).css("color", "white");*/

        /*Сохраняем номер последней вкладки*/
        var a=$(".glass").last().attr("id");

        /*И нажатой*/
        var b=$(this).attr("id");
        /*Прячем товары*/
        $(".cart").hide();
        /*Если нажата первая вкладка("все")*/
        if($(this).attr("id")==0){
                /*показываем все товары*/
                    $(".cart").show();
                }
                else{
                    /*иначе показываем те, которые соответствуют вкладке*/
        $("[data-description='"+b+"']").show();
                }
        ///////////////////////////
        
    });
    
 
});
