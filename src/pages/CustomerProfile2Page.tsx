
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowUp,
  ArrowDown,
  Search,
  Building
} from 'lucide-react';

const CustomerProfile2Page = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for customer profiles
  const customerProfiles = [
    {
      id: '1',
      company: '科技有限公司',
      satisfactionScore: 92,
      satisfactionTrend: '上升',
      renewalProbability: '高',
      businessRisk: '低',
      lastUpdated: '2025-01-10',
      analysis: '该客户满意度一直维持在较高水平，近期满意度有小幅上升趋势。客户对物业服务反应积极，特别是在环境维护和安全方面的评价很高。建议保持当前服务质量，可考虑提供个性化增值服务来进一步提升满意度。',
    },
    {
      id: '2',
      company: '智能科技公司',
      satisfactionScore: 78,
      satisfactionTrend: '稳定',
      renewalProbability: '中',
      businessRisk: '中',
      lastUpdated: '2025-01-08',
      analysis: '该企业满意度处于中等水平，过去3个月保持相对稳定。主要关注点在办公环境的舒适度和公共区域的维护上。建议关注其服务需求变化，及时响应工单请求，避免满意度下滑。',
    },
    {
      id: '3',
      company: '创新科技集团',
      satisfactionScore: 65,
      satisfactionTrend: '下降',
      renewalProbability: '低',
      businessRisk: '高',
      lastUpdated: '2025-01-05',
      analysis: '该企业满意度呈现下降趋势，从85分降至当前的65分。主要不满来源于空调系统频繁故障和物业响应速度慢。建议立即安排客户拜访，了解详细需求，制定专项服务改进计划。',
    }
  ];

  // Filter profiles based on search query
  const filteredProfiles = customerProfiles.filter(profile => 
    profile.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (id) => {
    navigate(`/customer-profile2/${id}`);
  };

  const getSatisfactionTrendIcon = (trend) => {
    switch (trend) {
      case '上升':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case '下降':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getSatisfactionTrendColor = (trend) => {
    switch (trend) {
      case '上升':
        return 'text-green-500';
      case '下降':
        return 'text-red-500';
      default:
        return 'text-amber-500'; // for stable
    }
  };

  const getProbabilityColor = (probability) => {
    switch (probability) {
      case '高':
        return 'bg-green-100 text-green-800';
      case '中':
        return 'bg-amber-100 text-amber-800';
      case '低':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };
  
  const getRiskColor = (risk) => {
    switch (risk) {
      case '高':
        return 'bg-red-100 text-red-800';
      case '中':
        return 'bg-amber-100 text-amber-800';
      case '低':
        return 'bg-green-100 text-green-800';
      default:
        return '';
    }
  };

  // Get company initials for avatar
  const getInitials = (name) => {
    return name.charAt(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">企业画像分析</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索企业..."
              className="pl-8 w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProfiles.map((profile) => (
          <Card 
            key={profile.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCardClick(profile.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-primary/10">
                  <AvatarFallback className="text-primary">
                    {getInitials(profile.company)}
                  </AvatarFallback>
                </Avatar>
                {profile.company}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* 3 Key indicators emphasized */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col items-center p-2 border rounded-md">
                  <span className="text-xs text-muted-foreground mb-1">满意度趋势</span>
                  <div className="flex items-center">
                    {getSatisfactionTrendIcon(profile.satisfactionTrend)}
                    <span className={`font-medium text-lg ${getSatisfactionTrendColor(profile.satisfactionTrend)}`}>
                      {profile.satisfactionTrend}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center p-2 border rounded-md">
                  <span className="text-xs text-muted-foreground mb-1">续约概率</span>
                  <Badge className={`mt-1 text-lg ${getProbabilityColor(profile.renewalProbability)}`}>
                    {profile.renewalProbability}
                  </Badge>
                </div>
                
                <div className="flex flex-col items-center p-2 border rounded-md">
                  <span className="text-xs text-muted-foreground mb-1">经营风险</span>
                  <Badge className={`mt-1 text-lg ${getRiskColor(profile.businessRisk)}`}>
                    {profile.businessRisk}
                  </Badge>
                </div>
              </div>
              
              {/* De-emphasized description */}
              <div className="mt-2">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {profile.analysis}
                </p>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground">
                最近更新: {profile.lastUpdated}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">没有符合条件的企业</p>
        </div>
      )}
    </div>
  );
};

export default CustomerProfile2Page;
