export class Shop {
    id: number;
    shopName: string;
    country: string;
    city: string;
    address: string;
    clissificationId: number;
    classificationStatus: string;
    userId: number;
    price: number;

    constructor(   id: number, shopName: string,
        country: string,
        city: string,
        address: string,
        clissificationId: number,
        classificationStatus: string,
        userId: number,
        price: number,){
        this.id = id;
        this.shopName = shopName;
        this.country = country;
        this.city = city;
        this.address = address;
        this.clissificationId = clissificationId;
        this.classificationStatus = classificationStatus;
        this.userId = userId;
        this.price = price;

    }

}
