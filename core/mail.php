<?php
/*считываем данные из json файла*/
$json = file_get_contents('../goods.json');
/*преобразовываем в формат php*/
$json = json_decode($json, true);

/*переменная для содержимого письма*/
$message = '';
/*фон блока с текстом*/
$message .= '<div style="background: skyblue; border-left: 2px double red; border-right: 2px solid green">';
/*Заголовок*/
$message .= '<h1 style="color: red; font-size:56px">Shop Order</h1>';
/*Телефон*/
$message .= '<p>Phone: '.$_POST['ephone'].'</p>';
/*Почта*/
$message .= '<p>Mail: '.$_POST['email'].'</p>';
/*Имя*/
$message .= '<p>Client: '.$_POST['ename'].'</p>';

/*Переменная с товарами*/
$cart = $_POST['cart'];
/*Переменная со стоимостью*/
$sum=0;
/*Для каждого товара*/
foreach($cart as $id=>$count){
	/* Имя ---*/
   $message .=$json[$id]['name'].'---';
   /*Колличество ---*/
   $message .=$count.'---';
   /*Стоимость категории */
   $message .=$count*$json[$id]['cost'];
   $message .='<br>';
   /*Общая стоимость*/
   $sum=$sum +$count*$json[$id]['cost'];
}
/*Итого:*/
$message.='Total: '.$sum;
/*Конец письма*/
$message .= '</div>';
/*Почта администратора(извещение о покупателе)*/
$to='eshopf@eshopf.kl.com.ua'.',';
/*Почта покупателя(извещение о принятом заказе)*/
$to.=$_POST['email'];
/*Спецификации*/
$spectext='<!DOCTYPE HTML><html><head><title>Order</title></head><body>';
//Заголовки
/*Отправитель*/
$headers='From: eshopf@eshopf.kl.com.ua' . "\r\n";
/*Почтовый стандарт*/
$headers.='MIME-Version: 1.0'."\r\n";
/*Тип данных и кодировка*/
$headers.='Content-type: text/html; charset=utf-8'."\r\n";

/*В переменную заносится составленное письмо, команда mail для отправки*/
$m=mail($to, 'Order at shop', $spectext.$message.'</body></html>', $headers);
/*При успехе возвращаем 1, иначе 0*/
if($m){echo 1;}else{echo 0;}