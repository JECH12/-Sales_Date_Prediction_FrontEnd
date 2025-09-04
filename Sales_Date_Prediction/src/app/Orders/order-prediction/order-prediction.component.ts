import { Component, inject, signal, ViewChild, effect } from '@angular/core';
import { OrderService } from '../../../Services/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { PredictedOrder } from '../../../Interfaces/PredictedOrder';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { OrderViewComponent } from '../order-view/order-view.component';
import { BehaviorSubject, switchMap } from 'rxjs';
import { NewOrderComponent } from '../new-order/new-order.component';

@Component({
  selector: 'app-order-prediction',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    DatePipe
  ],
  templateUrl: './order-prediction.component.html',
  styleUrls: ['./order-prediction.component.css']
})
export class OrderPredictionComponent {
  private orderService = inject(OrderService);
  private dialog = inject(MatDialog)

  displayedColumns: string[] = ['customerId','customerName', 'lastOrderDate', 'nextPredictedOrder', 'actions'];
  dataSource = new MatTableDataSource<PredictedOrder>();

  loading = signal(true);
  error = signal<string | null>(null);
  companyName$ = new BehaviorSubject<string | null>(null);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 predictedOrders = toSignal(
  this.companyName$.pipe(
    switchMap(name => this.orderService.getPredictedOrders(name))
  ),
  { initialValue: { statusCode: 0, data: [] as PredictedOrder[] } }
);


  private initEffect = effect(() => {
    this.loadOrders();
  });

  private loadOrders(){
    const response = this.predictedOrders();
    if (response.statusCode == 200 && response.data.length) {
      this.dataSource.data = response.data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading.set(false);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.companyName$.next(filterValue || null);
  }

  openOrderViewModal(customerId: number) {
    this.dialog.open(OrderViewComponent, {
      width: '50vw', 
      maxWidth: '50vw',  
      minWidth: '300px',
      data: {customerId: customerId}
    });
  }

  openCreateOrderModal(customerId: number) {
    this.dialog.open(NewOrderComponent, {
      width: '30vw', 
      maxWidth: '50vw',  
      minWidth: '300px',  
      data: {customerId: customerId}
    });
  }
}