import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Activity,
  Users,
  FileText,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { collapsed } = searchParams;

  return (
    <DashboardLayout collapsed={collapsed === 'true'}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground max-sm:hidden">
            Welcome back! Here's your dashboard summary.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$84.3K</div>
              <div className="flex items-center text-xs text-emerald-500">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +12.5% from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,453</div>
              <div className="flex items-center text-xs text-red-500">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                -2.1% from last week
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
              <FileText className="h-4 w-4 text-violet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">432</div>
              <div className="flex items-center text-xs text-emerald-500">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +8.2% from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.2%</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Sections Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <Link className="contents" href="/analytics">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Analytics</CardTitle>
                  <BarChart className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>
                  Track website performance metrics and user behavior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[100px] w-full bg-muted/20 rounded-lg flex items-center justify-center">
                  Analytics Preview
                </div>
                <Button className="mt-4 w-full">View Analytics</Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link className="contents" href="/customers">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Customers</CardTitle>
                  <Users className="h-5 w-5 text-green-500" />
                </div>
                <CardDescription>Manage and analyze your customer base</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[100px] w-full bg-muted/20 rounded-lg flex items-center justify-center">
                  Customer Overview
                </div>
                <Button className="mt-4 w-full">View Customers</Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link className="contents" href="/reports">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Reports</CardTitle>
                  <FileText className="h-5 w-5 text-violet-500" />
                </div>
                <CardDescription>Access and generate detailed reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[100px] w-full bg-muted/20 rounded-lg flex items-center justify-center">
                  Reports Overview
                </div>
                <Button className="mt-4 w-full">View Reports</Button>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current status of your dashboard components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Analytics Service</span>
                </div>
                <span className="text-sm text-muted-foreground">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Customer Database</span>
                </div>
                <span className="text-sm text-muted-foreground">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Report Generation</span>
                </div>
                <span className="text-sm text-muted-foreground">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <span>Data Sync</span>
                </div>
                <span className="text-sm text-muted-foreground">Minor Delays</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
