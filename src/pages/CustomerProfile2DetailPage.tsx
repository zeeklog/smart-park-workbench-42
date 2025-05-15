
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
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  LineChart, 
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const CustomerProfile2DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showAnalysisDialog, setShowAnalysisDialog] = useState(false);
  
  // Start with January 1st as base date
  const baseDate = new Date(2025, 0, 1); // January 1, 2025
  
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
    historicalData: Array.from({ length: 30 }, (_, i) => {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      return {
        day: i + 1,
        date: date,
        score: Math.floor(85 + Math.random() * 15),
      };
    }),
    forecastData: Array.from({ length: 10 }, (_, i) => {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + 30 + i);
      const isRiskPoint = i === 6;
      return {
        day: i + 1,
        date: date,
        score: Math.floor(88 + Math.random() * 12),
        riskPoint: isRiskPoint, // Mark day 6 as a risk point
      };
    }),
    analysis: '该客户满意度一直维持在较高水平，近期满意度有小幅上升趋势。客户对物业服务反应积极，特别是在环境维护和安全方面的评价很高。建议保持当前服务质量，可考虑提供个性化增值服务来进一步提升满意度。',
    riskPointAnalysis: '预测在2025年2月6日可能出现满意度下滑风险点，建议提前关注并安排主动拜访。',
    renewalAnalysis: '基于历史满意度、服务响应速度和客户反馈，该企业续租意向非常高，续约概率约为95%。建议在续约前3个月主动与客户商谈续约事宜，关注其业务扩张需求，可能需要增加租赁面积。',
    businessRiskAnalysis: '该企业运营状况良好，员工规模稳步增长，经营风险较低。近期有融资计划，可能对办公环境有更高要求，需关注其发展需求。',
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
      "步骤7: 进行风险预测，2025年2月初可能因业务扩张导致临时空间需求增加，建议提前准备应对方案"
    ]
  };

  // Format date in the required "2/24" format
  const formatChartDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const radarData = [
    { subject: '投诉健康', A: customerData.dimensionScores.complaintHealth, fullMark: 100 },
    { subject: '诉求解决', A: customerData.dimensionScores.resolutionAbility, fullMark: 100 },
    { subject: '情绪判断', A: customerData.dimensionScores.emotionAssessment, fullMark: 100 },
  ];

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

  // Combine historical and forecast data for the chart
  const combinedChartData = [
    ...customerData.historicalData.map(item => ({ 
      ...item, 
      type: '历史数据',
      riskPoint: false,
      formattedDate: formatChartDate(item.date)
    })),
    ...customerData.forecastData.map(item => ({ 
      ...item, 
      type: '预测趋势',
      day: item.day + customerData.historicalData.length,
      formattedDate: formatChartDate(item.date)
    }))
  ];

  // Find risk point date for reference line
  const riskPointItem = customerData.forecastData.find(item => item.riskPoint);
  const riskPointDay = riskPointItem 
    ? customerData.historicalData.length + riskPointItem.day 
    : 36; // Default to day 36 if not found
  const riskPointDate = riskPointItem 
    ? formatChartDate(riskPointItem.date) 
    : '2/6'; // Default risk date in the new format

  // Get company initials for avatar
  const getInitials = (name) => {
    return name.charAt(0);
  };

  // Generate tick values for the x-axis with the new date format
  const getXAxisTicks = () => {
    const ticks = [];
    // Add tick for every 5 days
    for (let i = 0; i < combinedChartData.length; i += 5) {
      if (combinedChartData[i]) {
        ticks.push(combinedChartData[i].formattedDate);
      }
    }
    // Ensure the risk point date is included
    if (riskPointItem && !ticks.includes(riskPointDate)) {
      ticks.push(riskPointDate);
    }
    return ticks;
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
            <h1 className="text-2xl font-bold tracking-tight">{customerData.company} - 客户画像2详情</h1>
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
          <CardTitle className="text-md">企业分析概览</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base">{customerData.analysis}</p>
        </CardContent>
      </Card>

      {/* Satisfaction Trend Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">满意度趋势预测 (40天)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer 
            config={{
              history: {
                label: "历史数据",
                theme: {
                  light: "#8884d8",
                  dark: "#8884d8"
                }
              },
              forecast: {
                label: "预测趋势",
                theme: {
                  light: "#82ca9d",
                  dark: "#82ca9d"
                }
              }
            }}
            className="w-full aspect-[4/2] sm:aspect-[16/5]"
          >
            <LineChart
              data={combinedChartData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="formattedDate" 
                label={{ value: '日期', position: 'insideBottomRight', offset: -5 }}
                domain={['dataMin', 'dataMax']}
                ticks={getXAxisTicks()}
              />
              <YAxis 
                domain={[0, 100]}
                label={{ value: '满意度', angle: -90, position: 'insideLeft' }}
              />
              <ChartTooltip 
                content={
                  <ChartTooltipContent
                    indicator="line"
                    formatter={(value, name, props) => {
                      return [
                        `${value}分`,
                        name,
                        null,
                        null,
                        `${props.payload.formattedDate}`
                      ];
                    }}
                  />
                }
              />
              <Legend verticalAlign="top" height={40} />
              <Line 
                type="monotone" 
                name="历史数据"
                dataKey="score" 
                stroke="#8884d8" 
                strokeWidth={2} 
              />
              <Line 
                type="monotone" 
                name="预测趋势"
                data={customerData.forecastData.map(item => ({ 
                  ...item, 
                  day: item.day + customerData.historicalData.length,
                  formattedDate: formatChartDate(item.date)
                }))} 
                dataKey="score" 
                stroke="#82ca9d" 
                strokeWidth={2}
                strokeDasharray="5 5" 
              />
              {/* Reference line for risk point with updated label */}
              <ReferenceLine 
                x={riskPointDate} 
                stroke="red" 
                strokeDasharray="3 3" 
                label={{ 
                  value: '风险点', 
                  position: 'top', 
                  fill: 'red',
                  fontSize: 12,
                  fontWeight: 'bold'
                }} 
              />
            </LineChart>
          </ChartContainer>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              基于历史数据分析，预测从2025年1月1日至2025年2月9日期间内该企业满意度将保持稳定，略有上升趋势。
            </p>
            <p className="text-sm text-red-500 font-medium">
              {customerData.riskPointAnalysis}
            </p>
          </div>
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
