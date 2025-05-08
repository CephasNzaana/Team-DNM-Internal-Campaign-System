import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, AreaChart, PieChart, PieActiveArc } from '@/components/ui/charts';
import { Badge } from "@/components/ui/badge";
import { DNM_THEME } from '@/lib/theme';

// Theme-consistent colors
const chartColors = {
  primary: DNM_THEME.colors.green,
  secondary: DNM_THEME.colors.yellow,
  tertiary: DNM_THEME.colors.red,
  neutral: DNM_THEME.colors.cream,
  warmNeutral: DNM_THEME.colors.warmCream,
  light: DNM_THEME.colors.lightYellow,
};

const AnalyticsPage: React.FC = () => {
  // Sample analytics data
  const voterData = {
    supportDistribution: [
      { name: 'Strong Support', value: 35 },
      { name: 'Leaning Support', value: 25 },
      { name: 'Undecided', value: 20 },
      { name: 'Leaning Against', value: 12 },
      { name: 'Opposed', value: 8 },
    ],
    monthlyEngagement: [
      { name: 'Jan', Interactions: 120 },
      { name: 'Feb', Interactions: 150 },
      { name: 'Mar', Interactions: 200 },
      { name: 'Apr', Interactions: 250 },
      { name: 'May', Interactions: 300 },
    ],
    byParish: [
      { name: 'Central', value: 32 },
      { name: 'Northern', value: 24 },
      { name: 'Southern', value: 18 },
      { name: 'Western', value: 26 },
    ],
    byDemographic: [
      { name: 'Youth', value: 38 },
      { name: 'Middle Age', value: 42 },
      { name: 'Senior', value: 20 },
    ]
  };
  
  const resourceData = {
    budgetAllocation: [
      { name: 'Jan', Budget: 3000, Spent: 2800 },
      { name: 'Feb', Budget: 3500, Spent: 3200 },
      { name: 'Mar', Budget: 4000, Spent: 3800 },
      { name: 'Apr', Budget: 4500, Spent: 4300 },
      { name: 'May', Budget: 5000, Spent: 4600 },
    ],
    resourceUtilization: [
      { name: 'Materials', value: 35 },
      { name: 'Transportation', value: 25 },
      { name: 'Venue Rental', value: 15 },
      { name: 'Staffing', value: 20 },
      { name: 'Advertising', value: 5 },
    ],
    volunteerHours: [
      { name: 'Jan', Hours: 120 },
      { name: 'Feb', Hours: 180 },
      { name: 'Mar', Hours: 220 },
      { name: 'Apr', Hours: 280 },
      { name: 'May', Hours: 350 },
    ]
  };
  
  const campaignData = {
    eventAttendance: [
      { name: 'Rallies', Actual: 90, Expected: 80 },
      { name: 'Meetings', Actual: 95, Expected: 100 },
      { name: 'Canvassing', Actual: 85, Expected: 70 },
      { name: 'Media', Actual: 75, Expected: 80 },
      { name: 'Fundraisers', Actual: 80, Expected: 85 },
    ],
    taskCompletion: [
      { name: 'Jan', Completed: 75, Total: 100 },
      { name: 'Feb', Completed: 82, Total: 100 },
      { name: 'Mar', Completed: 87, Total: 100 },
      { name: 'Apr', Completed: 90, Total: 100 },
      { name: 'May', Completed: 85, Total: 100 },
    ],
    supportTrend: [
      { name: 'Jan', Support: 45 },
      { name: 'Feb', Support: 48 },
      { name: 'Mar', Support: 52 },
      { name: 'Apr', Support: 57 },
      { name: 'May', Support: 63 },
    ]
  };
  
  const communicationData = {
    callAnalytics: {
      total: 245,
      completed: 180,
      voicemail: 42,
      noAnswer: 23,
      averageDuration: 4.5,
      supportChanges: 35
    },
    callVolume: [
      { name: 'Mon', Calls: 45 },
      { name: 'Tue', Calls: 52 },
      { name: 'Wed', Calls: 48 },
      { name: 'Thu', Calls: 56 },
      { name: 'Fri', Calls: 38 },
      { name: 'Sat', Calls: 30 },
      { name: 'Sun', Calls: 25 },
    ],
    messageCategories: [
      { name: 'Support', value: 40 },
      { name: 'Complaint', value: 20 },
      { name: 'Information', value: 25 },
      { name: 'Media', value: 10 },
      { name: 'Other', value: 5 },
    ]
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Campaign Analytics</h1>
        <p className="text-muted-foreground">Data-driven insights for campaign strategy</p>
      </div>
      
      <Tabs defaultValue="voters">
        <TabsList>
          <TabsTrigger value="voters">Voter Engagement</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="campaign">Campaign Performance</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>
        
        <TabsContent value="voters" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Voter Engagement</CardTitle>
                <CardDescription>Interactions with voters over time</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={voterData.monthlyEngagement}
                  index="name"
                  categories={["Interactions"]}
                  colors={[chartColors.primary]}
                  yAxisWidth={40}
                  height={300}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Support Distribution</CardTitle>
                <CardDescription>Voter support levels</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={voterData.supportDistribution}
                  index="name"
                  category="value"
                  colors={[
                    chartColors.primary, 
                    chartColors.secondary, 
                    chartColors.neutral, 
                    chartColors.warmNeutral, 
                    chartColors.tertiary
                  ]}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Support by Parish</CardTitle>
                <CardDescription>Geographic distribution of support</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={voterData.byParish}
                  index="name"
                  categories={["value"]}
                  colors={["green"]}
                  yAxisWidth={40}
                  height={300}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Support by Demographic</CardTitle>
                <CardDescription>Age group distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={voterData.byDemographic}
                  index="name"
                  categories={["value"]}
                  colors={["green"]}
                  yAxisWidth={40}
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation and Spending</CardTitle>
                <CardDescription>Monthly budget vs. actual spending</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={resourceData.budgetAllocation}
                  index="name"
                  categories={["Budget", "Spent"]}
                  colors={["#4CAF50", "#FF9800"]}
                  yAxisWidth={50}
                  height={300}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
                <CardDescription>How resources are being allocated</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={resourceData.resourceUtilization}
                  index="name"
                  category="value"
                  colors={["#306030", "#4CAF50", "#8BC34A", "#CDDC39", "#FFC107"]}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Hours</CardTitle>
              <CardDescription>Monthly volunteer contribution</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={resourceData.volunteerHours}
                index="name"
                categories={["Hours"]}
                colors={["green"]}
                yAxisWidth={40}
                height={300}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="campaign" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Event Performance</CardTitle>
                <CardDescription>Expected vs. actual attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={campaignData.eventAttendance}
                  index="name"
                  categories={["Expected", "Actual"]}
                  colors={["#FFC107", "#4CAF50"]}
                  yAxisWidth={40}
                  height={300}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Task Completion Rate</CardTitle>
                <CardDescription>Monthly task completion percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={campaignData.taskCompletion}
                  index="name"
                  categories={["Completed", "Total"]}
                  colors={["#4CAF50", "#E0E0E0"]}
                  stacked
                  yAxisWidth={40}
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Voter Support Trend</CardTitle>
              <CardDescription>Monthly support percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={campaignData.supportTrend}
                index="name"
                categories={["Support"]}
                colors={["#4CAF50"]}
                yAxisWidth={40}
                valueFormatter={(value) => `${value}%`}
                height={300}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="communication" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Call Statistics</CardTitle>
                <CardDescription>Overview of call performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Calls</span>
                    <Badge className="bg-blue-500">{communicationData.callAnalytics.total}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completed</span>
                    <Badge className="bg-green-500">{communicationData.callAnalytics.completed}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Voicemail</span>
                    <Badge className="bg-yellow-500">{communicationData.callAnalytics.voicemail}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">No Answer</span>
                    <Badge className="bg-red-500">{communicationData.callAnalytics.noAnswer}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Duration</span>
                    <Badge className="bg-purple-500">{communicationData.callAnalytics.averageDuration} min</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Support Changes</span>
                    <Badge className="bg-orange-500">{communicationData.callAnalytics.supportChanges}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Call Volume</CardTitle>
                <CardDescription>Calls by day of week</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={communicationData.callVolume}
                  index="name"
                  categories={["Calls"]}
                  colors={["#4CAF50"]}
                  yAxisWidth={40}
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Message Categories</CardTitle>
              <CardDescription>Types of messages received</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-[500px]">
                <PieChart
                  data={communicationData.messageCategories}
                  index="name"
                  category="value"
                  colors={["#4CAF50", "#F44336", "#2196F3", "#FFC107", "#9E9E9E"]}
                  className="h-[300px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
