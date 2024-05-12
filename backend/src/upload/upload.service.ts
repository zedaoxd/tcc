import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import * as crypto from 'crypto';

type Storage = 'avatars' | 'video-thumbs';

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

  async uploadFile(file: Express.Multer.File, storage: Storage) {
    const randomNameUUID = crypto.randomUUID();
    const fileName = `${randomNameUUID}-${file.originalname}`;

    const { data, error } = await this.client.storage
      .from(storage)
      .upload(fileName, file.buffer, { upsert: false });

    if (error) {
      throw new BadRequestException(error.message);
    }

    const url = this.client.storage.from(storage).getPublicUrl(data.path);

    return url.data.publicUrl;
  }
}
