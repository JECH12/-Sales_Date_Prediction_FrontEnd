import { Routes } from '@angular/router';
import { OrderPredictionComponent } from './Orders/order-prediction/order-prediction.component';
import { OrderViewComponent } from './Orders/order-view/order-view.component';

export const routes: Routes = [
    { 
        path: '', component: OrderPredictionComponent 
    },
    { 
        path: 'order', component: OrderViewComponent
    },
    { 
        path: '**', redirectTo: '' 
    }
];
