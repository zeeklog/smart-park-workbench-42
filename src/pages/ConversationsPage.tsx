
import React, { useState, useEffect, useMemo } from 'react';
import ConversationTable, { Conversation } from '@/components/dashboard/ConversationTable';
import EmotionCard from '@/components/dashboard/EmotionCard';
import SceneTagsCard from '@/components/dashboard/SceneTagsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

// Define the correct type for emotions data
interface EmotionData {
  label: '中性' | '喜' | '焦虑' | '怒';
  count: number;
  percentage: number;
}

const ConversationsPage = () => {
  const [selectedEnterprise, setSelectedEnterprise] = useState<string>('all');

  // Mock data - with enterprise information and conversation messages
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
      messages: [
        { sender: 'customer', content: '你好，我想报修一下办公室的空调，不制冷了', time: '09:15:30' },
        { sender: 'steward', content: '您好，请问是哪栋楼哪个房间号？我会马上安排维修人员', time: '09:16:05' },
        { sender: 'customer', content: 'B栋302室，谢谢', time: '09:16:45' },
        { sender: 'steward', content: '好的，已经安排维修人员，预计30分钟内到达', time: '09:17:20' }
      ]
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
      messages: [
        { sender: 'customer', content: '我们公司考虑续租，有什么优惠吗？', time: '10:22:10' },
        { sender: 'steward', content: '您好李经理，非常感谢您的信任。针对续租客户，我们提供95折优惠，另外还可以免费升级办公家具', time: '10:23:05' },
        { sender: 'customer', content: '这个优惠不错，我们考虑一下', time: '10:24:15' }
      ]
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
      messages: [
        { sender: 'customer', content: '你们这个物业费太贵了，比周边高了不少！', time: '11:05:30' },
        { sender: 'steward', content: '王总您好，关于物业费问题，我们提供的服务确实比周边更全面。不过我可以安排物业经理与您详谈，看有没有适合您的套餐', time: '11:06:25' },
        { sender: 'customer', content: '好吧，让他下午来我办公室谈', time: '11:07:10' },
        { sender: 'steward', content: '好的王总，我已经通知物业经理，他下午2点会去您办公室', time: '11:07:45' }
      ]
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
      messages: [
        { sender: 'customer', content: '我有个重要客户要来，但忘记提前预约访客了', time: '13:30:05' },
        { sender: 'steward', content: '不用担心，刘助理。请提供访客姓名和到访时间，我立即为您安排', time: '13:30:40' },
        { sender: 'customer', content: '张医生，大约15分钟后到', time: '13:31:20' },
        { sender: 'steward', content: '已经为您登记好了，前台会引导张医生到您办公室', time: '13:32:00' }
      ]
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
      messages: [
        { sender: 'customer', content: '听说园区近期有创新论坛，怎么报名参加？', time: '14:45:15' },
        { sender: 'steward', content: '陈经理您好，创新论坛将于下周三举行，可以通过小程序"活动"版块进行报名，目前还有名额', time: '14:46:30' },
        { sender: 'customer', content: '好的，我们公司准备派3人参加', time: '14:47:10' },
        { sender: 'steward', content: '了解，报名成功后会收到确认短信，期待您的参与', time: '14:48:05' }
      ]
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
      messages: [
        { sender: 'customer', content: '想问下文创园的展览厅本周六可以租用吗？', time: '15:10:20' },
        { sender: 'steward', content: '赵总监您好，本周六展览厅目前还未被预订，可以为您安排', time: '15:11:15' },
        { sender: 'customer', content: '太好了，我们要举办一个小型艺术展', time: '15:12:05' },
        { sender: 'steward', content: '已为您预留，稍后会发送预订确认和相关费用明细给您', time: '15:12:50' }
      ]
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
      messages: [
        { sender: 'customer', content: '请问智慧园区的门禁系统如何添加临时员工？', time: '16:25:30' },
        { sender: 'steward', content: '孙经理您好，临时员工可通过"智慧园区"APP的"访客管理"模块添加，填写基本信息后系统会生成临时通行码', time: '16:26:25' },
        { sender: 'customer', content: '有效期能设置多久？', time: '16:27:10' },
        { sender: 'steward', content: '最长可设置90天的有效期，如需更长时间建议办理正式门禁权限', time: '16:28:00' }
      ]
    },
  ];

  // Filter conversations based on selected enterprise
  const filteredConversations = useMemo(() => {
    if (selectedEnterprise === 'all') {
      return allConversations;
    }
    return allConversations.filter(conversation => conversation.enterprise === selectedEnterprise);
  }, [selectedEnterprise]);

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

  // Get unique enterprises for the dropdown
  const enterprises = useMemo(() => {
    const uniqueEnterprises = [...new Set(allConversations.map(c => c.enterprise))];
    return uniqueEnterprises;
  }, []);

  // Scene and intent tags
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">企业对话分析</h1>
        <p className="text-muted-foreground">
          管理和分析与企业客户的AI对话数据。
        </p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">客户对话检索</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Input placeholder="客户名称" />
            <Select value={selectedEnterprise} onValueChange={setSelectedEnterprise}>
              <SelectTrigger>
                <SelectValue placeholder="选择企业" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">全部企业</SelectItem>
                  {enterprises.map(enterprise => (
                    <SelectItem key={enterprise} value={enterprise}>{enterprise}</SelectItem>
                  ))}
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
    </div>
  );
};

export default ConversationsPage;
