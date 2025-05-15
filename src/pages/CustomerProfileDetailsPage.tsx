
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
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

const CustomerProfileDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Start with January 1st as base date
  const baseDate = new Date(2025, 0, 1); // January 1, 2025
  
  // Mock data - in a real application, you would fetch this data based on the ID
  const customerData = {
    id: id,
    company: '科技有限公司',
    tags: ['高价值客户', '续租意向高', '对服务满意'],
    satisfactionScore: 92,
    dimensionScores: {
      complaintHealth: 88,
      resolutionAbility: 94,
      emotionAssessment: 90,
    },
    trendTags: ['稳定', '优质客户', '高满意度'],
    riskStatus: '低风险',
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
  };

  // Format date in the required "2/24" format
  const formatChartDate = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const radarData = [
    { subject: '投诉健康', A: customerData.dimensionScores.complaintHealth, fullMark: 100 },
    { subject: '诉求解决', A: customerData.dimensionScores.resolutionAbility, fullMark: 100 },
    { subject: '情绪判断', A: customerData.dimensionScores.emotionAssessment, fullMark: 100 },
  ];

  const getSatisfactionColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getRiskStatusColor = (status: string) => {
    switch (status) {
      case '高风险':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case '中风险':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      case '低风险':
      default:
        return 'bg-green-100 text-green-800 hover:bg-green-100';
    }
  };

  const handleGoBack = () => {
    navigate('/customer-profiles');
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
  const getInitials = (name: string) => {
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
          <h1 className="text-2xl font-bold tracking-tight">{customerData.company} - 客户画像详情</h1>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Radar Chart Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">维度评分分析</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar
                    name="得分"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">投诉健康</span>
                <span className="text-sm font-medium">{customerData.dimensionScores.complaintHealth}分</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">诉求解决能力</span>
                <span className="text-sm font-medium">{customerData.dimensionScores.resolutionAbility}分</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">情绪判断</span>
                <span className="text-sm font-medium">{customerData.dimensionScores.emotionAssessment}分</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-sm font-bold">总体满意度</span>
                <span className={`text-sm font-bold ${getSatisfactionColor(customerData.satisfactionScore)}`}>
                  {customerData.satisfactionScore}分
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Satisfaction Analysis Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">满意度分析</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm mb-2">{customerData.analysis}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">趋势标签</p>
                <div className="flex flex-wrap gap-1">
                  {customerData.trendTags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-1 pt-2">
                <p className="text-xs text-muted-foreground">风险状态</p>
                <Badge variant="outline" className={getRiskStatusColor(customerData.riskStatus)}>
                  {customerData.riskStatus}
                </Badge>
              </div>
              <div className="space-y-1 pt-2">
                <div className="flex flex-wrap gap-1">
                  {customerData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="ai-tag intent">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
    </div>
  );
};

export default CustomerProfileDetailsPage;
