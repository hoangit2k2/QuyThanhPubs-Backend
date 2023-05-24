import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [AuthModule, UsersModule, BookmarkModule, UsersModule],
})
export class AppModule {}
