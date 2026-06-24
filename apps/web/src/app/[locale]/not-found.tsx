import { NavLink, Button } from '@nexus/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div>
          <h1 className="text-6xl font-bold text-blue-600 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-700">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <NavLink href="/">
            <Button variant="primary">Go Home</Button>
          </NavLink>
          <NavLink href="/news">
            <Button variant="secondary">Browse News</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
