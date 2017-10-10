import { Component } from '@angular/core';


@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  mainImageUrl: string;
  imageUrls: string[];


  constructor() {

    this.imageUrls = ['https://firebasestorage.googleapis.com/v0/b/beau-shopping.appspot.com/o/images%2F-Kw-O8yPETvW4BXoo2DP1?alt=media&token=83da31b1-7157-46c8-a9b3-a608f91f968a',
                      'https://firebasestorage.googleapis.com/v0/b/beau-shopping.appspot.com/o/images%2F-Kw-ONy_w4WIbBqv3vOv1?alt=media&token=e85b619f-c66c-4f82-b206-aa2507e8a4cb'
                      ]
    this.mainImageUrl = this.imageUrls[1];
  }

  changeImage(index: number) {
    this.mainImageUrl = this.imageUrls[index];
  }


}
