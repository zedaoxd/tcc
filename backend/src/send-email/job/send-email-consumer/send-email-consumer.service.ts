import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailData, SendEmailService } from '../../send-email.service';

@Processor('queue:email')
export class SendEmailConsumerService {
  constructor(private readonly sendEmailService: SendEmailService) {}

  @Process('queue:email')
  async execute({ data }: Job<EmailData>) {
    await this.sendEmailService.sendEmail(data);
  }
}
