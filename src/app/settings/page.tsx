import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Settings2, Bell, Shield, Palette } from 'lucide-react';

export default function SettingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { collapsed } = searchParams;
  return (
    <DashboardLayout collapsed={collapsed === 'true'}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings2 className="h-5 w-5" />
                <CardTitle>General Settings</CardTitle>
              </div>
              <CardDescription>Configure your general account settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Account Name</label>
                <Input placeholder="Enter account name" defaultValue="My Dashboard" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="Enter email" defaultValue="user@example.com" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Manage your notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive email updates</div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive push notifications</div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>Manage your security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>Customize the look and feel.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Theme</div>
                  <div className="text-sm text-muted-foreground">Select your preferred theme</div>
                </div>
                <Button variant="outline">Customize</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Language</div>
                  <div className="text-sm text-muted-foreground">Choose your language</div>
                </div>
                <Button variant="outline">Select</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
