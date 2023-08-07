import { Item } from "./Item";
import { Shop } from "./Shop";
import { User } from "./User";

let myUser: User | undefined;

//Items
const itemA = new Item('Steel Cut Oats', 3.67, "20oz.");
const itemB = new Item('Sharp Cheddar', 3.20, "not even wensleydale?");
const itemC = new Item('birch beer', 1, "Muy Delicioso!");
const itemD = new Item("Nukie (1987)", 80600, "Frauds", "./static/images/nukie.jpg");
const itemE = new Item("Polygon", 19.99, "Battle Tapes", "./static/images/battle-tapes.jpg");
const itemF = new Item("GeForce RTX 3060", 360, "Graphics Card");
const itemG = new Item("Texture", 19.99, "Battle Tapes 2nd Album", "./static/images/texture.jpg");
const itemH = new Item("Ibanez Guitar", 210, "Acoustic");
const itemI = new Item("Bananas", 4.20, "Bundle o' Bananas", "./static/images/banana.jpg");

//Shop(s)
const shop = new Shop("Spinj's Shop", itemA, itemB, itemC, itemD, itemE, itemF);
const shop2 = new Shop("Sean's Shop", itemE, itemG, itemH, itemI, itemD, itemF);

//Flash Message
const flashDiv = document.getElementById('flash') as HTMLDivElement;
const flash = document.createElement('p');
flashDiv.append(flash);

//Sign-In
const SignInForm = document.getElementById('sign-in-form') as HTMLDivElement;
SignInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUser = User.loginUser();
    if(typeof newUser !== "undefined"){
        myUser = newUser;
        flash.innerText = `Welcome ${newUser.name}!`;
        Shop.showShops();
        myUser.updateCart();
    } else {
        flash.innerText = "Please fill in Name and Age"
    }
})

export {
    myUser,
    flash,
    shop,
    shop2
}