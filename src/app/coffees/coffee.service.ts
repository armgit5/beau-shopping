import * as firebase from 'firebase';
import { Injectable, Inject, EventEmitter}  from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { cartData } from '../cart/cartData';
import { AngularFireDatabase } from 'angularfire2/database';
import { Coffee } from './coffee';
import { Observable } from 'rxjs';
import { Cart } from '../cart/cart';
import { Subscription } from 'rxjs/Rx';
import { CoffeeOutput } from './coffee-output';
import { apiMethods, apiUrl } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { User } from '../login/user';
import { xhrHeadersWithToken } from '../shared/xhr-headers';

@Injectable()
export class CoffeeService {

    // coffee variables
    cartCoffees: Cart[] = [];
    private coffeeCounts: number = 0;
    coffeeCountsChanged = new EventEmitter<number>();
    coffees: Coffee[] = [];

    outputData = new CoffeeOutput(true, '');
    editCoffeeData = new EventEmitter<CoffeeOutput>();

    // firebase viriables
    private storageFolderName: string;

    // coffee upload
    private alreadyUploaded: boolean = false;

    // coffee path
    private coffeePath: string;

    constructor(private http: Http,
                private db: AngularFireDatabase,
                private loginService: LoginService) {
        if (apiMethods.v1) {
          this.coffeePath = `coffees/`;
          this.storageFolderName = 'images/';
        }

        if (apiMethods.vCompanies) {
          this.loginService.userOutput.subscribe(
            (user: User) => {
              this.coffeePath = `/companies/${user.companyName}/coffees/`;
              this.storageFolderName = `${user.companyName}/images/`;
            }
          );
        }

        if (apiMethods.vWuth) {
          this.loginService.userOutput.subscribe(
            (user: User) => {
              this.coffeePath = `/companies/${user.companyName}/coffees/`;
              this.storageFolderName = `${user.companyName}/images/`;
            }
          );
        }
    }

    addToCart(coffee, count, comment) {
        let alreadyInCart = false;

        if (!alreadyInCart) {
            this.cartCoffees.push({
                coffeeId: coffee.$key,
                coffeeName: coffee.name,
                coffeeType: coffee.type,
                qty: count,
                price: coffee.price,
                comment: comment,
                imageUrl: coffee.url
            });
        }

        this.fetchCounts(count);
    }

    loadAllCoffees(user: User): Observable<any[]> {
        let path = ' ';
        if (apiMethods.v1) {
          // console.log('v1');
          path = 'coffees';
        }
        if (apiMethods.vCompanies) {
          //  console.log('v2');
          path = `/companies/${user.companyName}/coffees`;
        }

        if (apiMethods.vWuth) {
          // console.log('v3');
          path = `${apiUrl.url}/api/products?Company=oasit`;
          // path = 'https://oasit-b6bc8.firebaseio.com/coffees.json';
          return this.http.get(path, xhrHeadersWithToken())
                .map(res => res.json())
                .map(Coffee.fromJsonListV2);
        }

        return this.db.list(path)
                .map(Coffee.fromJsonList);

    }

    loadCoffee($key) {
        return this.db.object(this.coffeePath + $key);
    }

    deleteCoffee($key) {
        console.log(this.coffeePath + $key);
        // get coffee image key
        firebase.database().ref(this.coffeePath + $key).once('value').then(snapshot => {
            let imageKey = snapshot.val().imageKey;

            // removing the coffee
            this.db.object(this.coffeePath + $key).remove()
            .then(() => {

                // deleting image in storage
                this.deteleImageInStorage(imageKey);
            })
            .catch(error => console.log('Error'));
        });
    }

    private deteleImageInStorage(imageKey) {
        firebase.storage().ref().child(this.storageFolderName + imageKey)
        .delete().then(function() {
            // File deleted successfully
            console.log('successfully deleted the image');
        }).catch(function(error) {
            // Uh-oh, an error occurred!
            console.log('error deleting the image');
        });
        console.log('delete image in storage ' + imageKey);
    }

    getCoffeeCounts() {
        return this.coffeeCounts;
    }

    fetchCounts(count: number) {
        this.coffeeCounts = this.coffeeCounts + count;
        // console.log(this.coffeeCounts);
        return this.coffeeCountsChanged.emit(this.coffeeCounts);
    }

    // update and fetch counts when qty changes in cart
    updateFetchCounts(newCount) {
        this.coffeeCounts = newCount;
        this.fetchCounts(0);
    }

    editCoffee(isNew, inputId) {
        this.outputData.isNew = isNew;
        this.outputData.coffeeId = inputId;
        this.editCoffeeData.emit(this.outputData);
    }
}
