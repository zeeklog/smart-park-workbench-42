
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddVisitForm } from '@/components/visits/AddVisitForm';
import { VisitList } from '@/components/visits/VisitList';

export interface Visit {
  id: string;
  customerName: string;
  subject: string;
  visitDate: string;
  generatedAt: string | null;
  status: 'created' | 'analyzed';
  content?: string;
  results?: string;
}

const CustomerVisitsPage = () => {
  const [visits, setVisits] = useState<Visit[]>([
    {
      id: '1',
      customerName: '阿里巴巴',
      subject: '季度回访',
      visitDate: '2025-04-10',
      generatedAt: null,
      status: 'created'
    },
    {
      id: '2',
      customerName: '腾讯科技',
      subject: '产品演示',
      visitDate: '2025-04-15',
      generatedAt: '2025-04-12',
      status: 'analyzed',
      content: '1. 针对腾讯提出的服务稳定性问题，重点介绍我们最新的高可用架构\n2. 展示最新的安全防护措施\n3. 讨论SLA升级方案'
    }
  ]);

  const handleAddVisit = (newVisit: Omit<Visit, 'id' | 'status'>) => {
    const visit: Visit = {
      ...newVisit,
      id: Date.now().toString(),
      status: 'created',
      generatedAt: null
    };
    setVisits([...visits, visit]);
  };

  const handleGenerateContent = (id: string) => {
    setVisits(visits.map(visit => {
      if (visit.id === id) {
        return {
          ...visit,
          content: '1. 了解客户最新业务发展方向\n2. 提出我方解决方案与客户需求的匹配点\n3. 讨论合作深化的可能性',
          generatedAt: new Date().toISOString().split('T')[0],
          status: 'analyzed'
        };
      }
      return visit;
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">客户拜访管理</h1>
      
      <Tabs defaultValue="list">
        <TabsList className="grid w-[400px] grid-cols-2 mb-6">
          <TabsTrigger value="list">拜访列表</TabsTrigger>
          <TabsTrigger value="add">新增拜访</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>拜访列表</CardTitle>
            </CardHeader>
            <CardContent>
              <VisitList visits={visits} onGenerateContent={handleGenerateContent} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>新增拜访</CardTitle>
            </CardHeader>
            <CardContent>
              <AddVisitForm onAddVisit={handleAddVisit} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerVisitsPage;
