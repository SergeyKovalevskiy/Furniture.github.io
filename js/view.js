var cart = {};/*Переменная для корзины*/

//Загрузить товары
function init(){
    /*Берем массив из файла и запускаем goodsOut*/
    $.getJSON("goods.json", goodsOut);
}

//Вывести товары
function goodsOut(data){
    /*выводим массив в консоль(проверка)*/
    console.log(data);
    /*переменная для добавляемого кода*/ 
    var out='';
    /*сохраняем ключ товара, отмеченного в хранилище как выбранного*/
    var key=localStorage["chosen"];
    /*блок описания товара с данным ключом*/
        out+='<div class="look" data-description="'+data[key].order+'">';
        /*изображение товара*/
        out+='<img src="'+data[key].img+'" alt="" width="400" height="300" style="padding: 50px">';
        out+='</div>';
        /*название*/
        out+='<div class="comment">Название:</div><p class="name">'+data[key].name+'</p>';
        /*цена*/
        out+='<div class="comment">Стоимость:</div><div class="cost">'+data[key].cost+'$</div>';
        /*Описание*/
        out+='<div class="comment">Описание:</div><br><div class="desc">'+data[key].description+'</div>';
        /*кнопка добавления в корзину*/
        out+='<button class="add-to-cart" data-id="'+key+'">Добавить</button>';
        /*Кнопка перехода к просмотру корзины*/
        out+='<a href="cart.php"><button class="to-cart">К корзине</button></a>';
        /*Ссылка для возврата к перечню товаров*/
        out+='<a href="index.html"><button class="to-main">К выбору</button></a>';
        /*Выводим на панель выбранное содержимое*/
    $('.board').html(out);
    /*Обработчик события для добавления в корзину*/
    $('.add-to-cart').on('click', addToCart);
}

//Запуск функций при загрузке
$(document).ready(function(){ 
    /*загрузить товар*/
    init(); 
    /*восстановить корзину из хранилища*/
    loadCart();    
    });
    
    //Добавить товар в корзину
    function addToCart(){     
    /*сохраняем id товара*/
    var id=$(this).attr('data-id');
    /*выводим в консоль(проверка)*/
    //console.log(id);
    /*Если в корзине нет товара с таким id, он добавляется и колличество становится равно 1*/
    if(cart[id]==undefined){
        cart[id]=1;
    }
    else{
        /*иначе его колличество увеличивается*/
        cart[id]++;
    }
    /*выводим мини-корзину*/
    showMiniCart();
    /*сохраняем изменения в корзине*/
    saveCart();
}

//сохранение корзины
function saveCart(){
    //Записать массив из корзины в хранилище браузера, превратив его в строку
    localStorage.setItem('cart', JSON.stringify(cart));
}

//проверка на пустоту
function isEmpty(object){
    /*для каждого ключа*/
    for(var key in object)
        /*если обьект с таким ключом существует вернуть правду*/
    if(object.hasOwnProperty(key)) return true;
    /*иначе вернуть ложь*/
    return false;
}

//Восстановить корзину из хранилища
function loadCart(){
    /*если в хранилище есть корзина*/
    if(localStorage.getItem('cart')){
        /*сохраняем её как массив в переменной*/
        cart=JSON.parse(localStorage.getItem('cart'));
        /*отображаем мини-корзину*/
        showMiniCart();
    }
};

//Вывести мини-корзину
function showMiniCart(){
    /*получаем из файла товары*/
    $.getJSON('goods.json',function(data){
        /*сохраняем их*/
        var goods=data;
        /*переменная для сгенерированного кода*/
        var out='';
        /*счетчики колличества и цены*/
    var counter=0;
    var summary=0;
    /*для каждого ключа в корзине*/
    for(var key in cart){
        /*увеличить колличество*/
        counter+=cart[key];
        /*и цену*/
        summary+=goods[key].cost*cart[key];
    }
    /*выводим колличество и цену товара*/
    out=counter+" товаров на сумму "+summary;
    /*выводим мини-корзину*/
    $('.mini-cart').html(out);
        if(!isEmpty(cart)){
            $(".cart-shape").hide();
        }
        else{$(".cart-shape").show();}
    });
    
}