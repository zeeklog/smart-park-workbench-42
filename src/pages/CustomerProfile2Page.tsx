
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  RefreshCw,
  Search,
  ArrowUp,
  ArrowDown,
  Building,
  Calendar
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

const CustomerProfile2Page = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('satisfactionScore');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data - in a real application, you would fetch this from an API
  const enterpriseData = [
    {
      id: "1",
      company: "科技有限公司",
      lastUpdated: "2025-05-14",
      satisfactionScore: 92,
      riskStatus: "低风险",
      renewalProbability: 0.95,
      tags: ["高价值客户", "续租意向高", "对服务满意"],
    },
    {
      id: "2",
      company: "智能科技公司",
      lastUpdated: "2025-05-13",
      satisfactionScore: 78,
      riskStatus: "中风险",
      renewalProbability: 0.72,
      tags: ["技术企业", "需提升服务", "有投诉记录"],
    },
    {
      id: "3",
      company: "创新科技集团",
      lastUpdated: "2025-05-12",
      satisfactionScore: 85,
      riskStatus: "低风险",
      renewalProbability: 0.87,
      tags: ["成长型企业", "续租意向中等", "业务扩张"],
    },
    {
      id: "4",
      company: "数据分析有限公司",
      lastUpdated: "2025-05-11",
      satisfactionScore: 64,
      riskStatus: "高风险",
      renewalProbability: 0.53,
      tags: ["投诉频繁", "服务不满意", "可能退租"],
    },
    {
      id: "5",
      company: "医疗器械公司",
      lastUpdated: "2025-05-10",
      satisfactionScore: 88,
      riskStatus: "低风险",
      renewalProbability: 0.91,
      tags: ["长期客户", "稳定需求", "优质合作"],
    },
    {
      id: "6",
      company: "金融咨询服务",
      lastUpdated: "2025-05-09",
      satisfactionScore: 79,
      riskStatus: "中风险",
      renewalProbability: 0.76,
      tags: ["服务需求高", "价格敏感", "需主动跟进"],
    },
  ];

  const handleRefreshAllAnalyses = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "分析刷新完成",
        description: "所有企业分析已更新至最新数据",
      });
    }, 2000);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to descending for new sort field
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const getRiskStatusColor = (status) => {
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

  const getSatisfactionColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  // Get company initials for avatar
  const getInitials = (name) => {
    return name.charAt(0);
  };

  // Filter and sort the data
  const filteredAndSortedData = enterpriseData
    .filter(item => 
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'satisfactionScore') {
        comparison = a.satisfactionScore - b.satisfactionScore;
      } else if (sortField === 'renewalProbability') {
        comparison = a.renewalProbability - b.renewalProbability;
      } else if (sortField === 'company') {
        comparison = a.company.localeCompare(b.company);
      } else if (sortField === 'lastUpdated') {
        comparison = new Date(a.lastUpdated) - new Date(b.lastUpdated);
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">用户画像分析 2.0</h1>
        <Button 
          onClick={handleRefreshAllAnalyses} 
          disabled={isRefreshing}
          className="h-9"
        >
          <RefreshCw size={16} className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "刷新中..." : "刷新全部分析"}
        </Button>
      </div>
      
      <p className="text-muted-foreground">
        基于企业历史数据、对话记录、投诉情况等多维度信息的自动分析，帮助您了解企业状况、预测满意度趋势和续约可能性。
      </p>
      
      <div className="flex gap-2 pb-4 items-center">
        <Search size={20} className="text-muted-foreground" />
        <Input
          placeholder="搜索企业名称或标签..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedData.map((enterprise) => (
          <Card key={enterprise.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-primary/10">
                    <AvatarFallback className="text-primary">
                      {getInitials(enterprise.company)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg font-semibold">
                    {enterprise.company}
                  </CardTitle>
                </div>
                <Badge variant="outline" className={getRiskStatusColor(enterprise.riskStatus)}>
                  {enterprise.riskStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">满意度评分</span>
                  <span className={`font-medium ${getSatisfactionColor(enterprise.satisfactionScore)}`}>
                    {enterprise.satisfactionScore}分
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">续租概率</span>
                  <span className="font-medium">{Math.round(enterprise.renewalProbability * 100)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">最近更新</span>
                  <span className="text-sm flex items-center gap-1">
                    <Calendar size={14} />
                    {enterprise.lastUpdated}
                  </span>
                </div>
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1">
                    {enterprise.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="ai-tag intent text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between items-center">
              <div className="text-sm text-muted-foreground flex items-center">
                <Building size={14} className="mr-1" /> 企业分析
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/customer-profile2/${enterprise.id}`)}
              >
                查看详情
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredAndSortedData.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">未找到匹配的企业数据</p>
        </div>
      )}
    </div>
  );
};

export default CustomerProfile2Page;
