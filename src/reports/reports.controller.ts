import { 
    Controller, 
    Post, 
    Patch,
    Body, 
    Param,
    UseGuards, 
    UseInterceptors 
} from '@nestjs/common';
import { CreateReportDTO } from './DTOS/createReports.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReportsService } from './reports.service';
import { CurrentUser } from 'src/user/decorators/currentUser.decorator';
import { User } from 'src/user/entity/user.entity';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { ReportDTO } from './DTOS/report.dto';
import { ApproveReportDTO } from './DTOS/approveReport.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@UseInterceptors(new SerializeInterceptor(ReportDTO))
@Controller('reports')
export class ReportsController {
    constructor(private ReportsService: ReportsService) {}

    @Post('')
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
        return this.ReportsService.create(body, user)
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport (@Param('id') id: string, @Body() {isApproved}: ApproveReportDTO) {
        return this.ReportsService.approveReport(id, isApproved)
    }
}
