"use client"

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Users,
  ArrowRight,
  TrendingDown,
  MessageSquare,
  Calendar,
  Phone,
  Mail,
  Clock,
  X
} from 'lucide-react';

// First, install lucide-react if not already installed
// npm install lucide-react

const Dashboard = () => {
  const [selectedPhysio, setSelectedPhysio] = useState('all');

  // Key metrics that matter most
  const keyMetrics = [
    {
      title: "Overall Retention",
      value: "64%",
      trend: "↓ 5%",
      trendDirection: "down",
      subtext: "vs last week"
    },
    {
      title: "IA Conversions",
      value: "72%",
      trend: "↓ 8%",
      trendDirection: "down",
      subtext: "target: 85%"
    },
    {
      title: "Revenue at Risk",
      value: "£4.2k",
      trend: "from dropouts",
      trendDirection: "up",
      subtext: "this month"
    }
  ];

  // Journey stages data
  const journeyStages = [
    {
      stage: "Pre-First Visit",
      total: 45,
      dropouts: 12,
      dropoutRate: "26.7%",
      reasons: [
        "No-shows for first appointment",
        "Last-minute cancellations",
        "Unable to contact"
      ],
      actions: [
        { 
          text: "Contact 8 upcoming IAs for confirmation",
          priority: "high",
          type: "call"
        },
        { 
          text: "Follow up 4 cancelled bookings",
          priority: "medium",
          type: "email"
        }
      ]
    },
    {
      stage: "Initial Assessment",
      total: 33,
      dropouts: 9,
      dropoutRate: "27.3%",
      reasons: [
        "No follow-up booking",
        "Cost concerns",
        "Not convinced about treatment plan"
      ],
      actions: [
        { 
          text: "Priority: Contact 5 IAs from last week",
          priority: "high",
          type: "call" 
        },
        { 
          text: "Send treatment plans to 3 pending patients",
          priority: "medium",
          type: "email"
        }
      ]
    }
  ];

  const MetricCard = ({ metric }) => (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600">{metric.title}</p>
          <p className="text-3xl font-bold">{metric.value}</p>
        </div>
        <Badge className={
          metric.trendDirection === 'down' ? 'bg-red-100 text-red-800' :
          metric.trendDirection === 'up' && metric.title === 'Revenue at Risk' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }>
          {metric.trend}
        </Badge>
      </div>
      <p className="text-xs text-gray-600 mt-1">{metric.subtext}</p>
    </Card>
  );

  const ActionButton = ({ action }) => (
    <Button 
      variant="outline" 
      className="w-full justify-start mb-2"
    >
      <div className="flex items-center gap-2">
        {action.type === 'call' && <Phone className="h-4 w-4 text-blue-600" />}
        {action.type === 'email' && <Mail className="h-4 w-4 text-green-600" />}
        {action.type === 'offer' && <MessageSquare className="h-4 w-4 text-purple-600" />}
        <div className="flex-1">
          <p className="text-sm">{action.text}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge className={
              action.priority === 'high' ? 'bg-red-100 text-red-800' :
              action.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }>
              {action.priority}
            </Badge>
            <span className="text-xs text-gray-600">One-tap action</span>
          </div>
        </div>
      </div>
    </Button>
  );

  const JourneyStageCard = ({ stage, isLast }) => (
    <div className="relative">
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">{stage.stage}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{stage.total} patients</span>
            </div>
          </div>
          <div className="text-right">
            <Badge className="bg-red-100 text-red-800">
              {stage.dropoutRate} drop-off
            </Badge>
            <p className="text-sm text-gray-600 mt-1">
              {stage.dropouts} patients lost
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Key Issues</h4>
            <div className="space-y-2">
              {stage.reasons.map((reason, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <X className="h-4 w-4 text-red-500" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">Immediate Actions</h4>
            {stage.actions.map((action, idx) => (
              <ActionButton key={idx} action={action} />
            ))}
          </div>
        </div>
      </Card>
      {!isLast && (
        <div className="flex justify-center my-4">
          <ArrowRight className="h-6 w-6 text-gray-400" />
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold">Patient Journey & Retention</h1>
              <p className="text-gray-600">Track and improve patient retention at each stage</p>
            </div>
            <Select 
              value={selectedPhysio}
              onValueChange={setSelectedPhysio}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Staff</SelectItem>
                <SelectItem value="physio-jane">Dr. Jane Smith</SelectItem>
                <SelectItem value="physio-mike">Dr. Mike Johnson</SelectItem>
                <SelectItem value="receptionist">Reception Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {keyMetrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>
        </div>

        {/* Journey Stages */}
        <div className="space-y-4">
          {journeyStages.map((stage, index) => (
            <JourneyStageCard 
              key={index} 
              stage={stage} 
              isLast={index === journeyStages.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;