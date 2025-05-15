
import React from 'react';
import CustomerProfileCard from '@/components/dashboard/CustomerProfileCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const CustomerProfilesPage = () => {
  // Mock data with updated structure
  const customers = [
    {
      id: '1',
      company: '科技有限公司',
      tags: ['高价值客户', '续租意向高', '对服务满意'],
      satisfactionScore: 92,
      dimensionScores: {
        complaintHealth: 88,
        resolutionAbility: 94,
        emotionAssessment: 90,
      },
      riskStatus: '低风险',
      recentActivity: '昨日提交了会议室预订',
    },
    {
      id: '2',
      company: '金融服务公司',
      tags: ['价格敏感', '续租不确定', '需求复杂'],
      satisfactionScore: 68,
      dimensionScores: {
        complaintHealth: 62,
        resolutionAbility: 70,
        emotionAssessment: 65,
      },
      riskStatus: '中风险',
      recentActivity: '三天前投诉空调问题',
    },
    {
      id: '3',
      company: '咨询集团',
      tags: ['长期客户', '扩张可能', '社交活跃'],
      satisfactionScore: 88,
      dimensionScores: {
        complaintHealth: 85,
        resolutionAbility: 92,
        emotionAssessment: 88,
      },
      riskStatus: '低风险',
      recentActivity: '今日参加了园区活动',
    },
    {
      id: '4',
      company: '医疗科技',
      tags: ['增值服务用户', '注重安全', '对环境要求高'],
      satisfactionScore: 76,
      dimensionScores: {
        complaintHealth: 82,
        resolutionAbility: 74,
        emotionAssessment: 71,
      },
      riskStatus: '中风险',
      recentActivity: '上周反馈安全隐患',
    },
    {
      id: '5',
      company: '教育科技',
      tags: ['新客户', '期望值高', '关注成本'],
      satisfactionScore: 82,
      dimensionScores: {
        complaintHealth: 80,
        resolutionAbility: 78,
        emotionAssessment: 89,
      },
      riskStatus: '低风险',
      recentActivity: '今日咨询扩租事宜',
    },
    {
      id: '6',
      company: '传媒公司',
      tags: ['创意空间需求', '关注形象', '活动参与度高'],
      satisfactionScore: 94,
      dimensionScores: {
        complaintHealth: 92,
        resolutionAbility: 95,
        emotionAssessment: 96,
      },
      riskStatus: '低风险',
      recentActivity: '昨日预约参观新区域',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">客户画像</h1>
        <p className="text-muted-foreground">
          查看和管理租户企业的AI生成画像。
        </p>
      </div>

      <Tabs defaultValue="profiles">
        <TabsList>
          <TabsTrigger value="profiles">实时画像</TabsTrigger>
        </TabsList>
        <TabsContent value="profiles" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">企业搜索</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Input placeholder="搜索企业名称..." className="flex-1" />
                <Button>
                  <Search size={16} className="mr-2" />
                  搜索
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {customers.map((customer) => (
              <CustomerProfileCard key={customer.id} profile={customer} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerProfilesPage;
