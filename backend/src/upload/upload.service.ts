import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import * as crypto from 'crypto';

type Storage = 'avatars' | 'video-thumbs' | 'videos';

@Injectable()
export class UploadService {
  private readonly client: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    this.client = new SupabaseClient(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_KEY'),
      { auth: { persistSession: false } },
    );
  }

  async uploadFile(
    file: Express.Multer.File,
    storage: Storage,
    folder?: string,
  ): Promise<string> {
    const randomNameUUID = crypto.randomUUID();
    const path = folder
      ? `${folder}/${randomNameUUID}-${file.originalname}`
      : `${randomNameUUID}-${file.originalname}`;

    const { data, error } = await this.client.storage
      .from(storage)
      .upload(path, file.buffer, {
        upsert: false,
        contentType: file.mimetype,
      });

    if (error) {
      throw new BadRequestException(error.message);
    }

    const url = this.client.storage.from(storage).getPublicUrl(data.path);

    return url.data.publicUrl;
  }
}
