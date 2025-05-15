
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddVisitForm } from '@/components/visits/AddVisitForm';
import { VisitList } from '@/components/visits/VisitList';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

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
      content: '1. 针对腾讯提出的服务稳定性问题，重点介绍我们最新的高可用架构\n2. 展示最新的安全防护措施\n3. 讨论SLA升级方案',
      results: '1. 客户对我们的产品表示了浓厚的兴趣\n2. 他们希望能够针对特定场景进行定制化开发\n3. 价格仍然是一个需要进一步讨论的重要因素'
    }
  ]);
  const [showAddVisitDialog, setShowAddVisitDialog] = useState(false);

  const handleAddVisit = (newVisit: Omit<Visit, 'id' | 'status'>) => {
    const visit: Visit = {
      ...newVisit,
      id: Date.now().toString(),
      status: 'created',
      generatedAt: null
    };
    setVisits([...visits, visit]);
    toast({
      title: "拜访已创建",
      description: "新的拜访记录已成功创建。",
    });
    setShowAddVisitDialog(false);
  };

  const handleGenerateContent = (id: string) => {
    setVisits(visits.map(visit => {
      if (visit.id === id && !visit.content) {
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">客户拜访管理</h1>
        <Button onClick={() => setShowAddVisitDialog(true)}>
          <Plus size={16} className="mr-1" /> 新增拜访
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>拜访列表</CardTitle>
        </CardHeader>
        <CardContent>
          <VisitList visits={visits} onGenerateContent={handleGenerateContent} />
        </CardContent>
      </Card>
      
      {/* Add Visit Dialog */}
      <Dialog open={showAddVisitDialog} onOpenChange={setShowAddVisitDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>新增拜访</DialogTitle>
          </DialogHeader>
          <AddVisitForm onAddVisit={handleAddVisit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerVisitsPage;
