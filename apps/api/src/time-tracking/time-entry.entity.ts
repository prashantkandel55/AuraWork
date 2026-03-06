import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../employees/employee.entity';

@Entity({ name: 'time_entries' })
export class TimeEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @ManyToOne(() => Employee)
  employee: Employee;

  @Column({ name: 'shift_id', nullable: true })
  shiftId?: string | null;

  @Column({ name: 'clock_in_at', type: 'timestamptz', nullable: true })
  clockInAt: Date | null;

  @Column({ name: 'clock_out_at', type: 'timestamptz', nullable: true })
  clockOutAt: Date | null;

  @Column({ name: 'clock_in_lat', type: 'double precision', nullable: true })
  clockInLat?: number;

  @Column({ name: 'clock_in_lng', type: 'double precision', nullable: true })
  clockInLng?: number;

  @Column({ name: 'clock_out_lat', type: 'double precision', nullable: true })
  clockOutLat?: number;

  @Column({ name: 'clock_out_lng', type: 'double precision', nullable: true })
  clockOutLng?: number;

  @Column({ default: 'MOBILE' })
  source: 'MOBILE' | 'ADMIN_EDIT';

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

