import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../Services/employee.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Employee } from '../../../Interfaces/employee';
import { ProductService } from '../../../Services/product.service';
import { Product } from '../../../Interfaces/product';
import { ShipperService } from '../../../Services/shipper.service';
import { Shipper } from '../../../Interfaces/shipper';
import { NewOrder } from '../../../Interfaces/newOrder';
import { OrderService } from '../../../Services/order.service';
import { Order } from '../../../Interfaces/order';
import { OrderDetail } from '../../../Interfaces/orderDetail';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<NewOrderComponent>);
  private employeeService = inject(EmployeeService);
  private productService = inject(ProductService);
  private shipperService = inject(ShipperService);
  private orderService = inject(OrderService)

  private data = inject(MAT_DIALOG_DATA);

  loading = signal(false);
  error = signal<string | null>(null);
  selectedProduct = signal<Product | null>(null);

  employees = toSignal(
    this.employeeService.getEmployees(),
    { initialValue: { statusCode: 0, data: [] as Employee [] } }
  );

  shippers = toSignal(
    this.shipperService.getShippers(),
    { initialValue: { statusCode: 0, data: [] as Shipper[] } }
  );

  products = toSignal(
    this.productService.getProducts(),
    { initialValue: { statusCode: 0, data: [] as Product[] } }
  );
  

  orderForm: FormGroup = this.fb.group({
    employeeId: [null, Validators.required],
    shipperId: [null, Validators.required],
    shipName: ['', Validators.required],
    shipAddress: ['', Validators.required],
    shipCity: ['', Validators.required],
    shipCountry: ['', Validators.required],
    freight: [0, Validators.required],

    productId: [null, Validators.required],
    quantity: [1, Validators.required],
    discount: [0]
  });

  close() {
    this.dialogRef.close();
  }

  onProductSelected(productId: number) {
    const product = this.products().data.find(p => p.productId === productId) || null;
    this.selectedProduct.set(product);

    if (product) {
      this.orderForm.patchValue({ unitPrice: product.unitPrice });
    }
  }

  save() {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);

    const order:Order = {
          custId : this.data.customerId,
          empId : this.orderForm.value.employeeId,
          shipperId : this.orderForm.value.shipperId,
          shipName : this.orderForm.value.shipName,
          shipAddress : this.orderForm.value.shipAddress,
          shipCity : this.orderForm.value.shipCity,
          shipCountry : this.orderForm.value.shipCountry,
          freight : this.orderForm.value.freight,
    }

    const orderDetail:OrderDetail = {
        productId: this.orderForm.value.productId,
        qty: this.orderForm.value.quantity,
        discount: this.orderForm.value.discount,
    };

    const newOrder: NewOrder = {
      order: order,
      orderDetail : orderDetail
    };
    
    this.orderService.createOrder(newOrder).subscribe({
      next: (response) => {
        if (response.statusCode == 200) 
        {
          this.loading.set(false);
          this.dialogRef.close(response.data);
        }
      else  {
        this.error.set("Error al crear la orden");
      }
      },
      error: (err) => {
        this.loading.set(false);
      }
    });
  }
}