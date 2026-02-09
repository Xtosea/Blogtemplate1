Images often slow down websites, but Next.js offers built-in solutions to optimize images automatically.

## Using the Image Component
The `<Image>` component handles lazy loading, resizing, and WebP support automatically. Example:

```tsx
import Image from 'next/image';

<Image src="/hero.jpg" alt="Hero Image" width={800} height={600} />