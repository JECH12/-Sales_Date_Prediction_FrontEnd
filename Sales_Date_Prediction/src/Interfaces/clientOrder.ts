export interface ClientOrder{
    orderId: number;
    requiredDate: Date;
    shippedDaate: Date;
    shipName: string;
    shipAddress: string;
    shipCity: string;
}