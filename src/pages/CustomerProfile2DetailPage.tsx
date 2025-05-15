
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const CustomerProfile2DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showAnalysisDialog, setShowAnalysisDialog] = useState(false);
  
  // Mock data - in a real application, you would fetch this based on the ID
  const customerData = {
    id: id,
    company: id === "1" ? "科技有限公司" : id === "2" ? "智能科技公司" : "创新科技集团",
    tags: ["高价值客户", "续租意向高", "对服务满意"],
    satisfactionScore: 92,
    satisfactionTrend: id === "1" ? "上升" : id === "2" ? "稳定" : "下降",
    renewalProbability: id === "1" ? "高" : id === "2" ? "中" : "低",
    businessRisk: id === "1" ? "低" : id === "2" ? "中" : "高",
    dimensionScores: {
      complaintHealth: 88,
      resolutionAbility: 94,
      emotionAssessment: 90,
    },
    trendTags: ["稳定", "优质客户", "高满意度"],
    analysis: '该客户满意度一直维持在较高水平，近期满意度有小幅上升趋势。客户对物业服务反应积极，特别是在环境维护和安全方面的评价很高。建议保持当前服务质量，可考虑提供个性化增值服务来进一步提升满意度。',
    riskPointAnalysis: '预测在2025年2月6日可能出现满意度下滑风险点，建议提前关注并安排主动拜访。',
    renewalAnalysis: '基于历史满意度、服务响应速度和客户反馈，该企业续租意向非常高，续约概率约为95%。建议在续约前3个月主动与客户商谈续约事宜，关注其业务扩张需求，可能需要增加租赁面积。',
    businessRiskAnalysis: '该企业运营状况良好，员工规模稳步增长，经营风险较低。近期有融资计划，可能对办公环境有更高要求，需关注其发展需求。',
    enterpriseQueryData: {
      companyType: id === "1" ? "上市公司" : id === "2" ? "私营企业" : "国有企业",
      foundedYear: id === "1" ? "2010年" : id === "2" ? "2015年" : "2005年",
      registeredCapital: id === "1" ? "5000万" : id === "2" ? "1000万" : "3亿",
      employeeCount: id === "1" ? "500-2000人" : id === "2" ? "100-499人" : "2000人以上",
      financialStatus: id === "1" ? "良好，近三季度营收持续增长" : id === "2" ? "稳定，小幅增长" : "波动，近期有下滑趋势",
      businessScope: id === "1" ? "软件开发、IT服务、云计算" : id === "2" ? "智能硬件研发、生产" : "科技研发、高新技术转化",
      legalRisks: id === "1" ? "近三年无重大诉讼" : id === "2" ? "存在2起知识产权纠纷，均已和解" : "存在1起劳资纠纷，正在诉讼中",
      creditRating: id === "1" ? "AAA" : id === "2" ? "AA" : "BBB",
      marketPosition: id === "1" ? "行业领先，市场占有率前三" : id === "2" ? "细分市场领域有竞争力" : "大型综合集团，多领域布局"
    },
    lastComplaint: '2024-12-15',
    complaintFrequency: '低',
    workOrderStats: {
      total: 24,
      avgResolutionTime: '4.5小时',
      satisfactionRate: '96%'
    },
    conversations: [
      {
        date: '2025-01-10',
        topic: '空调维修',
        sentiment: '满意',
        keyPoints: ['响应迅速', '维修及时', '服务人员专业']
      },
      {
        date: '2024-12-28',
        topic: '安保问题',
        sentiment: '一般',
        keyPoints: ['夜间安保人员不足', '后续已加强巡逻']
      }
    ],
    analysisProcess: [
      "步骤1: 收集企业历史满意度数据，发现满意度保持在85-95分区间，呈稳定上升趋势",
      "步骤2: 分析最近6个月的对话记录，共有15次客户服务对话，其中13次评价为满意",
      "步骤3: 检查工单处理情况，平均响应时间为4.5小时，低于园区6.2小时的平均水平",
      "步骤4: 评估投诉频率和严重程度，该企业投诉频率低，最近一次投诉距今已超过3个月",
      "步骤5: 结合企业运营状况分析，该企业近期获得B轮融资，业务规模扩大，用工需求增加",
      "步骤6: 综合评估续租意向，基于满意度、服务体验、经营状况等因素，预测续租概率为95%",
      "步骤7: 进行风险预测，2025年2月初可能因业务扩张导致临时空间需求增加，建议提前准备应对方案",
      "步骤8: 查询企查查数据库，获取该企业最新经营状况、财务信息及法律风险"
    ]
  };

  const getSatisfactionColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const handleGoBack = () => {
    navigate('/customer-profile2');
  };

  const handleRefreshAnalysis = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "分析刷新完成",
        description: `${customerData.company}的企业分析已更新至最新数据`,
      });
    }, 2000);
  };

  const handleFeedback = (isPositive) => {
    setFeedbackSubmitted(true);
    toast({
      title: isPositive ? "分析准确" : "分析需改进",
      description: isPositive 
        ? "感谢您的反馈，我们会继续优化分析模型" 
        : "感谢您的反馈，我们会改进分析模型",
    });
  };

  // Get company initials for avatar
  const getInitials = (name) => {
    return name.charAt(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft size={16} className="mr-2" />
            返回
          </Button>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-primary/10">
              <AvatarFallback className="text-primary">
                {getInitials(customerData.company)}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold tracking-tight">{customerData.company} - 企业分析详情</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowAnalysisDialog(true)}
            className="h-9"
          >
            查看分析过程
          </Button>
          <Button 
            onClick={handleRefreshAnalysis} 
            disabled={isRefreshing}
            className="h-9"
          >
            <RefreshCw size={16} className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "刷新中..." : "刷新分析"}
          </Button>
        </div>
      </div>
      
      {/* Enterprise Analysis Overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">企业分析报告</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base">{customerData.analysis}</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-md">续租分析</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold">续租概率：</span>
                <span className="text-3xl font-bold text-green-600">{Math.round(95)}%</span>
              </div>
              <p className="text-sm">{customerData.renewalAnalysis}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-md">经营风险分析</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold">风险评级：</span>
                <span className="text-3xl font-bold text-green-600">{customerData.businessRisk}</span>
              </div>
              <p className="text-sm">{customerData.businessRiskAnalysis}</p>
              
              {/* Added enterprise query data from 企查查 */}
              <div className="mt-4 pt-4 border-t">
                <h3 className="font-medium mb-2">企查查数据</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-muted-foreground block">企业类型</span>
                    <span className="text-sm">{customerData.enterpriseQueryData.companyType}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">成立时间</span>
                    <span className="text-sm">{customerData.enterpriseQueryData.foundedYear}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">注册资本</span>
                    <span className="text-sm">{customerData.enterpriseQueryData.registeredCapital}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">员工规模</span>
                    <span className="text-sm">{customerData.enterpriseQueryData.employeeCount}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-muted-foreground block">财务状况</span>
                    <span className="text-sm">{customerData.enterpriseQueryData.financialStatus}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-muted-foreground block">经营范围</span>
                    <span className="text-sm">{customerData.enterpriseQueryData.businessScope}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">法律风险</span>
                    <span className="text-sm">{customerData.enterpriseQueryData.legalRisks}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">信用评级</span>
                    <span className="text-sm">{customerData.enterpriseQueryData.creditRating}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-muted-foreground block">市场地位</span>
                    <span className="text-sm">{customerData.enterpriseQueryData.marketPosition}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-md">投诉与工单情况</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2">投诉情况</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">最近投诉日期</span>
                  <span className="text-sm">{customerData.lastComplaint}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">投诉频率</span>
                  <span className="text-sm">{customerData.complaintFrequency}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">工单统计</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">工单总数</span>
                  <span className="text-sm">{customerData.workOrderStats.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">平均解决时间</span>
                  <span className="text-sm">{customerData.workOrderStats.avgResolutionTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">满意率</span>
                  <span className="text-sm">{customerData.workOrderStats.satisfactionRate}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-md">关键对话记录</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customerData.conversations.map((conversation, index) => (
              <div key={index} className="p-4 border rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{conversation.topic}</span>
                  <span className="text-sm text-muted-foreground">{conversation.date}</span>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground mr-2">情绪评估:</span>
                  <Badge variant={conversation.sentiment === '满意' ? 'outline' : 'secondary'}>
                    {conversation.sentiment}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">关键点:</span>
                  <ul className="list-disc list-inside space-y-1">
                    {conversation.keyPoints.map((point, i) => (
                      <li key={i} className="text-sm">{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="pt-4 border-t mt-4">
        <p className="text-sm text-muted-foreground mb-2">分析结果有帮助吗？</p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex gap-1" 
            onClick={() => handleFeedback(true)}
            disabled={feedbackSubmitted}
          >
            <ThumbsUp size={16} />
            准确
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex gap-1" 
            onClick={() => handleFeedback(false)}
            disabled={feedbackSubmitted}
          >
            <ThumbsDown size={16} />
            不准确
          </Button>
        </div>
      </div>
      
      {/* Analysis Process Dialog */}
      <Dialog open={showAnalysisDialog} onOpenChange={setShowAnalysisDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>分析过程详情</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              该分析由企业AI助手基于历史数据、对话记录、工单情况等多维度信息自动生成。以下是分析过程的详细步骤：
            </p>
            <div className="space-y-3 mt-4">
              {customerData.analysisProcess.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-background">
                    <span className="text-sm">{index + 1}</span>
                  </div>
                  <p className="mt-0.5 text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerProfile2DetailPage;
