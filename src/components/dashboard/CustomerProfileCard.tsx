
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

interface CustomerProfile {
  id: string;
  company: string;
  tags: string[];
  satisfactionScore: number;
  dimensionScores: {
    complaintHealth: number;
    resolutionAbility: number;
    emotionAssessment: number;
  };
  riskStatus?: string;
  lastUpdated?: string;
  renewalProbability?: number;
  businessRisk?: string;
}

interface CustomerProfileCardProps {
  profile: CustomerProfile;
}

const CustomerProfileCard: React.FC<CustomerProfileCardProps> = ({ profile }) => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  
  const getSatisfactionColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getRiskStatusColor = (status?: string) => {
    if (!status) return '';
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

  const getRenewalProbability = (probability?: number) => {
    if (probability === undefined) return '';
    if (probability >= 0.8) return '续租可能性高';
    if (probability >= 0.5) return '续租可能性中';
    return '续租可能性低';
  };

  const getRenewalProbabilityColor = (probability?: number) => {
    if (probability === undefined) return '';
    if (probability >= 0.8) return 'text-green-600';
    if (probability >= 0.5) return 'text-amber-600';
    return 'text-red-600';
  };

  const handleCardClick = () => {
    navigate(`/customer-profiles/${profile.id}`);
  };

  const handleRefreshAnalysis = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "分析刷新完成",
        description: `${profile.company}的企业分析已更新`,
      });
    }, 1500);
  };

  // Get company initials for avatar
  const getInitials = (name: string) => {
    return name.charAt(0);
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow relative" 
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-primary/10">
              <AvatarFallback className="text-primary">
                {getInitials(profile.company)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-lg">{profile.company}</CardTitle>
          </div>
          {profile.riskStatus && (
            <Badge variant="outline" className={getRiskStatusColor(profile.riskStatus)}>
              {profile.riskStatus}
            </Badge>
          )}
        </div>
        {profile.lastUpdated && (
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-muted-foreground">
              更新于: {profile.lastUpdated}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0 rounded-full" 
              onClick={handleRefreshAnalysis}
              disabled={isRefreshing}
            >
              <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
              <span className="sr-only">刷新分析</span>
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center">
            <span className={`text-4xl font-bold ${getSatisfactionColor(profile.satisfactionScore)}`}>
              {profile.satisfactionScore}分
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">投诉健康</span>
              <span>{profile.dimensionScores.complaintHealth}分</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">诉求解决</span>
              <span>{profile.dimensionScores.resolutionAbility}分</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">情绪判断</span>
              <span>{profile.dimensionScores.emotionAssessment}分</span>
            </div>
            {profile.renewalProbability !== undefined && (
              <div className="flex justify-between pt-1 border-t mt-1">
                <span className="text-muted-foreground">续租分析</span>
                <span className={getRenewalProbabilityColor(profile.renewalProbability)}>
                  {getRenewalProbability(profile.renewalProbability)}
                </span>
              </div>
            )}
            {profile.businessRisk && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">经营风险</span>
                <span>{profile.businessRisk}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <div className="flex flex-wrap gap-1">
              {profile.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="ai-tag intent">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerProfileCard;
