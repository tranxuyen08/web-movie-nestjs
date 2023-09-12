import { Controller, Get } from "@nestjs/common";
import { HistoryService } from "./saleManagement.service";

@Controller('/api/v1/history')
export class HistoryController {
  constructor(public historyService: HistoryService) {}
  @Get()
  getHistory(){
    return this.historyService.handleGetAllHistory();
  }
}