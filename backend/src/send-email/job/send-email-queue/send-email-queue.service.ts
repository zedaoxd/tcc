import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { EmailTemplates } from 'src/send-email/send-email.service';

type EmailData = {
    to: string;
    subject: string;
    template: EmailTemplates;
    variables?: Record<string, string | number>;
};

@Injectable()
export class SendEmailQueueService {
    constructor(@InjectQueue('queue:email') private sendEmailQueue: Queue) { }

    async execute(data: EmailData) {
        await this.sendEmailQueue.add('queue:email', data);
    }
}
