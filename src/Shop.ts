import { v4 } from "uuid";
import { Item } from "./Item";
import { flash, myUser } from ".";


class Shop{
    readonly id: string;
    private shopName: string;
    items: Item[];
    static shops: Shop[] = [];
    
    constructor(name: string,
        item1: Item,
        item2: Item, 
        item3: Item,
        item4: Item,
        item5: Item,
        item6: Item,
        ) {
        this.id = v4();
        this.shopName = name;
        this.items = [];
        this.addItem(item1);
        this.addItem(item2);
        this.addItem(item3);
        this.addItem(item4);
        this.addItem(item5);
        this.addItem(item6);
        Shop.shops.push(this);
        console.log(Shop.shops);
    }
    
    get name(): string {
        return this.shopName;
    }
    set name(value: string) {
        this.shopName = value;
    }

    static showShops(): void {
        const shopsDiv = document.getElementById('all-shops') as HTMLDivElement;
        shopsDiv.replaceChildren();
        for(let shop of Shop.shops){
            const name = document.createElement('h3')
            name.innerText = shop.name;
            const shopItems = shop.showItems();
            shopsDiv.append(name, shopItems)
        }
    }

    showItems(): HTMLElement {
        const shopDiv = document.createElement('div');
        shopDiv.id = "shop";
        shopDiv.replaceChildren();
        for(let item of this.items){
            let element = item.itemElement();
            this.addCartEventListener(element, item);
            shopDiv.appendChild(element);
        }
        return shopDiv;
    }

    addCartEventListener(divItem: HTMLDivElement, item: Item): void {
        const addToCartForm: HTMLFormElement = document.createElement('form');
        const addToCartButton: HTMLButtonElement = document.createElement('button');
        addToCartButton.type = "submit";
        addToCartButton.innerText = "Add to Cart";
        addToCartForm.append(addToCartButton);
        addToCartForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if(typeof myUser !== "undefined"){
                myUser.addToCart(item);
                flash.innerText = `"${item.name}" added to your cart!`;
                myUser.updateCart();
            } else {
                flash.innerText = `Must have account to add items to cart`
            }
        })
        divItem.append(addToCartForm);
    }

    addItem(item: Item): void {
        const filter: boolean = this.items.every((i) => { 
            return i.id !== item.id;
        });
        if(filter){
            this.items.push(item);
            console.log(`${item.name} has been added to ${this.name}`);
        } else {
            console.log(`${item.name} already in ${this.name}`);
        }
    }

    deleteItem(item: Item): void {
        this.items = this.items.filter((i: Item) => i.id !== item.id);
        console.log(`${item.name} has been removed from ${this.name}`);
    }

    printItems():void {
        console.log('');
        console.log(' '.repeat(20) + `${this.name}'s Inventory`);
        for(let item of this.items){
            let amount = item.priceToString();
            console.log(`${item.name}:${' '.repeat(29 - item.name.length)} ${amount}${' '.repeat(15 - amount.length)}"${item.description}"`);
        }
    }
    
}

export {
    Shop
}