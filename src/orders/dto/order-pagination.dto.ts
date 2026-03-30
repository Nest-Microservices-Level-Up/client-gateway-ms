import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common';
import { orderStatus, OrderStatusList } from '../enum/order-enum';

export class OrderPaginationDto extends PaginationDto {
  @IsEnum(OrderStatusList, {
    message: `Valid status are ${OrderStatusList}`,
  })
  @IsOptional()
  status: orderStatus;
}
