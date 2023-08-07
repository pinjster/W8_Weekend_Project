import { v4 } from "uuid";
import { Item } from "./Item";
import { flash } from ".";

type quantityPerItem = {
    item: Item,
    quantity: number
}

class User {
    readonly id: string;
    private userAge: number;
    private userCart: Item[];
    private userName: string;
    private userQuantity: quantityPerItem[];
    
    constructor(
        name: string,
        age: number,
        ){
            this.id = v4();
            this.userName = name;
            this.userAge = age;
            this.userCart = [];
            this.userQuantity = [];
        }
        
    get quantity(): quantityPerItem[] {
        return this.userQuantity;
    }
    set quantity(value: quantityPerItem[]) {
        this.userQuantity = value;
    }
    get name(): string {
        return this.userName;
    }
    set name(value: string) {
        this.userName = value;
    }
    get age(): number {
        return this.userAge;
    }
    set age(value: number) {
        this.userAge = value;
    }
    get cart(): Item[] {
        return this.userCart;
    }
    set cart(value: Item[]) {
        this.userCart = value;
    }

    static loginUser(): User | undefined {
        const nameForm = document.getElementById('name-form') as HTMLInputElement;
        const ageForm = document.getElementById('age-form') as HTMLInputElement;
        const name = nameForm.value;
        const age = Number(ageForm.value);
        if(name && age){
            const newUser = new User(name, age);
            return newUser;
        } else {
            return undefined;
        }
    }

    cartHTMLElement(): HTMLDivElement {
        const cartDiv: HTMLDivElement = document.createElement('div');
        cartDiv.id = "cart-item";
        for(let q of this.quantity){
            let countPar = document.createElement('p')
            let element = q.item.itemElement();
            countPar.innerText = `Total: ${q.quantity.toString()}`;
            let removeButtons = this.addRemoveEventListeners(q.item);
            element.append(countPar, removeButtons)
            cartDiv.append(element);
        }
        return cartDiv;
    }

    updateCart(): void {
        const cartDiv = document.getElementById('cart') as HTMLDivElement;
        const total = document.createElement('h3');
        total.innerText = `Total: $${(Math.round(this.cartTotal() * 100) / 100).toFixed(2)}`
        cartDiv.replaceChildren();
        if(!this.userCart){
            flash.innerText = "No items in your cart";
        } else {
            cartDiv.appendChild(this.cartHTMLElement());
            cartDiv.appendChild(total)
        }
    }

    addRemoveEventListeners(item: Item): HTMLElement {
        const removeDiv = document.createElement('div');
        const removeOneForm = document.createElement('form');
        const removeAllForm = document.createElement('form');
        const oneButton = document.createElement('button');
        const allButton = document.createElement('button');
        oneButton.innerText = "Remove One";
        allButton.innerText = "Remove All";
        removeOneForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.removeQuantityFromCart(item, 1);
            this.updateCart();
        })
        removeAllForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.removeFromCart(item);
            this.updateCart();
        })
        removeOneForm.append(oneButton);
        removeAllForm.append(allButton);
        removeDiv.append(removeOneForm, removeAllForm)
        return removeDiv;
    }

    checkInQuantity(item: Item){
        const found = this.quantity.findIndex((quant) => quant.item.id === item.id );
        return found;
    }

    addToCart(item: Item): void {
        this.userCart.push(item);
        console.log(`${item.name} added to ${this.name}'s cart`);
        this.addToQuantity(item);
    }

    addToQuantity(item: Item): void {
        const found = this.checkInQuantity(item);
        if(found === -1){
            const newItem: quantityPerItem = {item: item, quantity: 1}
            this.quantity.push(newItem);
        } else {
            this.quantity[found].quantity += 1;
        }
    }

    removeAmountFromQuantity(item: Item, count: number): void {
        const found = this.checkInQuantity(item);
        if(found !== -1){
            this.quantity[found].quantity -= count;
            if(this.quantity[found].quantity <= 0){
                this.removeFromQuantity(item)
            } else {
                flash.innerText = `One instance of "${item.name}" has been removed from your cart`;
            }
        }
    }

    removeFromQuantity(item: Item){
        const found = this.checkInQuantity(item);
        if(found !== -1){
            this.quantity.splice(found, 1);
            flash.innerText = `"${item.name}" removed from your cart`;
        }
    }

    removeFromCart(item: Item):void {
        this.removeFromQuantity(item);
        this.userCart = this.userCart.filter((i: Item) => i.id !== item.id);
        console.log(`All instances of ${item.name} have been removed from ${this.name}'s cart`);
    }

    removeQuantityFromCart(item: Item, amount: number):void {
        let i: number = 0;
        this.removeAmountFromQuantity(item, amount);
        for(i; i < amount; i++){
            let f:number = this.userCart.findIndex((x: Item) => x.id === item.id);
            if(f === -1){
                break;
            } else {
                this.userCart.splice(f, 1);
            }
        }
        console.log(`${i} instances of "${item.name}" have been removed from ${this.name}'s cart`);
    }

    cartTotal():number {
        let total = 0;
        for(let item of this.userCart){
            total += item.price;
        }
        return total;
    }

    printCart():void {
        console.log('');
        console.log(' '.repeat(20) + `${this.name}'s Cart`);
        for(let item of this.cart){
            let amount = item.priceToString();
            console.log(`${item.name}:${' '.repeat(29 - item.name.length)} ${amount}${' '.repeat(15 - amount.length)}"${item.description}"`);
        }
    }
}

export {
    User
}