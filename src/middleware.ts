import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware();

export const config = {
  matcher: ['/', '/new-post', '/new-post/:orgId*' , '/posts/:orgId*', '/posts/edit/:postId*'],
};
