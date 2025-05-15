
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import ConversationTable from '@/components/dashboard/ConversationTable';
import EmotionCard from '@/components/dashboard/EmotionCard';
import SceneTagsCard from '@/components/dashboard/SceneTagsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Define the correct type for emotions data to fix the TypeScript error
interface EmotionData {
  label: '中性' | '喜' | '焦虑' | '怒';
  count: number;
  percentage: number;
}

const Dashboard = () => {
  // Mock data for emotions
  const emotionsData: EmotionData[] = [
    { label: '中性', count: 75, percentage: 58.6 },
    { label: '喜', count: 30, percentage: 23.4 },
    { label: '焦虑', count: 15, percentage: 11.7 },
    { label: '怒', count: 8, percentage: 6.3 },
  ];

  const sceneTags = [
    { label: '报修', count: 42 },
    { label: '访客', count: 28 },
    { label: '投诉', count: 15 },
    { label: '活动', count: 43 },
  ];

  const intentTags = [
    { label: '续租意向', count: 12 },
    { label: '价格敏感', count: 8 },
    { label: '功能探查', count: 23 },
    { label: '园区活动', count: 15 },
  ];

  const conversations = [
    {
      id: '1',
      channel: '微信' as const,
      userName: '张先生',
      botName: 'AI助手',
      tenant: '科技有限公司',
      enterprise: '未来科技集团',
      project: '智慧园区',
      createdAt: '2025-05-14 09:15',
      tags: {
        emotion: '中性' as const,
        scene: '报修' as const,
      },
    },
    {
      id: '2',
      channel: '小程序' as const,
      userName: '李经理',
      botName: 'AI助手',
      tenant: '金融服务公司',
      enterprise: '华宇金融集团',
      project: '金融中心',
      createdAt: '2025-05-14 10:22',
      tags: {
        emotion: '喜' as const,
        intent: '续租意向' as const,
      },
    },
    {
      id: '3',
      channel: '企微应用' as const,
      userName: '王总',
      botName: 'AI助手',
      tenant: '咨询集团',
      enterprise: '睿智咨询',
      project: '创新园',
      createdAt: '2025-05-14 11:05',
      tags: {
        emotion: '怒' as const,
        scene: '投诉' as const,
        intent: '价格敏感' as const,
      },
    },
    {
      id: '4',
      channel: '微信' as const,
      userName: '刘助理',
      botName: 'AI助手',
      tenant: '医疗科技',
      enterprise: '健康医疗集团',
      project: '生命科学园',
      createdAt: '2025-05-14 13:30',
      tags: {
        emotion: '焦虑' as const,
        scene: '访客' as const,
      },
    },
    {
      id: '5',
      channel: '小程序' as const,
      userName: '陈经理',
      botName: 'AI助手',
      tenant: '教育科技',
      enterprise: '未来教育科技',
      project: '知识园区',
      createdAt: '2025-05-14 14:45',
      tags: {
        emotion: '中性' as const,
        scene: '活动' as const,
        intent: '园区活动' as const,
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">园区AI工作台</h1>
        <p className="text-muted-foreground">
          欢迎回来，这里是您的服务数据概览。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md">实时客户对话监控</CardTitle>
              <Button variant="outline" size="sm">
                查看全部
              </Button>
            </CardHeader>
            <CardContent>
              <ConversationTable conversations={conversations} />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <EmotionCard emotions={emotionsData} total={128} />
          <div className="grid grid-cols-1 gap-4">
            <SceneTagsCard
              title="客户场景标签"
              tags={sceneTags}
              badgeClassName="ai-tag scene"
            />
            <SceneTagsCard
              title="客户意图标签"
              tags={intentTags}
              badgeClassName="ai-tag intent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
