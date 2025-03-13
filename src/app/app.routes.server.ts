import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Client, // Disable prerendering for this route
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Client, // Disable prerendering for this route
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender, // Prerender all other routes
  },
];