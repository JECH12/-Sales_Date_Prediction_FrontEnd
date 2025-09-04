import { Component, inject, signal, ViewChild, effect } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../../Services/order.service';
import { ClientOrder } from '../../../Interfaces/ClientOrder';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    DatePipe
  ],
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent {
  private orderService = inject(OrderService);

  private data = inject(MAT_DIALOG_DATA);

  displayedColumns: string[] = ['orderId', 'requiredDate', 'shippedDate', 'shipName', 'shipAddress', 'shipCity'];
  dataSource = new MatTableDataSource<ClientOrder>();

  loading = signal(true);
  error = signal<string | null>(null);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  orders = toSignal(
    this.orderService.getClientOrders(this.data.customerId),
    { initialValue: { statusCode: 0, data: [] as ClientOrder[] } }
  );

  private initEffect = effect(() => {
    const response = this.orders();
    if (response.statusCode == 200 && response.data.length) {
      this.dataSource.data = response.data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading.set(false);
    }
  });
}
