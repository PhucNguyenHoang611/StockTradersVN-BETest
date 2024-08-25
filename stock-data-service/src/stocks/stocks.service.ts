import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Stock } from "./schemas/stock.schema";
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";
import { HttpService } from "@nestjs/axios";
import aqp from "api-query-params";
import { ClientKafka } from "@nestjs/microservices";
import { Cron, CronExpression } from "@nestjs/schedule";
import { GetStockHistoryDto } from "./dto/get-stock-history.dto";

@Injectable()
export class StocksService {
  constructor(
    @Inject("WEBSOCKET_SERVICE")
    private readonly websocketClient: ClientKafka,
    @InjectModel(Stock.name) private readonly stockModel: Model<Stock>,
    private readonly httpService: HttpService
  ) {}

  // Execute this function every minute
  @Cron(CronExpression.EVERY_MINUTE)
  async fetchStockData() {
    const apiUrl = "https://stocktraders.vn/service/data/getTotalTradeReal";
    try {
      const response = await this.httpService.axiosRef.post(apiUrl, {
        TotalTradeRealRequest: {
          account: "StockTraders"
        }
      });
      const stocks = response.data.TotalTradeRealReply.stockTotalReals;

      // Use bulkWrite to update multiple documents at once
      const bulkOps = stocks.map((stock: any) => ({
        updateOne: {
          filter: { ticker: stock.ticker, date: stock.date },
          update: {
            $set: {
              close: stock.close,
              high: stock.high,
              low: stock.low,
              open: stock.open,
              vol: stock.vol
            }
          },
          upsert: true
        }
      }));

      const result = await this.stockModel.bulkWrite(bulkOps);
      const upsertedIds = Object.values(result.upsertedIds);

      // Check if new stock data has been added
      if (upsertedIds.length > 0) {
        const newDocuments = await this.stockModel.find({
          _id: { $in: upsertedIds }
        });

        // Emit the new stock data to the websocket server
        this.websocketClient.emit("stock_data", newDocuments);
      }

      return {
        success: true,
        message: "Latest stock data fetched successfully",
        results: stocks
      };
    } catch (error) {
      console.error("Error fetching stock data:", error.message);
      throw error;
    }
  }

  // Get all stock data with pagination
  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.stockModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const skip = (current - 1) * pageSize;

    const results = await this.stockModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .sort(sort as any);

    return { results, totalPages };
  }

  // Get history of stock data in a specific date range
  async getStockHistory(getStockHistoryDto: GetStockHistoryDto) {
    return await this.stockModel
      .find({
        ticker: getStockHistoryDto.ticker,
        date: {
          $gte: getStockHistoryDto.startDate,
          $lte: getStockHistoryDto.endDate
        }
      })
      .exec();
  }

  // Create a new stock data
  async create(createStockDto: CreateStockDto) {
    const newStock = new this.stockModel(createStockDto);
    return newStock.save();
  }

  // Update a stock data
  async update(_id: string, updateStockDto: UpdateStockDto) {
    const stock = await this.stockModel.updateOne(
      { _id: _id },
      updateStockDto,
      { new: true }
    );
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${_id} not found`);
    }
    return stock;
  }

  // Delete a stock data
  async delete(_id: string): Promise<void> {
    const result = await this.stockModel.deleteOne({ _id: _id });
    if (!result) {
      throw new NotFoundException(`Stock with ID ${_id} not found`);
    }
  }
}
