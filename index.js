let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 7800;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.LiveMongo;
let cors = require('cors')
let bodyParser = require('body-parser');
let db;


//middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())


app.get('/',(req,res) => {
    res.send('Hii from Express')
})
//list of categories ROUTE
app.get('/categories',(req,res)=>{
    db.collection('categories').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
//list of products ROUTE
app.get('/products',(req,res)=>{
    let Category_id = Number(req.query.Category_id);
	let name = req.query.name;
	let query = {};
	// category 
	if(Category_id){
		query = {
			"Category_id":Category_id
		}
	}
	//name
	else if(name){
		query = {
			"Product_name":name
		}
	}
	else {
		query = {}
	}
    db.collection('products').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
// list of products based on its categories
app.get('/products/:Categoryid',(req,res)=>{
    let Categoryid = Number(req.params.Categoryid)
    db.collection('products').find({Category_id:Categoryid}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
//filter of products
app.get('/filter/:Category_id',(req,res)=>{
    let Category_id=Number(req.params.Category_id);
    let Brand = req.query.Brand;
    let lcost = Number(req.query.lcost);
	let hcost = Number(req.query.hcost);
    let Customer_rating = Number(req.query.Customer_rating);
    let Discount = Number(req.query.Discount);
    let query = {}
    
    // sort by cost
	let sort = {"Selling_price":1};
	if(req.query.sort){
		sort = {"Selling_price": Number(req.query.sort)}
	} 


    if(lcost && hcost&&Discount && Customer_rating && Brand){
        query={
            "Category_id": Category_id,
            $and:[
				{$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}]},
				
			],
            $and:[{Discount:{$gte:Discount}}],
            "Brand": Brand,
            "Customer_rating": Customer_rating
        }
    }
    else if(lcost && hcost&&Discount && Customer_rating){
        query={
            "Category_id": Category_id,
            $and:[
				{$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}]},
				
			],
            $and:[{Discount:{$gte:Discount}}],
            "Customer_rating": Customer_rating
        }
    }
    else if(lcost && hcost&&Customer_rating && Brand){
        query={
            "Category_id": Category_id,
            $and:[
				{$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}]},
				
			],
            "Brand": Brand,
            "Customer_rating": Customer_rating
        }
    }
    else if(lcost && hcost&&Discount && Brand){
        query={
            "Category_id": Category_id,
            $and:[
				{$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}]},
				
			],
            $and:[{Discount:{$gte:Discount}}],
            "Brand": Brand
            
        }
    }
    else if(Discount && Customer_rating && Brand){
        query={
            "Category_id": Category_id,
            $and:[{Discount:{$gte:Discount}}],
            "Brand": Brand,
            "Customer_rating": Customer_rating
            
        }
    }
    else if(lcost && hcost&&Discount){
        query={ 
            "Category_id": Category_id,
            $and:[
				{$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}]},
				
			],           
            $and:[{Discount:{$gte:Discount}}],            
        }
    }
    else if(lcost && hcost&&Brand){
        query={ 
            "Category_id": Category_id,  
            $and:[
				{$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}]},
				
			],         
            "Brand": Brand            
        }
    }
    else if(lcost && hcost&&Customer_rating){
        query={ 
            "Category_id": Category_id,  
            $and:[
				{$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}]},
				
			],         
            "Customer_rating": Customer_rating,           
        }
    }
    else if(Discount && Customer_rating){
        query={ 
            "Category_id": Category_id,  
            $and:[{Discount:{$gte:Discount}}],         
            "Customer_rating": Customer_rating,           
        }
    }
    else if(Customer_rating && Brand){
        query={ 
            "Category_id": Category_id,  
            "Brand": Brand,         
            "Customer_rating": Customer_rating,           
        }
    }
    else if(Discount && Brand){
        query={
            "Category_id": Category_id,   
            $and:[{Discount:{$gte:Discount}}],
            "Brand": Brand           
        }
    }
    else if(lcost && hcost){
        query={ 
            "Category_id": Category_id,
            $and:[
				{$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}]},
				
			],           
                      
        }
    }
    else if(Discount){
        query={
            "Category_id": Category_id,
            $and:[{Discount:{$gte:Discount}}]            
        }
    }
    else if(Brand){
        query={ 
            "Category_id": Category_id,  
                     
            "Brand": Brand            
        }
    }
    else if(Customer_rating){
        query={ 
            "Category_id": Category_id,  
                     
            "Customer_rating": Customer_rating          
        }
    }
    else{
        query={ 
            "Category_id": Category_id,  
                  
                     
        }
        
    }
    // if(Discount==0){
    //     query.Discount=Discount
    // }
    db.collection('products').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
//details of the product

app.get('/details/:Product_id',(req,res)=>{
    let Product_id = Number(req.params.Product_id)
    db.collection('products').find({Product_id:Product_id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//order
app.get('/orders',(req,res)=>{
    //let email = req.query.email
    let email = req.query.email;
    let query = {}
    if(email){
        //query={email:email}
        query={email}
    }else{
        query={}
    }
    db.collection('orders').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
//order items
app.post('/orderItem',(req,res) => {
    if(Array.isArray(req.body.id)){
        db.collection('products').find({Product_id:{$in:req.body.id}}).toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
    }else{
        res.send('Invalid Input')
    }
    
})
//placeorder
app.post('/placeOrder',(req,res) => {
    db.collection('orders').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Order Placed')
    })
})
//updateOrder
app.put('/updateOrder/:order_id',(req,res) => {
    let oid = Number(req.params.id);
    db.collection('orders').updateOne(
        {order_id:oid},
        {
            $set:{
                "status":req.body.status,
                "bank_name":req.body.bank_name,
                "date":req.body.date
            }
        },(err,result) => {
            if(err) throw err;
            res.send('Order Updated')
        }
    )
})
//deleteOrder
app.delete('/deleteOrder/:id',(req,res) => {
    let _id = mongo.ObjectId(req.params.id);
    db.collection('orders').remove({_id},(err,result) => {
        if(err) throw err;
        res.send('Order Deleted')
    })
})


//connection with client
MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error while connecting');
    db = client.db('sampledat');
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })

})

