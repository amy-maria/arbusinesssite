import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Page Not Found <Link href='/'>Go to Home page</Link></h2>
    </div>
  );
}