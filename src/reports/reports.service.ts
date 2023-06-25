import { Injectable, BadRequestException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { Report } from './entity/reports.entity';
import { CreateReportDTO } from './DTOS/createReports.dto';
import { User } from 'src/user/entity/user.entity';
import { ApproveReportDTO } from './DTOS/approveReport.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

    async create(body: CreateReportDTO, user: User) {
        const report = this.repo.create(body)
        report.user = user
        return await this.repo.save(report)
    }

    async approveReport(id: string, isApproved: boolean) {
        const report = await this.repo.findOneBy({id})
        if (!report) {
            throw new BadRequestException('Report Not Found')
        }
        report.approved = isApproved
        await this.repo.save(report)
    }
}
