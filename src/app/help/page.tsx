
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, MessageCircle, Mail, Phone, Video } from 'lucide-react';

const helpTopics = [
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Read our comprehensive guides and documentation',
    action: 'Browse Docs',
  },
  {
    icon: MessageCircle,
    title: 'Community Forum',
    description: 'Connect with other users and share solutions',
    action: 'Join Discussion',
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get help from our support team via email',
    action: 'Send Email',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Watch step-by-step video tutorials',
    action: 'Watch Now',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak directly with our support team',
    action: 'Call Now',
  },
];

export default function HelpPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { collapsed } = searchParams;

  return (
    <DashboardLayout collapsed={collapsed === 'true'}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Help & Support</h1>

        <Card>
          <CardHeader>
            <CardTitle>How can we help?</CardTitle>
            <CardDescription>Search our knowledge base or browse common topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search help articles..." />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {helpTopics.map(topic => (
            <Card key={topic.title}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <topic.icon className="h-5 w-5" />
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription>{topic.description}</CardDescription>
                <Button variant="outline" className="w-full">
                  {topic.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Still need help?</CardTitle>
            <CardDescription>Contact our support team directly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="Enter the subject of your inquiry" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Message</label>
              <textarea
                className="min-h-[100px] w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                placeholder="Describe your issue..."
              />
            </div>
            <Button>Submit Request</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
