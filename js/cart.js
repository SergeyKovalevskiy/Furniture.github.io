var cart = {};/*переменная для корзины*/

//Восстановить корзину из хранилища
function loadCart(){
   /*Если корзина есть в хранилище*/ 
    if(localStorage.getItem('cart')){
        /*переводим корзину из строки в массив и сохраняем*/
        cart=JSON.parse(localStorage.getItem('cart'));
        /*выводим содержимое корзины*/
            showCart();
    }
    else{
        /*если в корзине ничего нет, выводим надпись, что она пуста*/
        $('.main-cart').html('Корзина пуста');
    }
}

//Вывести корзину
function showCart(){
    /*Если корзина пуста*/
    if(!isEmpty(cart)){
        /*Выводим надпись об этом*/
        $('.main-cart').html('Корзина пуста');
    }
    else{
        /*иначе берем массив из файла*/
        $.getJSON('goods.json', function(data){
            /*сохраняем в переменную*/
            var goods=data;
            /*заводим переменную для добавляемого кода*/
            var out='';
            /*для каждого ключа в корзине*/
            for(var key in cart){
                /*кнопка для удаления товара*/
                out+='<button data-id="'+key+'" class="del-goods">x</button>';
                /*иконка товара*/
                out+='<img src="'+goods[key].img+'">';
                /*название*/
                out+=' '+goods[key].name+' ';
                /*кнопка для уменьшения количества на 1*/
                out+='<button data-id="'+key+'" class="minus-goods">-</button>';
                /*текущее количество товара в корзине*/
                out+=' '+cart[key]+' ';
                /*кнопка для увеличения количества товара на 1*/
                out+='<button data-id="'+key+'" class="plus-goods">+</button>';
                /*суммарная стоимость данной категории*/
                out+=' '+cart[key]*goods[key].cost+' ';
                /*перенос строки перед следующим товаром*/
                out+='<br>';
            }
            /*выводим полученный список в корзину*/
            $('.main-cart').html(out);
            /*обработчик клика для удаления*/
            $('.del-goods').on('click',delGoods);
            /*обработчик клика для увеличения*/
            $('.plus-goods').on('click',plusGoods);
            /*обработчик клика для уменьшения*/
            $('.minus-goods').on('click',minusGoods);
            /*обработчик для очисти корзины*/
            $('.reset-cart').on('click', function(){ 
                /*для каждого ключа в корзине*/
                for(var key in cart){
                    /*удалить товар с этим ключом*/
                delete cart[key];
                }
                /*сохраняем изменения в локальное хранилище*/
            saveCart();
            /*отображаем изменения*/
            showCart();
            });
        });
    }
}

//Удалить товар
function delGoods(){
    /*сохраняем id товара*/
    var id=$(this).attr('data-id');
    /*удаляем из корзины товар с таким id*/
    delete cart[id];
    /*сохраняем изменения*/
    saveCart();
    /*отображаем изменения*/
    showCart();
}

//увеличить на единицу
function plusGoods(){
/*сохраняем id товара*/
    var id=$(this).attr('data-id');
    /*увеличиваем количество товара с таким id на единицу */
    cart[id]++;
    /*сохраняем изменения*/
    saveCart();
    /*отображаем изменения*/
    showCart();
}

//Уменьшить на 1
function minusGoods(){
    /*сохраняем id товара*/
    var id=$(this).attr('data-id');
    /*если количество было равно 1*/
    if(cart[id]==1){
        /*удалить товар*/
        delete cart[id];
    }
    else{
        /*иначе уменьшить его количество на 1*/
    cart[id]--;  
    }
    /*сохраняем изменения*/
    saveCart();
    /*отображаем изменения*/
    showCart();
}

//Сохранить в хранилище
function saveCart(){
    /*переводим массив корзины в строку и ложим в хранилище браузера*/
    localStorage.setItem('cart', JSON.stringify(cart));
}


//проверка на пустоту
function isEmpty(object){
    /*дял каждого ключа*/
    for(var key in object)
        /*если есть обьект с таким ключом, вернуть правду*/
    if(object.hasOwnProperty(key)) return true;
    /*иначе вернуть ложь*/
    return false;
}

//Запрос на почтовый сервис
function sendEmail(){
    /*считываем имя*/
    var ename=$('#ename').val();
    /*считываем почту*/
    var email=$('#email').val();
    /*считываем телефон*/
    var ephone=$('#ephone').val();
    /*если ни одно поле не пусто*/
    if(ename!='' && email!='' && ephone!=''){
        /*Если корзина не пуста*/
        if(isEmpty(cart)){
            /*пост-запрос к другому файлу*/
            $.post("core/mail.php",{
               "ename" : ename,
                "email" : email,
                "ephone" : ephone,
                "cart" : cart
            },
            /*обрабатываем пришедшие данные*/
            function(data){
               if(data==1){
                /*если пришла 1, выводим сообщение об успехе*/
                   alert('Заказ принят!');
               } 
               else{
                /*Иначе просим попробовать заново*/
                   alert('Повторите заказ!');
               }
            }
            );
        }
        else{
            /*Если корзина пуста, выводим сообщение об этом*/
        alert('В корзине ничего нет!');
        }
    }
    else{
        /*Если не все поля заполнены, просим исправить это*/
        alert('Заполните все поля!');
    }
    
}

//Запуск при загрузке страницы
$(document).ready(function(){
    /*Загрузка корзины из хранилища*/
   loadCart();
/*Обработчик клика для отправки письма*/
$('.send-email').on('click',sendEmail);  
/*Обработчик клика для очистки формы*/
$('.reset-form').on('click',function(){
    /*Стираем текст из всех полей*/
     $('#ename').val('');
     $('#email').val('');
     $('#ephone').val('');
    }); 
});
































