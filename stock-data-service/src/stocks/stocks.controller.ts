import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  OnModuleInit,
  Inject,
  Patch
} from "@nestjs/common";
import { StocksService } from "./stocks.service";
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ClientKafka } from "@nestjs/microservices";
import { GetStockHistoryDto } from "./dto/get-stock-history.dto";

@ApiTags("stocks")
@Controller("stocks")
export class StocksController implements OnModuleInit {
  constructor(
    private readonly stocksService: StocksService,
    @Inject("WEBSOCKET_SERVICE")
    private readonly websocketClient: ClientKafka
  ) {}

  @Post("fetch")
  @ApiOperation({ summary: "Fetch realtime stock data from external API" })
  @ApiResponse({
    status: 201,
    description: "Stock data has been fetched and updated"
  })
  async fetchStockData() {
    return await this.stocksService.fetchStockData();
  }

  @Get()
  @ApiOperation({
    summary: "Get all stock records in database with pagination"
  })
  @ApiResponse({ status: 200, description: "Return all stock records" })
  async findAll(
    @Query() query: string,
    @Query("current") current: number,
    @Query("pageSize") pageSize: number
  ) {
    return this.stocksService.findAll(query, current, pageSize);
  }

  @Post("/history")
  @ApiOperation({ summary: "Get stock history records in database" })
  @ApiResponse({ status: 200, description: "Return all stock history records" })
  async getStockHistory(@Body() getStockHistoryDto: GetStockHistoryDto) {
    return this.stocksService.getStockHistory(getStockHistoryDto);
  }

  @Post()
  @ApiOperation({ summary: "Create a new stock record" })
  @ApiResponse({
    status: 201,
    description: "The stock has been successfully created."
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  async create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  @Patch(":_id")
  @ApiOperation({ summary: "Update a stock record by ID" })
  @ApiResponse({ status: 200, description: "The updated stock record" })
  @ApiResponse({ status: 404, description: "Stock not found" })
  async update(
    @Param("_id") _id: string,
    @Body() updateStockDto: UpdateStockDto
  ) {
    return this.stocksService.update(_id, updateStockDto);
  }

  @Delete(":_id")
  @ApiOperation({ summary: "Delete a stock record by ID" })
  @ApiResponse({
    status: 200,
    description: "The stock record has been deleted"
  })
  @ApiResponse({ status: 404, description: "Stock not found" })
  async delete(@Param("_id") _id: string): Promise<void> {
    return this.stocksService.delete(_id);
  }

  // Kafka Client connect
  async onModuleInit() {
    this.websocketClient.subscribeToResponseOf("stock_data");
    await this.websocketClient.connect();
  }
}
