import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { TimeEntry } from './time-entry.entity';

interface AuthedUser {
  userId: string;
  tenantId: string;
}

interface ClockDto {
  lat?: number;
  lng?: number;
}

@Injectable()
export class TimeTrackingService {
  constructor(@InjectRepository(TimeEntry) private readonly repo: Repository<TimeEntry>) {}

  async clockIn(user: AuthedUser, dto: ClockDto) {
    const openEntry = await this.repo.findOne({
      where: { tenantId: user.tenantId, employeeId: user.userId, clockOutAt: IsNull() },
    });
    if (openEntry) {
      throw new BadRequestException('Already clocked in');
    }
    const entry = this.repo.create({
      tenantId: user.tenantId,
      employeeId: user.userId,
      clockInAt: new Date(),
      clockInLat: dto.lat,
      clockInLng: dto.lng,
      source: 'MOBILE',
    });
    return this.repo.save(entry);
  }

  async clockOut(user: AuthedUser, dto: ClockDto) {
    const openEntry = await this.repo.findOne({
      where: { tenantId: user.tenantId, employeeId: user.userId, clockOutAt: IsNull() },
      order: { clockInAt: 'DESC' },
    });
    if (!openEntry) {
      throw new BadRequestException('No open shift to clock out from');
    }
    openEntry.clockOutAt = new Date();
    openEntry.clockOutLat = dto.lat;
    openEntry.clockOutLng = dto.lng;
    return this.repo.save(openEntry);
  }
}

