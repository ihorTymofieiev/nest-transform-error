import {Controller, Get, Query} from '@nestjs/common';
import { AppService } from './app.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {BrokenQueryDto} from './broken-query.dto';

@ApiTags('app')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get server uptime info' })
  root() {
    return this.appService.getHealthInfo();
  }

  @Get('/broken')
  @ApiOperation({ summary: 'Request transform twice' })
  broken(@Query() query: BrokenQueryDto) {
    // query.includeAllRelations = false in any allowable request value
  }
}
