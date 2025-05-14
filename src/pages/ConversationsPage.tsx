
import React, { useState } from 'react';
import ConversationTable, { Conversation } from '@/components/dashboard/ConversationTable';
import EmotionCard from '@/components/dashboard/EmotionCard';
import SceneTagsCard from '@/components/dashboard/SceneTagsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const ConversationsPage = () => {
  const [activeTab, setActiveTab] = useState('enterprise');

  // Mock data
  const emotionsData = [
    { label: '中性', count: 175, percentage: 58.6 },
    { label: '喜', count: 70, percentage: 23.4 },
    { label: '焦虑', count: 35, percentage: 11.7 },
    { label: '怒', count: 19, percentage: 6.3 },
  ];

  const sceneTags = [
    { label: '报修', count: 82 },
    { label: '访客', count: 58 },
    { label: '投诉', count: 35 },
    { label: '活动', count: 73 },
  ];

  const intentTags = [
    { label: '续租意向', count: 42 },
    { label: '价格敏感', count: 28 },
    { label: '功能探查', count: 63 },
    { label: '园区活动', count: 55 },
  ];

  const conversations: Conversation[] = [
    {
      id: '1',
      channel: '微信',
      userName: '张先生',
      botName: 'AI助手',
      tenant: '科技有限公司',
      project: '智慧园区',
      createdAt: '2025-05-14 09:15',
      tags: {
        emotion: '中性',
        scene: '报修',
      },
    },
    {
      id: '2',
      channel: '小程序',
      userName: '李经理',
      botName: 'AI助手',
      tenant: '金融服务公司',
      project: '金融中心',
      createdAt: '2025-05-14 10:22',
      tags: {
        emotion: '喜',
        intent: '续租意向',
      },
    },
    {
      id: '3',
      channel: '企微应用',
      userName: '王总',
      botName: 'AI助手',
      tenant: '咨询集团',
      project: '创新园',
      createdAt: '2025-05-14 11:05',
      tags: {
        emotion: '怒',
        scene: '投诉',
        intent: '价格敏感',
      },
    },
    {
      id: '4',
      channel: '微信',
      userName: '刘助理',
      botName: 'AI助手',
      tenant: '医疗科技',
      project: '生命科学园',
      createdAt: '2025-05-14 13:30',
      tags: {
        emotion: '焦虑',
        scene: '访客',
      },
    },
    {
      id: '5',
      channel: '小程序',
      userName: '陈经理',
      botName: 'AI助手',
      tenant: '教育科技',
      project: '知识园区',
      createdAt: '2025-05-14 14:45',
      tags: {
        emotion: '中性',
        scene: '活动',
        intent: '园区活动',
      },
    },
    {
      id: '6',
      channel: '企微应用',
      userName: '赵总监',
      botName: 'AI助手',
      tenant: '传媒公司',
      project: '文创园',
      createdAt: '2025-05-14 15:10',
      tags: {
        emotion: '喜',
        scene: '活动',
      },
    },
    {
      id: '7',
      channel: '微信',
      userName: '孙经理',
      botName: 'AI助手',
      tenant: '科技创新',
      project: '智慧园区',
      createdAt: '2025-05-14 16:25',
      tags: {
        emotion: '中性',
        intent: '功能探查',
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">企业对话分析</h1>
        <p className="text-muted-foreground">
          管理和分析与企业客户的AI对话数据。
        </p>
      </div>

      <Tabs defaultValue="enterprise" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="enterprise">企业视角</TabsTrigger>
          <TabsTrigger value="manager">管家视角</TabsTrigger>
        </TabsList>
        <TabsContent value="enterprise" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">对话检索</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <Input placeholder="用户名称" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择租户" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">全部租户</SelectItem>
                      <SelectItem value="tech">科技公司</SelectItem>
                      <SelectItem value="finance">金融服务</SelectItem>
                      <SelectItem value="consulting">咨询集团</SelectItem>
                      <SelectItem value="healthcare">医疗科技</SelectItem>
                      <SelectItem value="education">教育科技</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择渠道" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">全部渠道</SelectItem>
                      <SelectItem value="wechat">微信</SelectItem>
                      <SelectItem value="miniapp">小程序</SelectItem>
                      <SelectItem value="qwapp">企微应用</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button>
                  <Search size={16} className="mr-2" />
                  搜索
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">实时对话监控列表</CardTitle>
                </CardHeader>
                <CardContent>
                  <ConversationTable conversations={conversations} />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <EmotionCard emotions={emotionsData} total={299} />
              <div className="grid grid-cols-1 gap-4">
                <SceneTagsCard
                  title="场景标签"
                  tags={sceneTags}
                  badgeClassName="ai-tag scene"
                />
                <SceneTagsCard
                  title="意图标签"
                  tags={intentTags}
                  badgeClassName="ai-tag intent"
                />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="manager" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>管家视角正在开发中...</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                该功能将在下一版本中推出，敬请期待。
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConversationsPage;
