import {
  ArrowRight,
  Calendar,
  ChefHat,
  CloudCog,
  Code,
  Database,
  FileCheck,
  FileType,
  Github,
  HardDrive,
  KeyRound,
  Layers,
  Lock,
  Mail,
  MailIcon,
  Paintbrush,
  Router,
  Search,
  Server,
} from 'lucide-react';
import { Link } from 'react-router';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Image } from '~/components/ui/image/image';

export default function Route() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full">
          <div className="absolute inset-0 z-0 w-full">
            <Image
              src="/img/top/img_hero.png"
              alt="Restaurant ambiance"
              className="w-full h-full object-cover brightness-[0.4]"
            />
          </div>
          <div className="container mx-auto relative z-10 py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-5">
              <Badge
                variant="outline"
                className="bg-background/20 text-white border-white px-4 py-1"
              >
                Portfolio Project
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Discover and reserve top restaurants instantly
              </h1>
              <p className="text-xl text-gray-200">
                Built to showcase modern web development skills with a focus on user experience and
                clean design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/booking">
                  <Button
                    size="lg"
                    className="gap-2 bg-white hover:bg-white/90 text-primary font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  >
                    Explore Restaurants <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href="https://github.com/YuichiNabeshima/my-booking"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 text-white border-white hover:bg-white/80 gap-2 cursor-pointer"
                  >
                    <Github className="h-4 w-4" /> See the Code
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Feature Highlights</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                A comprehensive restaurant reservation system with modern UI components and seamless
                user experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {/* Feature 1: Restaurant Discovery */}
              <Card className="overflow-hidden py-0">
                <div className="relative h-84">
                  <Image
                    src="/img/top/img_feature_01.png"
                    alt="Restaurant discovery"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Search className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold">Restaurant Discovery</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Easily search and discover your favorite restaurants. Filter by cuisine type,
                    price range, and location to find the perfect spot.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span>Browse restaurants with clean pagination (6 per page)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span>Filter by cuisine type, neighborhood, and price level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span>Search functionality with instant results</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 2: Detailed Restaurant Pages */}
              <Card className="overflow-hidden py-0">
                <div className="relative h-84">
                  <Image
                    src="/img/top/img_feature_02.png"
                    alt="Restaurant details"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <ChefHat className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold">Detailed Restaurant Pages</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    View comprehensive restaurant details including menus, photos, business hours,
                    and reviews - all the information you need for making a reservation.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span>Hero image slider showcasing restaurant ambiance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span>Tabbed layout with info, photo gallery, and business hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span>Select guests, course, and date to see available time slots</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 3: Seamless Booking */}
              <Card className="overflow-hidden py-0">
                <div className="relative h-84">
                  <Image
                    src="/img/top/img_feature_03.png"
                    alt="Booking process"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold">Seamless Booking</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    A simple and intuitive booking process. Just select your preferred date, time,
                    number of guests, and course to complete your reservation.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span>Streamlined booking flow with name & email form</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span>Verification email sent with a secure JWT-based link</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span>Confirm reservation without account registration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span>Dev-mode debug button shows email content for testing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 4: Admin Dashboard */}
              <Card className="overflow-hidden py-0">
                <div className="relative h-84">
                  <Image
                    src="/img/top/img_feature_04.png"
                    alt="Admin dashboard"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Lock className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold">Admin Dashboard</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    A comprehensive admin dashboard for restaurant owners to manage reservations,
                    update menus, and configure business hours all in one place.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span>Login-protected dashboard for restaurant owners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span>View today's reservations with status tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span>Update store info, hours, and booking limits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span>Upload images (stored via AWS S3)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Restaurant Preview Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Restaurant Experience
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Preview the user interface for restaurant details and booking
              </p>
            </div>

            <Link to="/booking" className="max-w-4xl mx-auto relative group block">
              <div className="rounded-xl overflow-hidden border shadow-lg">
                <Image
                  src="/img/top/img_preview.png"
                  alt="Restaurant detail page screenshot"
                  className="w-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col items-center justify-center">
                <p className="text-white text-xl font-medium mb-6">
                  Experience the full interactive demo
                </p>
                <Button size="lg" className="gap-2 cursor-pointer">
                  Try the Demo <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Link>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Click the screenshot or the buttons to explore the full interactive experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/booking">
                  <Button className="gap-2 cursor-pointer">
                    <Search className="h-4 w-4" /> Browse Restaurants
                  </Button>
                </Link>
                <Link to="/booking/0037b559-1ef0-464d-8d9a-e5a2114b3387">
                  <Button variant="outline" className="gap-2 cursor-pointer">
                    <Calendar className="h-4 w-4" /> Make a Reservation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                A simple three-step process to book your table
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  <Search className="h-8 w-8" />
                </div>
                <div className="relative mb-4">
                  <div className="text-4xl font-bold text-primary">1</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Search and Select</h3>
                <p className="text-muted-foreground">
                  Browse through our curated list of restaurants and find the perfect spot for your
                  occasion.
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  <Calendar className="h-8 w-8" />
                </div>
                <div className="relative mb-4">
                  <div className="text-4xl font-bold text-primary">2</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Pick Date and Time</h3>
                <p className="text-muted-foreground">
                  Select your preferred date, number of guests, and choose from available time
                  slots.
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <div className="relative mb-4">
                  <div className="text-4xl font-bold text-primary">3</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Confirm Booking</h3>
                <p className="text-muted-foreground">
                  Receive a confirmation email and simply click the secure link to confirm your
                  reservation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section - UPDATED */}
        <section id="tech-stack" className="py-16 md:py-24 bg-muted">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Tech Stack</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Built with modern technologies to showcase full-stack development skills
              </p>
            </div>

            {/* Frontend Technologies */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Frontend</h3>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <a href="https://reactrouter.com/" target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Router className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-semibold">React Router</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Framework Mode for routing and SSR/API integration
                      </p>
                    </CardContent>
                  </Card>
                </a>

                <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <FileType className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-semibold">TypeScript</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Safer, typed codebase with enhanced developer experience
                      </p>
                    </CardContent>
                  </Card>
                </a>

                <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Paintbrush className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-semibold">TailwindCSS</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Utility-first styling for rapid UI development
                      </p>
                    </CardContent>
                  </Card>
                </a>

                <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Layers className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-semibold">shadcn/ui</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Reusable, accessible UI components with consistent design
                      </p>
                    </CardContent>
                  </Card>
                </a>

                <a href="https://v0.dev" target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Code className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-semibold">v0</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Used to scaffold the UI design with AI assistance
                      </p>
                    </CardContent>
                  </Card>
                </a>
              </div>
            </div>

            {/* Backend Technologies */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Backend</h3>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <a href="https://www.prisma.io" target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Database className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-semibold">Prisma</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        ORM for database access with type safety and migrations
                      </p>
                    </CardContent>
                  </Card>
                </a>

                <a href="https://www.postgresql.org" target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <HardDrive className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-semibold">PostgreSQL</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Relational database for structured data storage
                      </p>
                    </CardContent>
                  </Card>
                </a>

                <a href="https://upstash.com" target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Database className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-semibold">Redis (Upstash)</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Session management and caching for performance
                      </p>
                    </CardContent>
                  </Card>
                </a>

                <a href="https://jwt.io" target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <KeyRound className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-semibold">jsonwebtoken</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Used for token-based reservation confirmation
                      </p>
                    </CardContent>
                  </Card>
                </a>

                <a href="https://zod.dev" target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <FileCheck className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-semibold">zod + Conform</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Robust form validation with excellent user experience
                      </p>
                    </CardContent>
                  </Card>
                </a>
              </div>
            </div>

            {/* Infrastructure Technologies */}
            <div>
              <div className="flex items-center gap-3 mb-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Infrastructure</h3>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <a href="https://fly.io" target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <CloudCog className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-semibold">fly.io</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        App hosting and scheduler for reliable deployment
                      </p>
                    </CardContent>
                  </Card>
                </a>

                <a href="https://aws.amazon.com/s3" target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <HardDrive className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-semibold">Amazon S3</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        For image uploads and delivery with high availability
                      </p>
                    </CardContent>
                  </Card>
                </a>

                <a href="https://aws.amazon.com/ses" target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <MailIcon className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-semibold">Amazon SES</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Transactional emails with secure confirmation links
                      </p>
                    </CardContent>
                  </Card>
                </a>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-muted-foreground mb-6">
                This tech stack demonstrates proficiency in modern web development technologies and
                best practices
              </p>
              <a
                href="https://github.com/YuichiNabeshima/my-booking"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-background/10 text-primary-foreground border-primary-foreground hover:bg-background/20 gap-2"
                >
                  <Github className="h-4 w-4" /> View Complete Source Code
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl bg-primary/90 p-8 md:p-12 text-primary-foreground">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Ready to explore?
                  </h2>
                  <p className="text-lg opacity-90">
                    Check out the demo or view the source code to see how this restaurant
                    reservation system was built.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                  <Link to="/booking">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="gap-2 font-medium shadow-lg hover:shadow-xl transition-all bg-background text-foreground hover:bg-background/90 cursor-pointer"
                    >
                      Try Demo <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <a
                    href="https://github.com/YuichiNabeshima/my-booking"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-background/10 text-primary-foreground border-primary-foreground hover:bg-background/20 gap-2 cursor-pointer"
                    >
                      <Github className="h-4 w-4" /> View Code
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Note Section */}
        <section className="py-8 md:py-12 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">
                Portfolio Project
              </Badge>
              <h3 className="text-xl font-bold mb-4">About This Project</h3>
              <p className="text-muted-foreground mb-4">
                This restaurant reservation app was built as a portfolio project to showcase
                full-stack development skills for job hunting in Vancouver. While it looks and
                functions like a real product, it's designed to demonstrate technical proficiency
                and UI/UX design capabilities.
              </p>
              <p className="text-sm text-muted-foreground">
                Created by Yuichi Nabeshima • {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
