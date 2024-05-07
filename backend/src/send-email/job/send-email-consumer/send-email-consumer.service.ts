import { Process, Processor } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { EmailTemplates, SendEmailService } from '../../send-email.service';

type EmailData = {
    to: string;
    subject: string;
    template: EmailTemplates;
    variables?: Record<string, string | number>;
};

@Processor('queue:email')
export class SendEmailConsumerService {

    constructor(
        private readonly sendEmailService: SendEmailService,
    ) { }

    @Process('queue:email')
    async execute({ data }: Job<EmailData>) {
        await this.sendEmailService.sendEmail(data);
    }
}
