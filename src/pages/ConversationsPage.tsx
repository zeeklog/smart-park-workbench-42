
import React, { useState, useEffect, useMemo } from 'react';
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

// Define the correct type for emotions data to fix the TypeScript error
interface EmotionData {
  label: '中性' | '喜' | '焦虑' | '怒';
  count: number;
  percentage: number;
}

const ConversationsPage = () => {
  const [activeTab, setActiveTab] = useState('enterprise');
  const [selectedTenant, setSelectedTenant] = useState<string>('all');

  // Mock data - with enterprise information
  const allConversations: Conversation[] = [
    {
      id: '1',
      channel: '微信',
      userName: '张先生',
      botName: 'AI助手',
      tenant: '科技有限公司',
      enterprise: '未来科技集团',
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
      enterprise: '华宇金融集团',
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
      enterprise: '睿智咨询',
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
      enterprise: '健康医疗集团',
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
      enterprise: '未来教育科技',
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
      enterprise: '创想传媒',
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
      enterprise: '未来科技集团',
      project: '智慧园区',
      createdAt: '2025-05-14 16:25',
      tags: {
        emotion: '中性',
        intent: '功能探查',
      },
    },
  ];

  // Filter conversations based on selected tenant
  const filteredConversations = useMemo(() => {
    if (selectedTenant === 'all') {
      return allConversations;
    }
    return allConversations.filter(conversation => conversation.tenant === selectedTenant);
  }, [selectedTenant]);

  // Calculate emotion distribution based on filtered conversations
  const calculateEmotionData = (conversations: Conversation[]): EmotionData[] => {
    const emotionCounts: Record<string, number> = { '中性': 0, '喜': 0, '焦虑': 0, '怒': 0 };
    
    // Count each emotion
    conversations.forEach(conversation => {
      if (conversation.tags.emotion) {
        emotionCounts[conversation.tags.emotion] += 1;
      }
    });
    
    const total = conversations.filter(c => c.tags.emotion).length || 1; // Avoid division by zero
    
    // Create emotion data array
    return [
      { label: '中性', count: emotionCounts['中性'], percentage: (emotionCounts['中性'] / total) * 100 },
      { label: '喜', count: emotionCounts['喜'], percentage: (emotionCounts['喜'] / total) * 100 },
      { label: '焦虑', count: emotionCounts['焦虑'], percentage: (emotionCounts['焦虑'] / total) * 100 },
      { label: '怒', count: emotionCounts['怒'], percentage: (emotionCounts['怒'] / total) * 100 },
    ];
  };

  // Calculate emotions based on filtered conversations
  const emotionsData = useMemo(() => calculateEmotionData(filteredConversations), [filteredConversations]);

  // Get unique tenants for the dropdown
  const tenants = useMemo(() => {
    const uniqueTenants = [...new Set(allConversations.map(c => c.tenant))];
    return uniqueTenants;
  }, []);

  // Scene and intent tags can also be filtered by tenant
  const sceneTags = useMemo(() => {
    // Count scene tags in filtered conversations
    const sceneCounts: Record<string, number> = {};
    filteredConversations.forEach(conversation => {
      if (conversation.tags.scene) {
        sceneCounts[conversation.tags.scene] = (sceneCounts[conversation.tags.scene] || 0) + 1;
      }
    });
    
    return Object.entries(sceneCounts).map(([label, count]) => ({ label, count }));
  }, [filteredConversations]);

  const intentTags = useMemo(() => {
    // Count intent tags in filtered conversations
    const intentCounts: Record<string, number> = {};
    filteredConversations.forEach(conversation => {
      if (conversation.tags.intent) {
        intentCounts[conversation.tags.intent] = (intentCounts[conversation.tags.intent] || 0) + 1;
      }
    });
    
    return Object.entries(intentCounts).map(([label, count]) => ({ label, count }));
  }, [filteredConversations]);

  // Calculate total for emotion card
  const totalEmotions = useMemo(() => 
    filteredConversations.filter(c => c.tags.emotion).length, 
    [filteredConversations]
  );

  // Handle tenant selection change with animation
  const handleTenantChange = (value: string) => {
    setSelectedTenant(value);
  };

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
              <CardTitle className="text-md">客户对话检索</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <Input placeholder="客户名称" />
                <Select value={selectedTenant} onValueChange={handleTenantChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择租户" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">全部租户</SelectItem>
                      {tenants.map(tenant => (
                        <SelectItem key={tenant} value={tenant}>{tenant}</SelectItem>
                      ))}
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
                  <CardTitle className="text-md">实时客户对话监控</CardTitle>
                </CardHeader>
                <CardContent>
                  <ConversationTable conversations={filteredConversations} />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <EmotionCard 
                emotions={emotionsData} 
                total={totalEmotions} 
                className="transition-all duration-300 ease-in-out" 
              />
              <div className="grid grid-cols-1 gap-4">
                <SceneTagsCard
                  title="客户场景标签"
                  tags={sceneTags}
                  badgeClassName="ai-tag scene"
                  className="transition-all duration-300 ease-in-out"
                />
                <SceneTagsCard
                  title="客户意图标签"
                  tags={intentTags}
                  badgeClassName="ai-tag intent"
                  className="transition-all duration-300 ease-in-out"
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
