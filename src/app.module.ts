import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
@Module({
  imports: [AuthModule, UsersModule, BookmarkModule],
})
export class AppModule {}
