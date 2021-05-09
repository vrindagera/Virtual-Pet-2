var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var feed;
var addFood;
var fedTime;
var lastFed;
var foodObj;

function preload()
{
	dog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database()
  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
      text("Last Feed:" + lastFed%12 + "PM" ,350,30)
  }
  else if(lastFed==0){
      text ("Last Feed : 12 AM",350,30)
  }
  else{
      text ("Last Feed :" +lastFed+ "AM", 350,30)
  }
  Dog = createSprite(250,300,150,150)
  Dog.addImage(dog)
  Dog.scale = 0.15
 foodStock = database.ref('Food')
 foodStock.on("value",readStock)  
 feed = createButton("Feed the Dog")
 feed.position(700,95);
 feed.mousePressed(feedDog)

 addFood = createButton("Add Food")
 addFood.position(800,95);
 addFood.mousePressed(addFoods)

 foodObj = new Food()
}


function draw() {  
background(46,139,87)

  foodObj.display();


  drawSprites();
  fill(255,255,254,254)
 stroke("black")
 
  text("Food Remaining - "+foodS,170,200)
  textSize(13)
  text("Note: Press Up Arrow Key to Feed Dargo Milk",130,10,300,20)
  fedTime = database.ref('Feed Time')
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
}
function readStock(data){
  foodS = data.val();
}
 
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
   x = x-1
  }
  database.ref('/').update({
    Food:x
  })
}
function feedDog(){
  Dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
} 
function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}
