import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  cstCartAdd: any[] = [];
  subTotal: number = 0;
  constructor(private allProductAPI: ProductService) {

  }
  ngOnInit(): void {
    this.showCstPro();
  }

  showCstPro() {
    this.allProductAPI.getSingleCstId(1).subscribe((res: any) => {
      this.cstCartAdd = res.data;
      this.cstCartAdd.forEach(element => {
        this.subTotal += element.productPrice
      });
    })
  }
  remove(id: number) {
    this.allProductAPI.singleItemDel(id).subscribe((res: any) => {
      if (res.result) {
        this.showCstPro();
        this.allProductAPI.cartAddedSubject.next(true);

      }
    })
  }
}
