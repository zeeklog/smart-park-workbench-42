import React from 'react';
import CustomerProfileCard from '@/components/dashboard/CustomerProfileCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
      recentActivity: '昨日预约参观新区域',
    },
  ];

  const pushNotifications = [
    {
      id: '1',
      title: '租户满意度下降预警',
      company: '金融服务公司',
      time: '今天 09:45',
      type: 'warning',
    },
    {
      id: '2',
      title: '月度服务质量报告已生成',
      company: '所有租户',
      time: '昨天 16:30',
      type: 'report',
    },
    {
      id: '3',
      title: '新的租户洞察可用',
      company: '科技有限公司',
      time: '2025-05-12 10:15',
      type: 'insight',
    },
    {
      id: '4',
      title: '项目异常预警：电梯维护',
      company: 'A栋',
      time: '2025-05-10 14:22',
      type: 'warning',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">客户画像</h1>
        <p className="text-muted-foreground">
          查看和管理租户企业的AI生成画像和推送通知。
        </p>
      </div>

      <Tabs defaultValue="profiles">
        <TabsList>
          <TabsTrigger value="profiles">实时画像</TabsTrigger>
          <TabsTrigger value="maintenance">画像维护</TabsTrigger>
          <TabsTrigger value="push">推送管理</TabsTrigger>
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

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>画像维护功能正在开发中...</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                该功能将在下一版本中推出，敬请期待。
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="push" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">推送内容查看</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pushNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <Bell size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {notification.company}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        notification.type === 'warning'
                          ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                          : notification.type === 'report'
                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                          : 'bg-green-100 text-green-800 hover:bg-green-100'
                      }
                    >
                      {notification.type === 'warning'
                        ? '预警'
                        : notification.type === 'report'
                        ? '报告'
                        : '洞察'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerProfilesPage;
