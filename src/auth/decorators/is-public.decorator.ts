import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/** Decorator to mark a route as public (not protected by auth guard) */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
