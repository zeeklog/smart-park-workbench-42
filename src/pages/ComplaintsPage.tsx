
import React, { useState } from 'react';
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
import { 
  MessageSquare, 
  Search, 
  ArrowRight, 
  Copy, 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogFooter 
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const ComplaintsPage = () => {
  // States
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  
  // Mock data
  const complaints = [
    {
      id: '1',
      enterprise: '科技有限公司',
      userName: '张先生',
      phone: '138****1234',
      issue: '空调不工作',
      category: '设施报修',
      date: '2025-05-14 09:30',
      status: '未响应',
      priority: '高',
      aiAnalysis: '根据投诉描述，用户反映的空调不工作问题可能有以下几个原因：1. 空调电源连接问题；2. 空调内部组件故障；3. 空调使用的电路可能出现问题。这类问题在夏季高温期间尤为严重，会直接影响租户的办公环境和工作效率。',
      aiSuggestion: '建议处理方式：1. 立即安排物业工程师前往现场检查空调故障原因；2. 如是简单故障当场解决，如是复杂故障需要联系专业维修团队；3. 在修复过程中，可提供临时的降温设备。\n\n建议答复："尊敬的张先生，您好！感谢您的反馈。我们已记录您关于空调故障的问题，并已安排工程师前往处理。为了不影响您的工作，我们将在2小时内解决此问题，若需要更多时间，会提前通知您并提供临时降温设备。如有任何疑问，请随时联系我们。"'
    },
    {
      id: '2',
      enterprise: '金融服务公司',
      userName: '李经理',
      phone: '139****5678',
      issue: '网络连接不稳定',
      category: 'IT服务',
      date: '2025-05-13 14:20',
      status: '已响应',
      priority: '中',
      aiAnalysis: '根据投诉内容，网络连接不稳定可能是由于：1. 办公区域内网络设备负载过高；2. 网络路由器或交换机出现故障；3. 网络供应商服务不稳定。考虑到金融服务公司对网络依赖性较高，这个问题对其业务运营有较大影响。',
      aiSuggestion: '建议处理方式：1. 联系IT支持团队对网络设备进行诊断；2. 检查网络流量并优化配置；3. 必要时与网络供应商联系，了解是否有更广泛的网络问题。\n\n建议答复："尊敬的李经理，感谢您反馈网络连接的问题。我们的IT团队已经开始分析网络不稳定的原因，目前初步排查是由于网络交换机配置问题。我们已经重新调整了配置，并将在接下来24小时内持续监控网络状态。如果您仍然遇到问题，请及时告知我们，我们会安排技术人员现场解决。"'
    },
    {
      id: '3',
      enterprise: '咨询集团',
      userName: '王总',
      phone: '135****9012',
      issue: '保洁服务质量下降',
      category: '物业服务',
      date: '2025-05-12 11:05',
      status: '已响应',
      priority: '低',
      aiAnalysis: '根据投诉内容，保洁服务质量下降可能原因包括：1. 保洁人员更换或培训不足；2. 保洁标准和频次发生变化；3. 监督管理不到位。保洁质量直接影响办公环境体验和企业形象，需要认真对待。',
      aiSuggestion: '建议处理方式：1. 与保洁服务提供商进行沟通；2. 重新制定明确的保洁标准和检查机制；3. 增加保洁质量监督频次。\n\n建议答复："尊敬的王总，非常感谢您对我们物业服务的反馈。我们已经与保洁服务团队进行了深入沟通，同时重新制定了保洁标准和检查流程。从明天开始，我们将提高保洁频次，并且由客户服务主管每日进行服务质量检查。我们会在一周后向您反馈改进情况，也欢迎您随时给我们提供宝贵意见。"'
    },
    {
      id: '4',
      enterprise: '医疗科技',
      userName: '刘助理',
      phone: '136****3456',
      issue: '访客系统故障',
      category: '安保服务',
      date: '2025-05-11 16:45',
      status: '未响应',
      priority: '中',
      aiAnalysis: '根据投诉内容，访客系统故障可能由于：1. 系统软件出现bug；2. 硬件设备损坏；3. 系统需要升级或维护。对于医疗科技公司，访客系统故障可能会影响客户来访和日常运营，需要及时处理。',
      aiSuggestion: '建议处理方式：1. 联系系统供应商进行远程诊断；2. 安排技术人员现场检查硬件；3. 临时采用人工登记方式确保访客管理不受影响。\n\n建议答复："尊敬的刘助理，感谢您反馈访客系统的问题。我们已经联系了系统供应商，他们将在今天下午派技术人员到现场检修。在系统修复期间，我们已在前台设置了临时人工登记点，确保您的访客能够正常进出。我们预计系统将在明天中午前恢复正常，修复完成后会立即通知您。"'
    },
    {
      id: '5',
      enterprise: '教育科技',
      userName: '陈经理',
      phone: '137****7890',
      issue: '会议室设备故障',
      category: '设施报修',
      date: '2025-05-10 10:15',
      status: '已响应',
      priority: '高',
      aiAnalysis: '根据投诉内容，会议室设备故障可能是：1. 投影或显示设备连接问题；2. 音频系统故障；3. 视频会议软件配置错误。考虑到教育科技公司对会议演示的依赖性，这个问题可能直接影响其业务展示和培训活动。',
      aiSuggestion: '建议处理方式：1. 安排IT支持人员对会议室设备进行全面检查；2. 更新或更换有问题的设备；3. 提供设备使用指南，避免误操作。\n\n建议答复："尊敬的陈经理，感谢您反馈会议室设备问题。我们的技术团队已经检查了所有会议室设备，发现主会议室的HDMI连接器和音频系统存在问题。我们已经更换了损坏的部件，并对系统进行了全面测试，现在所有设备均可正常使用。同时，我们在会议室内放置了设备使用指南，以便您和团队更便捷地使用。如有任何疑问，欢迎随时联系我们的IT支持团队。"'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '未响应':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100 flex items-center gap-1">
            <AlertTriangle size={14} />
            未响应
          </Badge>
        );
      case '已响应':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
            <CheckCircle size={14} />
            已响应
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

  const handleViewComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setIsViewingDetails(true);
  };

  const handleBackToList = () => {
    setIsViewingDetails(false);
    setSelectedComplaint(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "复制成功",
        description: "内容已复制到剪贴板",
      });
    });
  };

  if (isViewingDetails && selectedComplaint) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleBackToList}>
            <ArrowLeft size={16} className="mr-1" />
            返回列表
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">投诉详情</h1>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">投诉信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">企业名称</p>
                <p>{selectedComplaint.enterprise}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">联系人</p>
                <p>{selectedComplaint.userName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">联系电话</p>
                <p>{selectedComplaint.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">投诉时间</p>
                <p>{selectedComplaint.date}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-muted-foreground">投诉内容</p>
                <p className="mt-1">{selectedComplaint.issue}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">状态</p>
                <div className="mt-1">{getStatusBadge(selectedComplaint.status)}</div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">优先级</p>
                <div className="mt-1">{getPriorityBadge(selectedComplaint.priority)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">AI建议</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(selectedComplaint.aiAnalysis + "\n\n" + selectedComplaint.aiSuggestion)}>
                <Copy size={16} className="mr-1" />
                复制建议
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">原因分析：</p>
              <Textarea 
                className="mt-1" 
                value={selectedComplaint.aiAnalysis} 
                readOnly 
                rows={4} 
              />
            </div>
            <div>
              <p className="font-medium">处理和答复建议：</p>
              <Textarea 
                className="mt-1 whitespace-pre-line" 
                value={selectedComplaint.aiSuggestion} 
                readOnly 
                rows={8} 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                <Input placeholder="企业名称" />
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
                    <TableHead>企业</TableHead>
                    <TableHead>联系人</TableHead>
                    <TableHead>联系电话</TableHead>
                    <TableHead>投诉内容</TableHead>
                    <TableHead>类别</TableHead>
                    <TableHead>投诉时间</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>优先级</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complaints.map((complaint) => (
                    <TableRow key={complaint.id} className="cursor-pointer hover:bg-muted" onClick={() => handleViewComplaint(complaint)}>
                      <TableCell>{complaint.enterprise}</TableCell>
                      <TableCell>{complaint.userName}</TableCell>
                      <TableCell>{complaint.phone}</TableCell>
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
