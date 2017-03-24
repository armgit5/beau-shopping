import { Component, OnInit } from '@angular/core';
// import { cartData } from './cartData';
import { coffeesData } from '../coffees/coffeesData';
import { CoffeeService } from '../coffees/coffee.service';
import { element } from 'protractor/globals';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { QueueService } from '../queue/queue.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    cartForm: FormGroup;

    cartItems = this.coffeeService.cart;
    total: number;

    newTotal: number = 0;
    newCount: number = 0;

    constructor(private coffeeService: CoffeeService,
                private formBuilder: FormBuilder,
                private queueService: QueueService) {
        
    }

    ngOnInit() {
        this.calculateTotal();
        this.initForm();

        // update cart in real time when qty changes
        this.cartForm.valueChanges.subscribe(data => {
            this.newTotal = 0;
            this.newCount = 0;
            data.cartCoffees.forEach(coffee => {
                this.newTotal += coffee.qty * coffee.price;
                this.newCount += coffee.qty;
            });
            console.log(this.newTotal, this.newCount);
            this.coffeeService.updateFetchCounts(this.newCount);
            this.total = this.newTotal;
        });
        
    }

    private initForm() {

        let customerName = "Arm";
        let cartCoffees: FormArray = new FormArray([]);

        this.cartItems.forEach(coffee => {
            cartCoffees.push(new FormGroup({
                coffeeId: new FormControl(coffee.coffeeId),
                coffeeName: new FormControl(coffee.coffeeName), 
                coffeeType: new FormControl(coffee.coffeeType),
                qty: new FormControl(coffee.qty, Validators.required),
                price: new FormControl(coffee.price),
                comment: new FormControl(coffee.comment)
            }));
        });
        
        this.cartForm = this.formBuilder.group({
            customerName: [customerName],
            cartCoffees: cartCoffees
        });

    }   

    calculateTotal() {
        this.total = 0;
        this.cartItems.forEach(element => {
            this.total = this.total + element.qty * element.price;
        });
    }

    delete(index) {
        (<FormArray>this.cartForm.controls['cartCoffees']).removeAt(index);
        
        // this.coffeeService.fetchCounts(-(this.cartItems[index]).qty);
        this.cartItems.splice(index, 1);
        // this.calculateTotal();
    }

    onSubmit() {
        // console.log(this.cartForm.value);
        this.queueService.addQueue(this.cartForm.value);
    }

}
