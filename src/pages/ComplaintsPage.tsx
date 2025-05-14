
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MessageSquare, Search, ArrowRight } from 'lucide-react';

const ComplaintsPage = () => {
  // Mock data
  const complaints = [
    {
      id: '1',
      tenant: '科技有限公司',
      userName: '张先生',
      issue: '空调不工作',
      category: '设施报修',
      date: '2025-05-14',
      status: '待处理',
      priority: '高',
    },
    {
      id: '2',
      tenant: '金融服务公司',
      userName: '李经理',
      issue: '网络连接不稳定',
      category: 'IT服务',
      date: '2025-05-13',
      status: '处理中',
      priority: '中',
    },
    {
      id: '3',
      tenant: '咨询集团',
      userName: '王总',
      issue: '保洁服务质量下降',
      category: '物业服务',
      date: '2025-05-12',
      status: '已解决',
      priority: '低',
    },
    {
      id: '4',
      tenant: '医疗科技',
      userName: '刘助理',
      issue: '访客系统故障',
      category: '安保服务',
      date: '2025-05-11',
      status: '待处理',
      priority: '中',
    },
    {
      id: '5',
      tenant: '教育科技',
      userName: '陈经理',
      issue: '会议室设备故障',
      category: '设施报修',
      date: '2025-05-10',
      status: '已解决',
      priority: '高',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '待处理':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            待处理
          </Badge>
        );
      case '处理中':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            处理中
          </Badge>
        );
      case '已解决':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            已解决
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case '高':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            高
          </Badge>
        );
      case '中':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            中
          </Badge>
        );
      case '低':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            低
          </Badge>
        );
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">投诉处理</h1>
        <p className="text-muted-foreground">管理和处理客户投诉与问题反馈。</p>
      </div>

      <Tabs defaultValue="management">
        <TabsList>
          <TabsTrigger value="management">答疑管理</TabsTrigger>
          <TabsTrigger value="analysis">投诉分析</TabsTrigger>
        </TabsList>
        <TabsContent value="management" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">投诉检索</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <Input placeholder="租户名称" />
                <Input placeholder="问题类型" />
                <Input placeholder="状态" />
                <Button>
                  <Search size={16} className="mr-2" />
                  搜索
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">投诉列表</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>租户</TableHead>
                    <TableHead>联系人</TableHead>
                    <TableHead>问题描述</TableHead>
                    <TableHead>类别</TableHead>
                    <TableHead>日期</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>优先级</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell>{complaint.tenant}</TableCell>
                      <TableCell>{complaint.userName}</TableCell>
                      <TableCell>{complaint.issue}</TableCell>
                      <TableCell>{complaint.category}</TableCell>
                      <TableCell>{complaint.date}</TableCell>
                      <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                      <TableCell>{getPriorityBadge(complaint.priority)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MessageSquare size={16} className="mr-1" />
                          查看
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>投诉分析功能正在开发中...</CardTitle>
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

export default ComplaintsPage;
