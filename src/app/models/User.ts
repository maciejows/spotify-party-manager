export class User {
    name: string;
    imgUrl: string;
    id: string;

    constructor(object: any){
        this.name = object.display_name;
        this.imgUrl = object.images[0].url;
        this.id = object.id;
    }
}