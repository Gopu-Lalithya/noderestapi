// page1
>default
*https://flipkartapi.onrender.com/
>list of categories
*https://flipkartapi.onrender.com/categories
>list of products
*https://flipkartapi.onrender.com/products
>list of products based on its name
*https://flipkartapi.onrender.com/products?name=realme%209

//page2
>products wrt category, brand, customerrating,discount combinations
*https://flipkartapi.onrender.com/filter?Category_id=4&Discount=28&Customer_rating=4.3&Brand=Asus

//page3
>Details of product
*https://flipkartapi.onrender.com/details/100
body
{
    "id":[
        11,34,9
    ]    
    
        
}
//page4
>order item details(POST)
*https://flipkartapi.onrender.com/orderItem
>Pace Order(POST)
*https://flipkartapi.onrender.com/placeOrder
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
*https://flipkartapi.onrender.com/orders
>List of orders wrt to email
*https://flipkartapi.onrender.com/orders?email=lalithya@gmail.com

>Update Payment Details(PUT)
*https://flipkartapi.onrender.com/updateOrder/5
body
{
    
    "status": "Transaction Sucess",
    "bank_name": "SBI",
    "date": "20/11/22"       
}
>Delete Order(Delete)
*https://flipkartapi.onrender.com/deleteOrder/637ce4551f3c891de689e0a4