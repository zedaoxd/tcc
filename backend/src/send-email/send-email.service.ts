import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

export enum EmailTemplates {
    REGISTER_CONFIRMATION = 'registerConfirmation',
    RESET_PASSWORD = 'resetPassword',
}

type RegisterConfirmation = {
    template: EmailTemplates.REGISTER_CONFIRMATION;
    variables: {
        verificationLink: string;
        firstName: string;
    };
}

type ResetPassword = {
    template: EmailTemplates.RESET_PASSWORD;
    variables: {
        resetLink: string;
    };
}

type EmailData = {
    to: string;
    subject: string;
} & (RegisterConfirmation | ResetPassword);

@Injectable()
export class SendEmailService {
    constructor(private mailerService: MailerService) { }

    async sendEmail({ subject, to, template, variables }: EmailData) {
        return this.mailerService.sendMail({
            to,
            subject,
            template,
            context: variables,
        });
    }
}
