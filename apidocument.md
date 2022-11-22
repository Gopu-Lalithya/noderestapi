// page1
>default
*http://localhost:9800/
>list of categories
*http://localhost:9800/categories
>list of products
*http://localhost:9800/products
>list of products based on its name

//page2
>products wrt category, brand, customerrating,discount combinations
*http://localhost:9800/filter?Category_id=4&Discount=28&Customer_rating=4.3&Brand=Asus

//page3
>Details of product
*http://localhost:9800/details/100
body
{
    "id":[
        11,34,9
    ]    
    
        
}
//page4
>order item details(POST)
http://localhost:9800/orderItem
>Pace Order(POST)
*http://localhost:9800/placeOrder
body
{
        
        "order_id":5,
        "name": "Spoorthi",
        "email": "spoorthi@gmail.com",
        "address": "Hno 23,Sector 1",
        "phone": 97876733,
        "cost": 1018,
        "menuItem": [
            3,2,1
        ]
        
}

//Page5
>list of orders
*http://localhost:9800/orders
>List of orders wrt to email
*http://localhost:9800/orders?email=lalithya@gmail.com

>Update Payment Details(PUT)
*http://localhost:9800/updateOrder/5
body
{
    
    "status": "Transaction Sucess",
    "bank_name": "SBI",
    "date": "20/11/22"       
}