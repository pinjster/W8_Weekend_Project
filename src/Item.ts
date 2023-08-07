import { v4 } from "uuid"

class Item{
    readonly id: string
    private itemName: string
    private itemPrice: number
    private itemDescription: string
    private itemImg: string 
    
    constructor(
        name: string,
        price: number,
        description: string,
        img: string = ''
        ){
            this.id = v4();
            this.itemName = name;
            this.itemPrice = price;
            this.itemDescription = description;
            this.itemImg = img;
        }
        
        itemElement():HTMLDivElement {
            const itemDiv: HTMLDivElement = document.createElement('div');
            const img: HTMLImageElement = document.createElement('img');
            const name: HTMLElement = document.createElement('h3');
            const price: HTMLElement = document.createElement('p');
            const description: HTMLElement = document.createElement('p');
            itemDiv.id = "item-div";
            img.src = this.img;
            img.alt = this.name;
            img.id = "item-img";
            name.innerText = this.itemName;
            price.innerText = this.priceToString();
            description.innerText = this.itemDescription;
            itemDiv.append(img, name, price, description);
            return itemDiv;
        }
        
        priceToString(): string {
            return `$${(Math.round(this.itemPrice * 100) / 100).toFixed(2)}`
        }
        
        get name(): string {
            return this.itemName
        }
        set name(value: string) {
            this.itemName = value
        }
        
        get price(): number {
            return this.itemPrice
        }
        set price(value: number) {
            this.itemPrice = value
        }
        
        get description(): string {
            return this.itemDescription
        }
        set description(value: string) {
            this.itemDescription = value
        }

        public get img(): string {
            return this.itemImg
        }
        public set img(value: string) {
            this.itemImg = value
        }
}

export {
    Item
}
